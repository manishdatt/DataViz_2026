# ECharts SVG Export Issues with Inkscape

**Date:** 2026-05-26  
**Context:** TidyTuesday 2026-05-26 energy data dashboard (`posts/2654`)  
**Technologies:** Apache ECharts 5.5.0 (SVG renderer), vanilla JavaScript, Inkscape

## Problem Summary

The "Export as SVG" button produced files that:
- Rendered correctly in web browsers
- Looked broken or had **invisible bars** in Inkscape
- Were difficult or impossible to edit properly in vector tools

Even after the bars became selectable in Inkscape (fill color showed in the Fill & Stroke panel), the actual shapes remained invisible.

## Symptoms Observed

1. Bars had correct `fill="url(#zr0-g0)"` in the SVG source.
2. Fill & Stroke panel in Inkscape showed the proper gradient.
3. Visually, the bars were completely missing.
4. Grid lines, axes, and text rendered normally.
5. The same file opened perfectly in Chrome/Firefox.

## Root Causes

### 1. `<defs>` block placed at the end of the document (Primary cause)

ECharts `getDataURL({type: 'svg'})` serializes all drawing elements first, then appends the `<defs>` section (containing `<linearGradient>` and `<filter>` definitions) near the end of the file.

**Why this matters:**
- SVG spec requires `<defs>` (and its children) to appear **before** any elements that reference them via `url(#id)`.
- Modern browsers are very lenient — they resolve forward references during a second pass.
- Inkscape (and most professional vector editors) follow the spec strictly. Forward references result in unresolved `fill` and `filter` → elements become invisible.

### 2. Drop-shadow filters on every bar (Secondary but critical cause)

The chart configuration included:

```js
itemStyle: {
  shadowColor: 'rgba(79, 70, 229, 0.1)',
  shadowBlur: 10
}
```

ECharts converts this into real SVG filters:

```xml
<filter id="zr0-s0" ...>
  <feGaussianBlur stdDeviation="5 5" .../>
  <feFlood flood-color="..." flood-opacity="0.1"/>
  ...
</filter>
```

These filters are then applied to the bar paths:

```xml
<path ... fill="url(#zr0-g0)" filter="url(#zr0-s0)">
```

**Inkscape behavior:**
- Even after `<defs>` was moved to the correct position, Inkscape's filter implementation often fails on ECharts-generated shadow filters (especially when combined with gradients and large filter regions `x="-100%" y="-100%" width="300%"`).
- The result: the fill attribute is valid, but the rendered output of the path is empty/transparent → bars disappear visually while still showing their fill in the UI.

### 3. Original export method was too naive

The initial implementation used:

```js
const svgString = new XMLSerializer().serializeToString(svgEl);
```

This captured:
- No `viewBox` attribute (only fixed `width`/`height`)
- Browser DOM artifacts (`position: absolute`, `user-select: none`, etc.)
- `baseProfile="full"`
- No post-processing for vector editor compatibility

## Solution Implemented

Replaced the download handler with a robust pipeline:

1. Use ECharts native export:
   ```js
   const dataUrl = chart.getDataURL({ type: 'svg', backgroundColor: '#ffffff' });
   ```

2. Proper UTF-8 decoding (`dataUrlToSvgText` using `TextDecoder`).

3. `sanitizeSvgForEditor()` post-processor that performs:
   - Add proper `viewBox="0 0 W H"`
   - Strip browser-only attributes and `baseProfile`
   - **Move `<defs>` block to immediately after the opening `<svg>` tag**
   - **Remove all `filter="..."` attributes** from elements
   - **Remove unused `<filter>` definitions** from `<defs>`

This produces a clean, spec-compliant SVG that:
- Renders correctly in browsers
- Opens and is fully editable in Inkscape, Illustrator, Affinity Designer, etc.
- Retains the nice linear gradients while dropping problematic shadows

## Final Sanitizer Code (as of 2026-05-26)

```js
function sanitizeSvgForEditor(svgString) {
  // 1. Clean root <svg> tag
  svgString = svgString.replace(/<svg([^>]*?)>/, (match, attrs) => {
    if (/\bviewBox\s*=/.test(attrs)) return match;
    const w = (attrs.match(/width=["']?([\d.]+)/) || [])[1] || '800';
    const h = (attrs.match(/height=["']?([\d.]+)/) || [])[1] || '600';
    const clean = attrs
      .replace(/\s*style\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\s*baseProfile\s*=\s*["']full["']/gi, '');
    return `<svg${clean} viewBox="0 0 ${w} ${h}">`;
  });

  // 2. Move <defs> to correct position
  const defsMatch = svgString.match(/<defs\b[^>]*>[\s\S]*?<\/defs>/i);
  if (defsMatch) {
    const defsBlock = defsMatch[0];
    svgString = svgString.replace(defsBlock, '');
    svgString = svgString.replace(/(<svg[^>]*>)/, '$1' + defsBlock);
  }

  // 3. Remove filter attributes
  svgString = svgString.replace(/\s*filter\s*=\s*["'][^"']*["']/gi, '');

  // 4. Remove filter definitions from <defs>
  svgString = svgString.replace(/<filter\b[^>]*>[\s\S]*?<\/filter>/gi, '');

  return svgString.trim();
}
```

## Recommendations for Future Projects

- Always post-process ECharts SVG exports when targeting vector editors.
- Prefer `chart.getDataURL({type: 'svg'})` over raw `XMLSerializer`.
- Consider disabling `shadowBlur`/`shadowColor` in series options for export-only renders (or strip them in post-processing).
- Test exports in Inkscape + Illustrator early in development.
- Add `viewBox` and move `<defs>` as standard sanitization steps.

## Files Modified

- `index.html` (download button handler + sanitization functions)

This document captures the full debugging journey and the final robust solution for ECharts → Inkscape SVG export compatibility.
