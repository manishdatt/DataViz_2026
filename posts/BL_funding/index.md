---
title: British Library Funding
author: Manish Datt
date: '2025-07-15'
image: BL_funding.png
categories:
  - Timeline
  - no-code
  - PyDyTuesday
  - TidyTuesday
description: Decline in the UK govenment funding to the British Library.
---


<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" integrity="sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous" data-relocate-top="true"></script>
<script type="application/javascript">define('jquery', [],function() {return window.jQuery;})</script>


# TidyTuesday dataset of [2025-07-15](https://github.com/rfordatascience/tidytuesday/blob/main/data/2025/2025-07-15)

``` python
import pandas as pd
bl_funding = pd.read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-07-15/bl_funding.csv')
bl_funding
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>

|  | year | nominal_gbp_millions | gia_gbp_millions | voluntary_gbp_millions | investment_gbp_millions | services_gbp_millions | other_gbp_millions | year_2000_gbp_millions | inflation_adjustment | total_y2000_gbp_millions | percentage_of_y2000_income | gia_y2000_gbp_millions | voluntary_y2000_gbp_millions | investment_y2000_gbp_millions | services_y2000_gbp_millions | other_y2000_gbp_millions | gia_as_percent_of_peak_gia |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 0 | 2023 | 151.800 | 127.800 | 8.200 | 3.000 | 12.800 | 0.000 | NaN | 1818796.76 | 83.461772 | 0.757366 | 70.266235 | 4.508475 | 1.649442 | 7.037620 | 0.000000 | 0.743019 |
| 1 | 2022 | 147.600 | 116.500 | 14.900 | 0.800 | 15.600 | 0.000 | NaN | 1674338.62 | 88.154211 | 0.799947 | 69.579713 | 8.899036 | 0.477801 | 9.317112 | 0.000000 | 0.735759 |
| 2 | 2021 | 141.400 | 110.412 | 20.086 | 0.080 | 9.753 | 1.042 | NaN | 1534702.63 | 92.135113 | 0.836072 | 71.943579 | 13.087877 | 0.052127 | 6.354977 | 0.678959 | 0.760756 |
| 3 | 2020 | 125.900 | 108.226 | 9.524 | 0.196 | 7.584 | 0.383 | NaN | 1495983.26 | 84.158696 | 0.763691 | 72.344392 | 6.366381 | 0.131018 | 5.069575 | 0.256019 | 0.764994 |
| 4 | 2019 | 121.100 | 96.899 | 8.626 | 0.426 | 13.249 | 1.925 | NaN | 1483364.96 | 81.638709 | 0.740823 | 65.323776 | 5.815157 | 0.287185 | 8.931720 | 1.297725 | 0.690756 |
| 5 | 2018 | 122.200 | 93.443 | 10.754 | 0.332 | 14.558 | 3.116 | NaN | 1457265.04 | 83.855714 | 0.760941 | 64.122172 | 7.379577 | 0.227824 | 9.989947 | 2.138252 | 0.678049 |
| 6 | 2017 | 120.800 | 93.443 | 9.634 | 0.269 | 16.152 | 1.328 | NaN | 1422026.43 | 84.949195 | 0.770864 | 65.711156 | 6.774839 | 0.189167 | 11.358439 | 0.933879 | 0.694852 |
| 7 | 2016 | 118.000 | 93.911 | 9.672 | 0.649 | 13.780 | 0.000 | 76.39 | 1384868.58 | 85.206641 | 0.773200 | 67.812211 | 6.984056 | 0.468637 | 9.950403 | 0.000000 | 0.717069 |
| 8 | 2015 | 117.800 | 93.043 | 9.919 | 1.003 | 13.799 | 0.000 | 77.59 | 1375792.94 | 85.623350 | 0.776981 | 67.628636 | 7.209660 | 0.729034 | 10.029852 | 0.000000 | 0.715128 |
| 9 | 2014 | 118.900 | 93.893 | 8.931 | 0.707 | 15.352 | 0.000 | 79.09 | 1375241.48 | 86.457543 | 0.784551 | 68.273828 | 6.494132 | 0.514092 | 11.163130 | 0.000000 | 0.721950 |
| 10 | 2013 | 124.700 | 95.106 | 14.993 | 0.623 | 13.980 | 0.000 | 84.90 | 1355438.10 | 91.999775 | 0.834844 | 70.166244 | 11.061368 | 0.459630 | 10.314008 | 0.000000 | 0.741961 |
| 11 | 2012 | 126.100 | 103.868 | 6.265 | 0.620 | 15.349 | 0.000 | 88.46 | 1321543.18 | 95.418751 | 0.865869 | 78.595994 | 4.740670 | 0.469148 | 11.614452 | 0.000000 | 0.831100 |
| 12 | 2011 | 140.100 | 101.873 | 6.738 | 0.531 | 17.619 | 13.339 | 101.44 | 1285194.76 | 109.010715 | 0.989208 | 79.266585 | 5.242785 | 0.413167 | 13.709206 | 10.378972 | 0.838192 |
| 13 | 2010 | 137.900 | 105.847 | 11.774 | 0.415 | 19.906 | 0.000 | 105.05 | 1230278.88 | 112.088407 | 1.017136 | 86.034965 | 9.570188 | 0.337322 | 16.180071 | 0.000000 | 0.909763 |
| 14 | 2009 | 142.200 | 109.464 | 9.616 | 0.418 | 22.674 | 0.000 | 113.32 | 1190997.74 | 119.395693 | 1.083445 | 91.909494 | 8.073903 | 0.350966 | 19.037820 | 0.000000 | 0.971882 |
| 15 | 2008 | 140.500 | 106.947 | 7.993 | 1.492 | 24.030 | 0.000 | 111.37 | 1165755.40 | 120.522710 | 1.093673 | 91.740514 | 6.856498 | 1.279857 | 20.613244 | 0.000000 | 0.970095 |
| 16 | 2007 | 141.200 | 106.411 | 9.789 | 1.878 | 23.076 | 0.000 | 116.39 | 1125225.72 | 125.485934 | 1.138711 | 94.568581 | 8.699588 | 1.668998 | 20.507885 | 0.000000 | 1.000000 |
| 17 | 2006 | 159.200 | 102.639 | 31.879 | 1.904 | 22.768 | 0.000 | 136.85 | 1099681.85 | 144.769144 | 1.313695 | 93.335177 | 28.989294 | 1.731410 | 20.704170 | 0.000000 | 0.986958 |
| 18 | 2005 | 136.900 | 97.562 | 10.663 | 1.770 | 24.309 | 2.602 | 121.44 | 1074656.20 | 127.389578 | 1.155985 | 90.784383 | 9.922243 | 1.647038 | 22.620258 | 2.421239 | 0.959985 |
| 19 | 2004 | 121.600 | 88.501 | 6.399 | 1.586 | 24.520 | 0.000 | 110.92 | 1052996.65 | 115.479950 | 1.047912 | 84.046801 | 6.076942 | 1.506178 | 23.285924 | 0.000000 | 0.888739 |
| 20 | 2003 | 119.500 | 89.263 | 4.004 | 0.856 | 25.423 | 0.000 | 112.25 | 1039036.95 | 115.010347 | 1.043651 | 85.909361 | 3.853568 | 0.823840 | 24.467850 | 0.000000 | 0.908434 |
| 21 | 2002 | 119.200 | 85.187 | 6.162 | 0.795 | 27.068 | 0.000 | 115.20 | 1025079.54 | 116.283659 | 1.055206 | 83.102820 | 6.011241 | 0.775550 | 26.405756 | 0.000000 | 0.878757 |
| 22 | 2001 | 120.900 | 88.617 | 3.283 | 0.710 | 28.290 | 0.000 | 118.80 | 1012335.12 | 119.426855 | 1.083728 | 87.537218 | 3.242997 | 0.701349 | 27.945291 | 0.000000 | 0.925648 |
| 23 | 2000 | 110.200 | 82.266 | 2.852 | 0.654 | 24.491 | 0.000 | 110.20 | 1000000.00 | 110.200000 | 1.000000 | 82.266000 | 2.852000 | 0.654000 | 24.491000 | 0.000000 | 0.869908 |
| 24 | 1999 | 112.300 | 78.465 | 4.944 | 0.455 | 28.468 | 0.000 | 115.62 | 992098.37 | 113.194420 | 1.027173 | 79.089939 | 4.983377 | 0.458624 | 28.694735 | 0.000000 | 0.836324 |
| 25 | 1998 | 120.459 | 80.450 | 8.487 | 0.474 | 31.048 | 0.000 | NaN | 979089.11 | 123.031702 | 1.116440 | 82.168210 | 8.668261 | 0.484123 | 31.711107 | 0.000000 | 0.868874 |

</div>

## Plot using Deepnote notebook

<figure>
<img src="BL_funding.png" alt="No-code plot" />
<figcaption aria-hidden="true">No-code plot</figcaption>
</figure>

Use the code below to generate the above plot with Deepnote notebook.

<pre>
    _dntk.DeepnoteChart(bl_funding, spec_dict={
  "layer": [
    {
      "layer": [
        {
          "layer": [
            {
              "mark": {
                "clip": True,
                "type": "circle",
                "color": "#CC8BFF",
                "tooltip": True
              },
              "encoding": {
                "x": {
                  "axis": {
                    "grid": False,
                    "title": None,
                    "format": ".0f"
                  },
                  "sort": None,
                  "type": "quantitative",
                  "field": "year",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "number",
                    "decimals": 0
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "y": {
                  "axis": {
                    "grid": False,
                    "title": "GBP (millions)",
                    "format": {
                      "type": "default",
                      "decimals": None
                    },
                    "formatType": "numberFormatFromNumberType"
                  },
                  "type": "quantitative",
                  "field": "gia_y2000_gbp_millions",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "default",
                    "decimals": None
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "color": {
                  "type": "nominal",
                  "datum": "UK government (adjusted)",
                  "scale": {
                    "range": [
                      "#CC8BFF"
                    ],
                    "domain": [
                      "UK government (adjusted)"
                    ]
                  }
                }
              },
              "transform": []
            }
          ]
        },
        {
          "layer": [
            {
              "mark": {
                "clip": True,
                "type": "circle",
                "color": "#8018D3",
                "tooltip": True
              },
              "encoding": {
                "x": {
                  "axis": {
                    "grid": False,
                    "title": None,
                    "format": ".0f"
                  },
                  "sort": None,
                  "type": "quantitative",
                  "field": "year",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "number",
                    "decimals": 0
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "y": {
                  "axis": {
                    "grid": False,
                    "title": "GBP (millions)",
                    "format": {
                      "type": "default",
                      "decimals": None
                    },
                    "formatType": "numberFormatFromNumberType"
                  },
                  "type": "quantitative",
                  "field": "total_y2000_gbp_millions",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "default",
                    "decimals": None
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "color": {
                  "type": "nominal",
                  "datum": "Total funding (adjusted)",
                  "scale": {
                    "range": [
                      "#8018D3"
                    ],
                    "domain": [
                      "Total funding (adjusted)"
                    ]
                  }
                }
              },
              "transform": []
            }
          ]
        },
        {
          "layer": [
            {
              "mark": {
                "clip": True,
                "type": "line",
                "color": "#2266D3",
                "tooltip": True
              },
              "encoding": {
                "x": {
                  "axis": {
                    "grid": False,
                    "title": None,
                    "format": ".0f"
                  },
                  "sort": None,
                  "type": "quantitative",
                  "field": "year",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "number",
                    "decimals": 0
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "y": {
                  "axis": {
                    "grid": False,
                    "title": "GBP (millions)",
                    "format": {
                      "type": "default",
                      "decimals": None
                    },
                    "formatType": "numberFormatFromNumberType"
                  },
                  "type": "quantitative",
                  "field": "nominal_gbp_millions",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "default",
                    "decimals": None
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "color": {
                  "type": "nominal",
                  "datum": "Total funding",
                  "scale": {
                    "range": [
                      "#2266D3"
                    ],
                    "domain": [
                      "Total funding"
                    ]
                  }
                }
              },
              "transform": []
            }
          ]
        },
        {
          "layer": [
            {
              "mark": {
                "clip": True,
                "type": "line",
                "color": "#83AFF6",
                "tooltip": True
              },
              "encoding": {
                "x": {
                  "axis": {
                    "grid": False,
                    "title": None,
                    "format": ".0f"
                  },
                  "sort": None,
                  "type": "quantitative",
                  "field": "year",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "number",
                    "decimals": 0
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "y": {
                  "axis": {
                    "grid": False,
                    "title": "GBP (millions)",
                    "format": {
                      "type": "default",
                      "decimals": None
                    },
                    "formatType": "numberFormatFromNumberType"
                  },
                  "type": "quantitative",
                  "field": "gia_gbp_millions",
                  "scale": {
                    "type": "linear",
                    "zero": False
                  },
                  "format": {
                    "type": "default",
                    "decimals": None
                  },
                  "formatType": "numberFormatFromNumberType"
                },
                "color": {
                  "type": "nominal",
                  "datum": "UK government",
                  "scale": {
                    "range": [
                      "#83AFF6"
                    ],
                    "domain": [
                      "UK government"
                    ]
                  }
                }
              },
              "transform": []
            }
          ]
        }
      ],
      "resolve": {
        "scale": {
          "color": "independent"
        }
      }
    }
  ],
  "title": "Total funding and year 2000 adjusted funding for the British Library.",
  "config": {
    "legend": {
      "orient": "top",
      "disable": False
    }
  },
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "encoding": {}
})
</pre>
