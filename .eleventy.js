import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import hljs from "highlight.js";

export default function (eleventyConfig) {

  // Set up markdown library
  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      return ''; 
    }
  });

  // FIXED SHORTCODE
  eleventyConfig.addPairedShortcode("demo", function(content) {
    // 1. "content" is the raw HTML/JS you wrote in your file.
    // 2. We escape it so it can safely sit inside a <code> block without executing.
    const highlightedCode = md.options.highlight(content, "html");

    return `
      <div>
        ${content}
      </div>
      <h2 class="text-2xl font-medium mt-8 mb-4">Plotting code</h2>
      <div class="demo-code-area not-prose w-full overflow-hidden rounded-md">
        <pre class="bg-stone-200 overflow-x-auto w-full"><code class="language-html">${highlightedCode}</code></pre>
      </div>
      `;
  });

  // Date Filter
  eleventyConfig.addFilter("date", (value, format = "yyyy-MM-dd") => {
    if (!value) return "";
    if (value instanceof Date) {
      return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
    }
    return DateTime.fromISO(value.toString(), { zone: "utc" }).toFormat(format);
  });

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.setLibrary("md", md);

  // Passthrough
  eleventyConfig.addPassthroughCopy({"posts/**/*.{png,jpg,jpeg,gif,svg,csv}": ""});
  eleventyConfig.addPassthroughCopy({"assets/**/*.{png,jpg,jpeg,gif,svg}": ""});

  return {
    dir: { input: ".", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}