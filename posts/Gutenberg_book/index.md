---
title: Project Gutenberg
author: Manish Datt
date: 2025-06-03
description: Frequency of books in different languages.
image: word_cloud.png
categories:
  - ggplot2
  - wordcloud
  - TidyTuesday
  - magick
slug: '2561'
---


## TidyTuesday data for [2025-06-03](https://github.com/rfordatascience/tidytuesday/blob/main/data/2025/2025-06-03/readme.md)

``` r
library(tidyverse)
```



    ── Attaching core tidyverse packages ──────────────────────── tidyverse 2.0.0 ──
    ✔ dplyr     1.1.4     ✔ readr     2.1.5
    ✔ forcats   1.0.0     ✔ stringr   1.5.1
    ✔ ggplot2   3.5.2     ✔ tibble    3.2.1
    ✔ lubridate 1.9.4     ✔ tidyr     1.3.1
    ✔ purrr     1.0.4     
    ── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
    ✖ dplyr::filter() masks stats::filter()
    ✖ dplyr::lag()    masks stats::lag()
    ℹ Use the conflicted package (<http://conflicted.r-lib.org/>) to force all conflicts to become errors

``` r
library(wordcloud)
```


    Loading required package: RColorBrewer

``` r
library(RColorBrewer)
library(ISOcodes)
```


``` r
library(scales)
```


    Attaching package: 'scales'

    The following object is masked from 'package:purrr':

        discard

    The following object is masked from 'package:readr':

        col_factor

``` r
library(magick)
```


    Linking to ImageMagick 6.9.12.98
    Enabled features: cairo, freetype, fftw, ghostscript, heic, lcms, pango, raw, rsvg, webp
    Disabled features: fontconfig, x11

``` r
gutenberg_authors <- readr::read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_authors.csv')
```

    Rows: 26077 Columns: 7
    ── Column specification ────────────────────────────────────────────────────────
    Delimiter: ","
    chr (4): author, alias, wikipedia, aliases
    dbl (3): gutenberg_author_id, birthdate, deathdate

    ℹ Use `spec()` to retrieve the full column specification for this data.
    ℹ Specify the column types or set `show_col_types = FALSE` to quiet this message.

``` r
gutenberg_languages <- readr::read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_languages.csv')
```

    Rows: 76205 Columns: 3
    ── Column specification ────────────────────────────────────────────────────────
    Delimiter: ","
    chr (1): language
    dbl (2): gutenberg_id, total_languages

    ℹ Use `spec()` to retrieve the full column specification for this data.
    ℹ Specify the column types or set `show_col_types = FALSE` to quiet this message.

``` r
gutenberg_metadata <- readr::read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_metadata.csv')
```

    Rows: 79491 Columns: 8
    ── Column specification ────────────────────────────────────────────────────────
    Delimiter: ","
    chr (5): title, author, language, gutenberg_bookshelf, rights
    dbl (2): gutenberg_id, gutenberg_author_id
    lgl (1): has_text

    ℹ Use `spec()` to retrieve the full column specification for this data.
    ℹ Specify the column types or set `show_col_types = FALSE` to quiet this message.

``` r
gutenberg_subjects <- readr::read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-06-03/gutenberg_subjects.csv')
```

    Rows: 255312 Columns: 3
    ── Column specification ────────────────────────────────────────────────────────
    Delimiter: ","
    chr (2): subject_type, subject
    dbl (1): gutenberg_id

    ℹ Use `spec()` to retrieve the full column specification for this data.
    ℹ Specify the column types or set `show_col_types = FALSE` to quiet this message.

``` r
glimpse(gutenberg_authors)
```

    Rows: 26,077
    Columns: 7
    $ gutenberg_author_id <dbl> 1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1…
    $ author              <chr> "United States", "Lincoln, Abraham", "Henry, Patri…
    $ alias               <chr> "U.S.A.", NA, NA, NA, "Dodgson, Charles Lutwidge",…
    $ birthdate           <dbl> NA, 1809, 1736, 1849, 1832, NA, 1819, 1860, NA, 18…
    $ deathdate           <dbl> NA, 1865, 1799, 1931, 1898, NA, 1891, 1937, NA, 18…
    $ wikipedia           <chr> "https://en.wikipedia.org/wiki/United_States", "ht…
    $ aliases             <chr> "U.S.A.", "United States President (1861-1865)/Lin…

``` r
glimpse(gutenberg_languages)
```

    Rows: 76,205
    Columns: 3
    $ gutenberg_id    <dbl> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,…
    $ language        <chr> "en", "en", "en", "en", "en", "en", "en", "en", "en", …
    $ total_languages <dbl> 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, …

``` r
glimpse(gutenberg_metadata)
```

    Rows: 79,491
    Columns: 8
    $ gutenberg_id        <dbl> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14,…
    $ title               <chr> "The Declaration of Independence of the United Sta…
    $ author              <chr> "Jefferson, Thomas", "United States", "Kennedy, Jo…
    $ gutenberg_author_id <dbl> 1638, 1, 1666, 3, 1, 4, NA, 3, 3, NA, 7, 7, 7, 7, …
    $ language            <chr> "en", "en", "en", "en", "en", "en", "en", "en", "e…
    $ gutenberg_bookshelf <chr> "Politics/American Revolutionary War/United States…
    $ rights              <chr> "Public domain in the USA.", "Public domain in the…
    $ has_text            <lgl> TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TR…

``` r
glimpse(gutenberg_subjects)
```

    Rows: 255,312
    Columns: 3
    $ gutenberg_id <dbl> 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, …
    $ subject_type <chr> "lcsh", "lcsh", "lcc", "lcc", "lcsh", "lcsh", "lcc", "lcc…
    $ subject      <chr> "United States -- History -- Revolution, 1775-1783 -- Sou…

``` r
lang_counts <- gutenberg_languages %>% 
  group_by(language) %>%
  summarise(total_languages = sum(total_languages), .groups = 'drop') %>%
  arrange(desc(total_languages)) %>% 
  left_join(ISO_639_2, by = c("language" = "Alpha_2")) %>% 
  select(language, Name, total_languages)
glimpse(lang_counts)
```

    Rows: 70
    Columns: 3
    $ language        <chr> "en", "fr", "fi", "de", "it", "nl", "es", "pt", "hu", …
    $ Name            <chr> "English", "French", "Finnish", "German", "Italian", "…
    $ total_languages <dbl> 60875, 4019, 3314, 2363, 1061, 1053, 917, 651, 610, 45…

``` r
lang_counts2 <- lang_counts %>% 
  filter(Name != "English")
png("word_cloud.png", width = 4, height = 4, units = "in", res = 300, bg = "black")
p1 <- wordcloud(words = lang_counts2$Name, freq = lang_counts2$total_languages,
          min.freq = 0,
          random.order = FALSE,
          colors = brewer.pal(9, "Pastel1"))
dev.off()
```

    png 
      2 

``` r
lang_counts %>% 
  filter(Name != "English") %>% 
  arrange(desc(total_languages)) %>% 
  slice(1:10) %>% 
  ggplot(aes(x = total_languages, y =reorder(Name, total_languages))) +
  geom_col(alpha=0) +
  geom_text(aes(label = comma(total_languages), x=70), color = "grey", hjust=1) +
  theme_minimal() +
  scale_y_discrete(labels = function(x) paste0(x, ":"))+
  coord_cartesian(xlim = c(0, 100)) +
  theme(axis.title = element_blank(),
        axis.text.x = element_blank(),
        axis.ticks.x = element_blank(),
        axis.text.y = element_text(color = "grey"),
        axis.line = element_blank(),
        panel.grid = element_blank(),
        plot.margin = margin(75, 0, 75, 0))
```

<img src="index.markdown_strict_files/figure-markdown_strict/unnamed-chunk-5-1.png" width="768" />

``` r
ggsave("plot1.png", width = 1.75, height = 4, units = "in", bg="black")
```

``` r
img1 <- image_read("word_cloud.png")
img2 <- image_read("plot1.png")
combined <- image_append(c(img1, img2), stack = FALSE)
#image_write(combined, "combined.png")

title_text <- paste("In Project Gutenberg, ", comma(lang_counts$total_languages[1]), " out of ", comma(dim(gutenberg_languages)[1]), "books are in English. The word cloud is based on the book counts in different languages, excluding English. Counts for top ten languages are shown on the right.")
title_text <- paste(strwrap(title_text, width = 75), collapse = "\n")
title_image <- image_blank(width = image_info(combined)$width,
                           height = 160, # adjust height as needed
                           color = "black") %>%
  image_annotate(text = title_text,
                 size = 40, # adjust font size
                 color = "grey",
                 gravity = "center")

final_image <- image_composite(combined, title_image, offset = "+0+0")
image_write(final_image, "combined_with_title.png")
```
