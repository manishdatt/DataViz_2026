---
title: Recipes and Cuisines data from allrecipes.com
author: Manish Datt
date: '2025-09-16'
iso-date: '2025-09-16'
image: cuisines_table.png
categories:
  - Great Table
  - PyDyTuesday
  - TidyTuesday
description: Five star cuisines in 10 minutes.
---


<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" integrity="sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous" data-relocate-top="true"></script>
<script type="application/javascript">define('jquery', [],function() {return window.jQuery;})</script>


# TidyTuesday dataset of [2025-09-16](https://github.com/rfordatascience/tidytuesday/blob/main/data/2025/2025-09-16)

``` python
import pandas as pd
import numpy as np
import flagpy as fp
from great_tables import GT, style,loc, md, html, nanoplot_options
import io
import base64
import matplotlib.pyplot as plt
```

``` python
all_recipes = pd.read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-09-16/all_recipes.csv')
cuisines = pd.read_csv('https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-09-16/cuisines.csv')
```

``` python
all_recipes
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

|  | name | url | author | date_published | ingredients | calories | fat | carbs | protein | avg_rating | total_ratings | reviews | prep_time | cook_time | total_time | servings |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 0 | Chewy Whole Wheat Peanut Butter Brownies | https://www.allrecipes.com/recipe/140717/chewy\... | DMOMMY | 2020-06-18 | ⅓ cup margarine, softened, ⅔ cup white sugar, \... | 222.0 | 13.0 | 24.0 | 6.0 | 4.4 | 47.0 | 36.0 | 20 | 35 | 55 | 16.0 |
| 1 | Pumpkin Pie Eggnog | https://www.allrecipes.com/recipe/269204/pumpk\... | Bobbie Susan | 2022-09-26 | 12 egg yolks, 2 cups heavy whipping cream, ½ \... | 477.0 | 31.0 | 43.0 | 8.0 | 5.0 | 1.0 | 1.0 | 10 | 5 | 495 | 8.0 |
| 2 | Eggs Poached in Tomato Sauce | https://www.allrecipes.com/recipe/238054/eggs-\... | Bren | 2018-06-08 | 2 tablespoons olive oil, or to taste, ½ onion\... | 354.0 | 18.0 | 32.0 | 20.0 | 4.8 | 4.0 | 4.0 | 10 | 75 | 85 | 4.0 |
| 3 | Minestrone Casserole | https://www.allrecipes.com/minestrone-casserol\... | Sarah Brekke | 2025-03-03 | 4 cups dried mafalda pasta (mini lasagna noodl\... | 356.0 | 9.0 | 53.0 | 19.0 | 4.3 | 14.0 | 13.0 | 20 | 40 | 60 | 8.0 |
| 4 | Yummy Stuffed Peppers | https://www.allrecipes.com/recipe/241937/yummy\... | Procrastigirl | 2024-12-11 | 4 green bell peppers, halved lengthwise and se\... | 366.0 | 22.0 | 23.0 | 19.0 | 4.7 | 84.0 | 67.0 | 30 | 95 | 125 | 8.0 |
| \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... |
| 14421 | Cheesy Kale Quiche | https://www.allrecipes.com/recipe/244249/chees\... | ally-gator | 2022-01-14 | 1 (9 inch) pie crust pastry, ½ (8 ounce) packa\... | 338.0 | 25.0 | 15.0 | 14.0 | 4.8 | 20.0 | 17.0 | 10 | 45 | 55 | 8.0 |
| 14422 | Fabulous Chicken Cordon Bleu Casserole | https://www.allrecipes.com/fabulous-chicken-co\... | Lindsay Breeze | 2024-01-08 | 8 ounces egg noodles, 1/2 cup butter, 1/2 cup \... | 572.0 | 37.0 | 28.0 | 30.0 | 4.9 | 14.0 | 14.0 | 30 | 40 | 70 | 6.0 |
| 14423 | Absolutely Wonderful Cheesy, Creamy Spinach Ar\... | https://www.allrecipes.com/recipe/262412/absol\... | Shamrock Farms | 2022-01-14 | ½ cup Shamrock Farms® Premium Sour Cream, ½ cu\... | 244.0 | 13.0 | 22.0 | 11.0 | NaN | NaN | NaN | 10 | 25 | 35 | 8.0 |
| 14424 | Gluten-Free Fruitcake | https://www.allrecipes.com/recipe/268501/glute\... | Buckwheat Queen | 2023-01-22 | ¼ cup raisins, ¼ cup golden raisins, ¼ cup dri\... | 401.0 | 20.0 | 45.0 | 5.0 | 5.0 | 6.0 | 6.0 | 40 | 90 | 1585 | 12.0 |
| 14425 | Chef John\'s Irish Pork Stew | https://www.allrecipes.com/recipe/236988/chef-\... | John Mitzewich | 2024-11-16 | 1 (2 ½ pound) boneless pork shoulder, cut into\... | 401.0 | 19.0 | 33.0 | 20.0 | 4.8 | 333.0 | 274.0 | 25 | 145 | 170 | 6.0 |

<p>14426 rows × 16 columns</p>
</div>

``` python
cuisines
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

|  | name | country | url | author | date_published | ingredients | calories | fat | carbs | protein | avg_rating | total_ratings | reviews | prep_time | cook_time | total_time | servings |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 0 | Saganaki (Flaming Greek Cheese) | Greek | https://www.allrecipes.com/recipe/263750/flami\... | John Mitzewich | 2024-02-07 | 1 (4 ounce) package kasseri cheese, 1 tablespo\... | 391.0 | 25.0 | 15.0 | 16.0 | 4.8 | 25.0 | 22.0 | 10 | 5 | 15 | 2.0 |
| 1 | Coney Island Knishes | Jewish | https://www.allrecipes.com/recipe/272334/coney\... | John Mitzewich | 2024-11-26 | 2 ¾ cups all-purpose flour, or more as needed,\... | 301.0 | 17.0 | 31.0 | 7.0 | 4.6 | 10.0 | 9.0 | 30 | 75 | 180 | 16.0 |
| 2 | Diana\'s Hawaiian Bread Rolls | Australian and New Zealander | https://www.allrecipes.com/recipe/22797/dianas\... | CHIPPENDALE | 2022-07-14 | 1 ½ cups warm water (110 degrees F/45 degrees \... | 64.0 | 3.0 | 9.0 | 1.0 | 4.3 | 126.0 | 104.0 | 20 | 15 | 180 | 12.0 |
| 3 | Chilean Pebre | Chilean | https://www.allrecipes.com/recipe/273763/chile\... | Heidi | 2025-01-31 | ½ cup chopped cilantro, ¼ cup olive oil, ¼ cup\... | 106.0 | 9.0 | 7.0 | 1.0 | 5.0 | 1.0 | 1.0 | 10 | 0 | 10 | 6.0 |
| 4 | Tex-Mex Sheet Cake | Tex-Mex | https://www.allrecipes.com/recipe/22388/tex-me\... | Ann | 2025-02-18 | 2 cups all-purpose flour, 1 ½ cups brown sugar\... | 449.0 | 23.0 | 58.0 | 7.0 | 3.8 | 13.0 | 11.0 | 30 | 15 | 45 | 15.0 |
| \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... | \... |
| 2213 | Chicken Satay Bowls with Spicy Peanut Sauce | Thai | https://www.allrecipes.com/chicken-satay-bowls\... | LaDonna Langwell | 2025-06-02 | 1/4 cup coconut milk, 1 tablespoon brown sugar\... | 716.0 | 42.0 | 41.0 | 48.0 | 5.0 | 3.0 | 3.0 | 30 | 15 | 165 | 4.0 |
| 2214 | The Best Ricotta Pancakes | Canadian | https://www.allrecipes.com/recipe/242225/the-b\... | WestCoastMom | 2025-03-11 | 1 cup ricotta cheese plus, 2 tablespoons ricot\... | 86.0 | 4.0 | 8.0 | 5.0 | 4.5 | 41.0 | 35.0 | 15 | 10 | 25 | 12.0 |
| 2215 | Black Pepper Chicken | Chinese | https://www.allrecipes.com/black-pepper-chicke\... | Barrett Heald | 2024-03-05 | 1/4 cup cornstarch, 1 tablespoon reduced-sodiu\... | 484.0 | 20.0 | 44.0 | 32.0 | 4.4 | 11.0 | 10.0 | 15 | 15 | 45 | 4.0 |
| 2216 | Chicken Florentine | French | https://www.allrecipes.com/chicken-florentine-\... | Renu Dhar | 2024-01-18 | 1/4 cup all-purpose flour, 3/4 teaspoon kosher\... | 571.0 | 33.0 | 12.0 | 50.0 | 4.8 | 17.0 | 17.0 | 15 | 20 | 35 | 4.0 |
| 2217 | Iskender Kebab | Persian | https://www.allrecipes.com/recipe/88080/iskend\... | GATOULA | 2024-11-17 | 4 pita bread rounds, 1 tablespoon olive oil, \... | 667.0 | 36.0 | 49.0 | 37.0 | 4.5 | 17.0 | 12.0 | 15 | 15 | 30 | 4.0 |

<p>2218 rows × 17 columns</p>
</div>

``` python
cuisines_filtered = cuisines[(cuisines['avg_rating']==5) & (cuisines['total_time']<=10) & (cuisines['total_time']>0)]
cuisines_filtered
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

|  | name | country | url | author | date_published | ingredients | calories | fat | carbs | protein | avg_rating | total_ratings | reviews | prep_time | cook_time | total_time | servings |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 3 | Chilean Pebre | Chilean | https://www.allrecipes.com/recipe/273763/chile\... | Heidi | 2025-01-31 | ½ cup chopped cilantro, ¼ cup olive oil, ¼ cup\... | 106.0 | 9.0 | 7.0 | 1.0 | 5.0 | 1.0 | 1.0 | 10 | 0 | 10 | 6.0 |
| 9 | Pan con Tomate (Spanish Tomato Bread) | Spanish | https://www.allrecipes.com/pan-con-tomate-span\... | Luis Luna | 2025-06-02 | 1 large tomato, chopped, 2 slices crusty bread\... | 322.0 | 16.0 | 39.0 | 7.0 | 5.0 | 2.0 | 2.0 | 5 | 5 | 10 | 1.0 |
| 243 | Vietnamese Egg Coffee | Vietnamese | https://www.allrecipes.com/recipe/283318/vietn\... | Yoly | 2021-02-09 | 1 large egg yolk, 2 tablespoons sweetened cond\... | 175.0 | 8.0 | 21.0 | 6.0 | 5.0 | 1.0 | 1.0 | 5 | 0 | 5 | 1.0 |
| 330 | Spanish Gin and Tonic (Gin Tonica) | Spanish | https://www.allrecipes.com/spanish-gin-and-ton\... | John Mitzewich | 2023-08-17 | whole spices, such as juniper berries, pink pe\... | 366.0 | 2.0 | 74.0 | 7.0 | 5.0 | 1.0 | 1.0 | 9 | 0 | 9 | 1.0 |
| 507 | Homemade Za\'atar | Lebanese | https://www.allrecipes.com/recipe/262666/homem\... | Serena | 2022-08-22 | 3 tablespoons sesame seeds, 3 tablespoons fres\... | 29.0 | 2.0 | 2.0 | 1.0 | 5.0 | 3.0 | 2.0 | 5 | 3 | 8 | 6.0 |
| 824 | Cuban Crunchwrap | Cuban | https://www.allrecipes.com/cuban-crunchwrap-re\... | Nicole McLaughlin | 2025-04-03 | 1 extra large flour tortilla (12 inches or lar\... | 2010.0 | 71.0 | 264.0 | 76.0 | 5.0 | 1.0 | 1.0 | 5 | 5 | 10 | 1.0 |
| 1061 | Coconut Rum Brazilian Lemonade | Brazilian | https://www.allrecipes.com/coconut-rum-brazili\... | Nicole McLaughlin | 2024-06-13 | 2 limes, 2 cups water, 1/2 cup coconut rum, 1/\... | 169.0 | 2.0 | 28.0 | 2.0 | 5.0 | 2.0 | 2.0 | 5 | 0 | 5 | 3.0 |
| 1216 | Italian Cherry Margarita | Italian | https://www.allrecipes.com/italian-cherry-marg\... | Nicole McLaughlin | 2025-07-26 | 2 fresh cherries, pitted, or more to taste, pl\... | 222.0 | 0.0 | 16.0 | 0.0 | 5.0 | 1.0 | 1.0 | 5 | 0 | 5 | 1.0 |
| 1226 | Indian Summer Raspberry Peach Sangria | Spanish | https://www.allrecipes.com/recipe/233339/india\... | Robert Farabaugh | 2025-07-24 | 1 (750 milliliter) bottle red wine, 24 fluid o\... | 175.0 | 0.0 | 22.0 | 1.0 | 5.0 | 8.0 | 4.0 | 10 | 0 | 10 | 8.0 |
| 1516 | Chocolate Santafereño (Colombian-Style Hot Cho\... | Colombian | https://www.allrecipes.com/chocolate-santafere\... | Devon O\'Brien | 2024-10-07 | 1 cup whole milk, 2 ounces bittersweet or dark\... | 544.0 | 32.0 | 47.0 | 17.0 | 5.0 | 1.0 | 1.0 | 5 | 5 | 10 | 1.0 |
| 1581 | Lebanese 7 Spices | Lebanese | https://www.allrecipes.com/recipe/269331/leban\... | BigDaddy | 2018-11-30 | 1 tablespoon ground nutmeg, 1 tablespoon groun\... | 15.0 | 1.0 | 3.0 | 1.0 | 5.0 | 2.0 | 2.0 | 5 | 0 | 5 | 10.0 |
| 1654 | Easy Mojitos | Cuban | https://www.allrecipes.com/recipe/229649/easy-\... | Jennifer | 2025-05-12 | 12 leaves mint, 2 lime slices, 1 teaspoon whi\... | 121.0 | 0.0 | 7.0 | 0.0 | 5.0 | 24.0 | 20.0 | 5 | 0 | 5 | 1.0 |
| 1822 | Dave Matthews | Canadian | https://www.allrecipes.com/recipe/201058/dave-\... | looloo2 | 2022-09-25 | 1 fluid ounce coconut-flavored rum, 1 fluid ou\... | NaN | NaN | NaN | NaN | 5.0 | 11.0 | 8.0 | 5 | 0 | 5 | 1.0 |
| 1996 | Authentic Chimichurri | Argentinian | https://www.allrecipes.com/recipe/278453/authe\... | Avon- status quo PRO | 2024-06-27 | 1 cup fresh parsley, ½ cup extra-virgin olive \... | 133.0 | 14.0 | 1.0 | 0.0 | 5.0 | 5.0 | 4.0 | 10 | 0 | 10 | 8.0 |

</div>

``` python
cuisines_filtered.columns
```

    Index(['name', 'country', 'url', 'author', 'date_published', 'ingredients',
           'calories', 'fat', 'carbs', 'protein', 'avg_rating', 'total_ratings',
           'reviews', 'prep_time', 'cook_time', 'total_time', 'servings'],
          dtype='object')

``` python
cuisines_final = cuisines_filtered[['name', 'country', 'ingredients',
       'calories', 'fat', 'carbs', 'protein', 
       'prep_time', 'cook_time']].sort_values(by='country').reset_index(drop=True)
cuisines_final
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

|  | name | country | ingredients | calories | fat | carbs | protein | prep_time | cook_time |
|----|----|----|----|----|----|----|----|----|----|
| 0 | Authentic Chimichurri | Argentinian | 1 cup fresh parsley, ½ cup extra-virgin olive \... | 133.0 | 14.0 | 1.0 | 0.0 | 10 | 0 |
| 1 | Coconut Rum Brazilian Lemonade | Brazilian | 2 limes, 2 cups water, 1/2 cup coconut rum, 1/\... | 169.0 | 2.0 | 28.0 | 2.0 | 5 | 0 |
| 2 | Dave Matthews | Canadian | 1 fluid ounce coconut-flavored rum, 1 fluid ou\... | NaN | NaN | NaN | NaN | 5 | 0 |
| 3 | Chilean Pebre | Chilean | ½ cup chopped cilantro, ¼ cup olive oil, ¼ cup\... | 106.0 | 9.0 | 7.0 | 1.0 | 10 | 0 |
| 4 | Chocolate Santafereño (Colombian-Style Hot Cho\... | Colombian | 1 cup whole milk, 2 ounces bittersweet or dark\... | 544.0 | 32.0 | 47.0 | 17.0 | 5 | 5 |
| 5 | Cuban Crunchwrap | Cuban | 1 extra large flour tortilla (12 inches or lar\... | 2010.0 | 71.0 | 264.0 | 76.0 | 5 | 5 |
| 6 | Easy Mojitos | Cuban | 12 leaves mint, 2 lime slices, 1 teaspoon whi\... | 121.0 | 0.0 | 7.0 | 0.0 | 5 | 0 |
| 7 | Italian Cherry Margarita | Italian | 2 fresh cherries, pitted, or more to taste, pl\... | 222.0 | 0.0 | 16.0 | 0.0 | 5 | 0 |
| 8 | Homemade Za\'atar | Lebanese | 3 tablespoons sesame seeds, 3 tablespoons fres\... | 29.0 | 2.0 | 2.0 | 1.0 | 5 | 3 |
| 9 | Lebanese 7 Spices | Lebanese | 1 tablespoon ground nutmeg, 1 tablespoon groun\... | 15.0 | 1.0 | 3.0 | 1.0 | 5 | 0 |
| 10 | Pan con Tomate (Spanish Tomato Bread) | Spanish | 1 large tomato, chopped, 2 slices crusty bread\... | 322.0 | 16.0 | 39.0 | 7.0 | 5 | 5 |
| 11 | Spanish Gin and Tonic (Gin Tonica) | Spanish | whole spices, such as juniper berries, pink pe\... | 366.0 | 2.0 | 74.0 | 7.0 | 9 | 0 |
| 12 | Indian Summer Raspberry Peach Sangria | Spanish | 1 (750 milliliter) bottle red wine, 24 fluid o\... | 175.0 | 0.0 | 22.0 | 1.0 | 10 | 0 |
| 13 | Vietnamese Egg Coffee | Vietnamese | 1 large egg yolk, 2 tablespoons sweetened cond\... | 175.0 | 8.0 | 21.0 | 6.0 | 5 | 0 |

</div>

``` python
# merge calories, fat, carbs, and protein cols into one col as a list of four elements.
cuisines_final['nutrition'] = cuisines_final[['fat', 'carbs', 'protein']].values.tolist()
# in calories, fat, protein, carbs, replace nan with 0.0
cuisines_final[['calories', 'fat', 'carbs', 'protein']] = cuisines_final[['calories', 'fat', 'carbs', 'protein']].fillna(0.0)
# convert nutrition col to string
cuisines_final['nutrition'] = cuisines_final['nutrition'].apply(
    lambda x: ', '.join([str(0.0 if pd.isna(i) else i) for i in x])
)
cuisines_final
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

|  | name | country | ingredients | calories | fat | carbs | protein | prep_time | cook_time | nutrition |
|----|----|----|----|----|----|----|----|----|----|----|
| 0 | Authentic Chimichurri | Argentinian | 1 cup fresh parsley, ½ cup extra-virgin olive \... | 133.0 | 14.0 | 1.0 | 0.0 | 10 | 0 | 14.0, 1.0, 0.0 |
| 1 | Coconut Rum Brazilian Lemonade | Brazilian | 2 limes, 2 cups water, 1/2 cup coconut rum, 1/\... | 169.0 | 2.0 | 28.0 | 2.0 | 5 | 0 | 2.0, 28.0, 2.0 |
| 2 | Dave Matthews | Canadian | 1 fluid ounce coconut-flavored rum, 1 fluid ou\... | 0.0 | 0.0 | 0.0 | 0.0 | 5 | 0 | 0.0, 0.0, 0.0 |
| 3 | Chilean Pebre | Chilean | ½ cup chopped cilantro, ¼ cup olive oil, ¼ cup\... | 106.0 | 9.0 | 7.0 | 1.0 | 10 | 0 | 9.0, 7.0, 1.0 |
| 4 | Chocolate Santafereño (Colombian-Style Hot Cho\... | Colombian | 1 cup whole milk, 2 ounces bittersweet or dark\... | 544.0 | 32.0 | 47.0 | 17.0 | 5 | 5 | 32.0, 47.0, 17.0 |
| 5 | Cuban Crunchwrap | Cuban | 1 extra large flour tortilla (12 inches or lar\... | 2010.0 | 71.0 | 264.0 | 76.0 | 5 | 5 | 71.0, 264.0, 76.0 |
| 6 | Easy Mojitos | Cuban | 12 leaves mint, 2 lime slices, 1 teaspoon whi\... | 121.0 | 0.0 | 7.0 | 0.0 | 5 | 0 | 0.0, 7.0, 0.0 |
| 7 | Italian Cherry Margarita | Italian | 2 fresh cherries, pitted, or more to taste, pl\... | 222.0 | 0.0 | 16.0 | 0.0 | 5 | 0 | 0.0, 16.0, 0.0 |
| 8 | Homemade Za\'atar | Lebanese | 3 tablespoons sesame seeds, 3 tablespoons fres\... | 29.0 | 2.0 | 2.0 | 1.0 | 5 | 3 | 2.0, 2.0, 1.0 |
| 9 | Lebanese 7 Spices | Lebanese | 1 tablespoon ground nutmeg, 1 tablespoon groun\... | 15.0 | 1.0 | 3.0 | 1.0 | 5 | 0 | 1.0, 3.0, 1.0 |
| 10 | Pan con Tomate (Spanish Tomato Bread) | Spanish | 1 large tomato, chopped, 2 slices crusty bread\... | 322.0 | 16.0 | 39.0 | 7.0 | 5 | 5 | 16.0, 39.0, 7.0 |
| 11 | Spanish Gin and Tonic (Gin Tonica) | Spanish | whole spices, such as juniper berries, pink pe\... | 366.0 | 2.0 | 74.0 | 7.0 | 9 | 0 | 2.0, 74.0, 7.0 |
| 12 | Indian Summer Raspberry Peach Sangria | Spanish | 1 (750 milliliter) bottle red wine, 24 fluid o\... | 175.0 | 0.0 | 22.0 | 1.0 | 10 | 0 | 0.0, 22.0, 1.0 |
| 13 | Vietnamese Egg Coffee | Vietnamese | 1 large egg yolk, 2 tablespoons sweetened cond\... | 175.0 | 8.0 | 21.0 | 6.0 | 5 | 0 | 8.0, 21.0, 6.0 |

</div>

``` python
cuisines_final['country'].unique()
```

    array(['Argentinian', 'Brazilian', 'Canadian', 'Chilean', 'Colombian',
           'Cuban', 'Italian', 'Lebanese', 'Spanish', 'Vietnamese'],
          dtype=object)

``` python
country_list = ['Argentina', 'Brazil', 'Canada', 'Chile', 'Colombia', 'Cuba', 'Italy', 'Lebanon', 'Spain', 'Vietnam']
```

``` python
# save flag for each country
for country in country_list:
    img = fp.get_flag_img(country)
    img.save(f'{country}_flag.png')
```

``` python
country_image_paths = {
    'Argentinian': 'Argentina_flag.png',
    'Brazilian': 'Brazil_flag.png',
    'Canadian': 'Canada_flag.png',
    'Chilean': 'Chile_flag.png',
    'Colombian': 'Colombia_flag.png',
    'Cuban': 'Cuba_flag.png',
    'Italian': 'Italy_flag.png',
    'Lebanese': 'Lebanon_flag.png',
    'Spanish': 'Spain_flag.png',
    'Vietnamese': 'Vietnam_flag.png'
}

cuisines_final['flag']=cuisines_final['country'].map(country_image_paths)
```

``` python
cuisines_final.columns
```

    Index(['name', 'country', 'ingredients', 'calories', 'fat', 'carbs', 'protein',
           'prep_time', 'cook_time', 'nutrition', 'flag'],
          dtype='object')

``` python
def create_tally_image(n, color='black'):
    """Create tally mark image with diagonal going from bottom-left to top-right"""
    groups = n // 5
    remainder = n % 5
    
    # Calculate figure width based on number of marks
    # Each group takes 0.7 width (0.5 for marks + 0.2 space)
    # Each remainder takes 0.1 width
    total_width = max(1.0, 0.7 * groups + 0.1 * remainder + 0.2)
    
    fig, ax = plt.subplots(figsize=(total_width, 0.5))
    ax.set_xlim(0, total_width)
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    x_start = 0.1
    for i in range(groups):
        # Four vertical bars
        for j in range(4):
            ax.plot([x_start + j*0.1, x_start + j*0.1], [0.2, 0.8], color=color, lw=2)
        
        # Diagonal from bottom-left to top-right
        # Starts below and left of first line, ends above and right of fourth line
        ax.plot([x_start - 0.05, x_start + 0.35], [0.15, 0.85], color=color, lw=2)
        
        # Add space after group
        x_start += 0.7  # 0.5 for marks + 0.2 space
    
    # Draw remaining marks
    for j in range(remainder):
        ax.plot([x_start + j*0.1, x_start + j*0.1], [0.2, 0.8], color=color, lw=2)
    
    # Save to memory
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0.1, transparent=True)
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    plt.close(fig)
    
    return f'<img src="data:image/png;base64,{img_str}" style="height:30px">'

cuisines_final["prep_Tally"] = cuisines_final["prep_time"].apply(create_tally_image, args=('purple',))
cuisines_final["cook_Tally"] = cuisines_final["cook_time"].apply(create_tally_image, args=('dodgerblue',))
```

``` python
gt_table = (
GT(cuisines_final[['name', 'flag', 'ingredients', 'prep_Tally', 'cook_Tally', 'nutrition','calories']], rowname_col='name')
.cols_width({
      'name': '15%',
      'flag': '8%',
      'ingredients': '45%',
      'calories': '6%',
#      'prep_time': '5%',
#      'cook_time': '6%',
      'nutrition': '15%',
      'prep_Tally': '5%',
      'cook_Tally': '6%'
  })
.tab_spanner(label="Time (mins)", columns=["prep_Tally", "cook_Tally"])
.tab_spanner(label="Nutrition", columns=["calories","nutrition"])
.tab_style(
    style=style.text(weight="bold"),
    locations=loc.spanner_labels(["Time (mins)", "Nutrition"])
  )
.tab_header(
    title=md("**Five star** cuisines having preparation time upto **ten minutes**."),
#    subtitle="Recipes with 5 star ratings and total time less than 10 minutes"
)
.cols_label(
    prep_Tally="Prep",
    cook_Tally="Cook",
    calories="Calories",
    flag="Country",
    ingredients="Ingredients",
    nutrition="Fat, Carbs, Protein"
)
.fmt_number(columns=["calories"], decimals=0)
.fmt_nanoplot(columns="nutrition", plot_type='bar',options=nanoplot_options(data_bar_fill_color="green"))
.fmt_markdown(columns='ingredients')
.cols_align('center')
.cols_align(align="left", columns=["ingredients"])
.tab_style(
    style=style.text(align="center"),                # Center header text
    locations=loc.column_labels(columns=["ingredients"])
    )
.tab_style(
    style=style.text(weight="bold"),                # Center header text
    locations=loc.column_labels(columns=["flag","ingredients"])
    )
.data_color(
        columns=['calories'],
        palette='Reds',
        domain=[cuisines_final['calories'].min(), cuisines_final['calories'].max()]
        ) 
.tab_style(
style=[
        style.text(whitespace='normal'),  # Text wrapping
        style.fill(color='papayawhip')     # Background fill
    ],
locations=loc.body(columns='ingredients'))
.tab_style(
    style=[
        style.text(whitespace='normal'),
        style.fill(color='aliceblue')
    ],
    locations=loc.stub()
  )
.tab_style(
    style=style.text(color="purple"), #, weight="bold", size="16px"),
    locations=loc.column_labels(columns=["prep_Tally"])
)
.tab_style(
    style=style.text(color="dodgerblue"),
    locations=loc.column_labels(columns=["cook_Tally"])
)
.tab_options(table_width='100%')
.fmt_image(
    columns=['flag'], path="."  
)
.tab_source_note(
    source_note="Data: allrecipies.com"
)
.tab_style(
    style=style.css("border:0px"),
    locations=loc.body(columns=["flag"])
)
.tab_style(
    style=style.css("border-radius: 50px;"),
    locations=loc.body(columns=["calories"])
)


)

#gt_table.save("table.html")

# Save html without selenium
html = gt_table.as_raw_html()
with open("table.html", "w") as f:
    f.write(html)

gt_table

#gt_table.save(
#    file="my_table.png",
#    selector="table",       # HTML selector to capture
#    scale=1.0,               # Zoom level
#    expand=5,                # Padding around the image
#    window_size=(1000, 800)  # Size of the browser window used for rendering
#)
```

<div id="cogrvufxfe" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>
#cogrvufxfe table {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', 'Fira Sans', 'Droid Sans', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

#cogrvufxfe thead, tbody, tfoot, tr, td, th { border-style: none; }
 tr { background-color: transparent; }
#cogrvufxfe p { margin: 0; padding: 0; }
 #cogrvufxfe .gt_table { display: table; border-collapse: collapse; line-height: normal; margin-left: auto; margin-right: auto; color: #333333; font-size: 16px; font-weight: normal; font-style: normal; background-color: #FFFFFF; width: 100%; border-top-style: solid; border-top-width: 2px; border-top-color: #A8A8A8; border-right-style: none; border-right-width: 2px; border-right-color: #D3D3D3; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #A8A8A8; border-left-style: none; border-left-width: 2px; border-left-color: #D3D3D3; }
 #cogrvufxfe .gt_caption { padding-top: 4px; padding-bottom: 4px; }
 #cogrvufxfe .gt_title { color: #333333; font-size: 125%; font-weight: initial; padding-top: 4px; padding-bottom: 4px; padding-left: 5px; padding-right: 5px; border-bottom-color: #FFFFFF; border-bottom-width: 0; }
 #cogrvufxfe .gt_subtitle { color: #333333; font-size: 85%; font-weight: initial; padding-top: 3px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; border-top-color: #FFFFFF; border-top-width: 0; }
 #cogrvufxfe .gt_heading { background-color: #FFFFFF; text-align: center; border-bottom-color: #FFFFFF; border-left-style: none; border-left-width: 1px; border-left-color: #D3D3D3; border-right-style: none; border-right-width: 1px; border-right-color: #D3D3D3; }
 #cogrvufxfe .gt_bottom_border { border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #D3D3D3; }
 #cogrvufxfe .gt_col_headings { border-top-style: solid; border-top-width: 2px; border-top-color: #D3D3D3; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #D3D3D3; border-left-style: none; border-left-width: 1px; border-left-color: #D3D3D3; border-right-style: none; border-right-width: 1px; border-right-color: #D3D3D3; }
 #cogrvufxfe .gt_col_heading { color: #333333; background-color: #FFFFFF; font-size: 100%; font-weight: normal; text-transform: inherit; border-left-style: none; border-left-width: 1px; border-left-color: #D3D3D3; border-right-style: none; border-right-width: 1px; border-right-color: #D3D3D3; vertical-align: bottom; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; overflow-x: hidden; }
 #cogrvufxfe .gt_column_spanner_outer { color: #333333; background-color: #FFFFFF; font-size: 100%; font-weight: normal; text-transform: inherit; padding-top: 0; padding-bottom: 0; padding-left: 4px; padding-right: 4px; }
 #cogrvufxfe .gt_column_spanner_outer:first-child { padding-left: 0; }
 #cogrvufxfe .gt_column_spanner_outer:last-child { padding-right: 0; }
 #cogrvufxfe .gt_column_spanner { border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #D3D3D3; vertical-align: bottom; padding-top: 5px; padding-bottom: 5px; overflow-x: hidden; display: inline-block; width: 100%; }
 #cogrvufxfe .gt_spanner_row { border-bottom-style: hidden; }
 #cogrvufxfe .gt_group_heading { padding-top: 8px; padding-bottom: 8px; padding-left: 5px; padding-right: 5px; color: #333333; background-color: #FFFFFF; font-size: 100%; font-weight: initial; text-transform: inherit; border-top-style: solid; border-top-width: 2px; border-top-color: #D3D3D3; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #D3D3D3; border-left-style: none; border-left-width: 1px; border-left-color: #D3D3D3; border-right-style: none; border-right-width: 1px; border-right-color: #D3D3D3; vertical-align: middle; text-align: left; }
 #cogrvufxfe .gt_empty_group_heading { padding: 0.5px; color: #333333; background-color: #FFFFFF; font-size: 100%; font-weight: initial; border-top-style: solid; border-top-width: 2px; border-top-color: #D3D3D3; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #D3D3D3; vertical-align: middle; }
 #cogrvufxfe .gt_from_md> :first-child { margin-top: 0; }
 #cogrvufxfe .gt_from_md> :last-child { margin-bottom: 0; }
 #cogrvufxfe .gt_row { padding-top: 8px; padding-bottom: 8px; padding-left: 5px; padding-right: 5px; margin: 10px; border-top-style: solid; border-top-width: 1px; border-top-color: #D3D3D3; border-left-style: none; border-left-width: 1px; border-left-color: #D3D3D3; border-right-style: none; border-right-width: 1px; border-right-color: #D3D3D3; vertical-align: middle; overflow-x: hidden; }
 #cogrvufxfe .gt_stub { color: #333333; background-color: #FFFFFF; font-size: 100%; font-weight: initial; text-transform: inherit; border-right-style: solid; border-right-width: 2px; border-right-color: #D3D3D3; padding-left: 5px; padding-right: 5px; }
 #cogrvufxfe .gt_stub_row_group { color: #333333; background-color: #FFFFFF; font-size: 100%; font-weight: initial; text-transform: inherit; border-right-style: solid; border-right-width: 2px; border-right-color: #D3D3D3; padding-left: 5px; padding-right: 5px; vertical-align: top; }
 #cogrvufxfe .gt_row_group_first td { border-top-width: 2px; }
 #cogrvufxfe .gt_row_group_first th { border-top-width: 2px; }
 #cogrvufxfe .gt_striped { background-color: rgba(128,128,128,0.05); }
 #cogrvufxfe .gt_table_body { border-top-style: solid; border-top-width: 2px; border-top-color: #D3D3D3; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #D3D3D3; }
 #cogrvufxfe .gt_sourcenotes { color: #333333; background-color: #FFFFFF; border-bottom-style: none; border-bottom-width: 2px; border-bottom-color: #D3D3D3; border-left-style: none; border-left-width: 2px; border-left-color: #D3D3D3; border-right-style: none; border-right-width: 2px; border-right-color: #D3D3D3; }
 #cogrvufxfe .gt_sourcenote { font-size: 90%; padding-top: 4px; padding-bottom: 4px; padding-left: 5px; padding-right: 5px; text-align: left; }
 #cogrvufxfe .gt_left { text-align: left; }
 #cogrvufxfe .gt_center { text-align: center; }
 #cogrvufxfe .gt_right { text-align: right; font-variant-numeric: tabular-nums; }
 #cogrvufxfe .gt_font_normal { font-weight: normal; }
 #cogrvufxfe .gt_font_bold { font-weight: bold; }
 #cogrvufxfe .gt_font_italic { font-style: italic; }
 #cogrvufxfe .gt_super { font-size: 65%; }
 #cogrvufxfe .gt_footnote_marks { font-size: 75%; vertical-align: 0.4em; position: initial; }
 #cogrvufxfe .gt_asterisk { font-size: 100%; vertical-align: 0; }
 
</style>

<table class="gt_table" data-quarto-postprocess="true" style="table-layout: fixed;; width: 100%" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
<colgroup>
<col style="width: 15%" />
<col style="width: 8%" />
<col style="width: 45%" />
<col style="width: 5%" />
<col style="width: 6%" />
<col style="width: 6%" />
<col style="width: 15%" />
</colgroup>
<thead>
<tr class="gt_heading">
<th colspan="7" class="gt_heading gt_title gt_font_normal"><strong>Five star</strong> cuisines having preparation time upto <strong>ten minutes</strong>.</th>
</tr>
<tr class="gt_col_headings gt_spanner_row">
<th rowspan="2" class="gt_col_heading gt_columns_bottom_border gt_left" data-quarto-table-cell-role="th" scope="col"></th>
<th rowspan="2" id="flag" class="gt_col_heading gt_columns_bottom_border gt_center" data-quarto-table-cell-role="th" style="font-weight: bold" scope="col">Country</th>
<th rowspan="2" id="ingredients" class="gt_col_heading gt_columns_bottom_border gt_left" data-quarto-table-cell-role="th" style="text-align: center; font-weight: bold;" scope="col">Ingredients</th>
<th colspan="2" id="Time-(mins)" class="gt_center gt_columns_top_border gt_column_spanner_outer" data-quarto-table-cell-role="th" style="font-weight: bold" scope="colgroup"><span class="gt_column_spanner">Time (mins)</span></th>
<th colspan="2" id="Nutrition" class="gt_center gt_columns_top_border gt_column_spanner_outer" data-quarto-table-cell-role="th" style="font-weight: bold" scope="colgroup"><span class="gt_column_spanner">Nutrition</span></th>
</tr>
<tr class="gt_col_headings">
<th id="prep_Tally" class="gt_col_heading gt_columns_bottom_border gt_center" data-quarto-table-cell-role="th" style="color: purple" scope="col">Prep</th>
<th id="cook_Tally" class="gt_col_heading gt_columns_bottom_border gt_center" data-quarto-table-cell-role="th" style="color: dodgerblue" scope="col">Cook</th>
<th id="calories" class="gt_col_heading gt_columns_bottom_border gt_center" data-quarto-table-cell-role="th" scope="col">Calories</th>
<th id="nutrition" class="gt_col_heading gt_columns_bottom_border gt_center" data-quarto-table-cell-role="th" scope="col">Fat, Carbs, Protein</th>
</tr>
</thead>
<tbody class="gt_table_body">
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Authentic Chimichurri</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAADsElEQVR4nO2bW3LkIAwAyVZupJyJOdP4TMOZsiUJMM5Yqd1f1F0px8Z2fujSA5yP+nwVgDv+3I4CIAf8BnJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJACHJAyMfr9R3fhdR8fH8jB9xDWlFaO/pxnkBmOUyFpj920QfHvTJOMouSUQ6fbynS2nHO/RTi+qQU0ZMjoyIZ5ejxQGReF5FWfljSehwRacfDDElHroK0HQ+ptRRpx1eROoc1jjRV5LwsroiIySH1ZXHkkPosacgVOaRWDQOt6Ry3Q2deTIsTrUI0lTQ7kaoJRTVyM6ZPKcgSOWyOi0i1nPIQeS55ZP4akcMeKwNVxF4ZKUYf0z+1O1nk8JziE2+l6MMMMD/myQXxl1Sjbob9BakZtEgjh8WA3pVoGrHMMusMe8KCyvWNNq71hpYjFj9G6+uRY31nRxLIcWJNSlvSx2hHbpqR5i+YHD3L2IXVsyUHm8sxbBglhdafolLouHYtMzQos1kZ581DiNUYZ5yY5YiFk7Ivm8txQbPCdMXLD48PoyRdkPFL01HXwo6qigmxe04ppXyWvWnHdeItDFgRMruUPrJkm7e8IXboo90l7XitmN2X3eW4YWaRZUjWda93Odq4vX+0yCSHNq5rTukXN0+O5PI2/3Le9pySIKGkkGMpSL3v8NEeDFSYX4uHNi3y1ZGz3+klKgXplq2slFGc9pwyVDg3WEpfSV9WTt0GIsd2G/RnZXEWnrUnjGPZntUSdsQYa3Nt+cuaFjfDV9VsvGxNosjhH3rZllvp2yvtEZWoxSded/Z1cd32Ymx1RNfBsmzMZpHDE4qZMTbe1v0U3ZvVifdnz8Qhflg23sZb24eNFGll2QrpZUcPAxodNAa040unv6sgvkpePBnJUzdi9NW+/ZbBiXSR4/1jH6lP71Z+LmP0r36a3fKRg4999sem1lODFafjix5rS+p1ObT2cQ05vpGbqNrIKMfEi495ZYe5neJ7sDIDSYbd+dQ1x4rXDWEvqgXH+aQ+1pvYdGSUw7nM94/AMC9lrqpmJFdBCv/F593/8gAonwd2QEDSbgX+BeSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEOSAEvEXKqy9nCLhJkwAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 cup fresh parsley, ½ cup extra-virgin olive oil, 2 tablespoons fresh oregano, 2 tablespoons red wine vinegar, 1 tablespoon water, 1 jalapeño chile pepper, seeded, 2 cloves garlic, chopped, ½ teaspoon salt, ½ teaspoon ground black pepper</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAA6CAYAAABfwdAwAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAEYklEQVR4nO2cXailUxjHf2va5gw5x8eYIRRRhuRCDSOZohANEuJiXCBKhHDlo56eG1z6upKPUvJVQmMIFz5DKLmRG7lAh5kyvhkfS0vPW8vO0Tln7X32u9Z+fqfT3udZ7Xrf/f7f5/2v9f7fE2KMOM5yWbXsTzqOC8gpxQXkFOECcopwATlFuICcIlxAThEuIKcIF5BThAvIKcIF5BThAnKmS0Aa9HQNeiKNoUEP06BbqYyqBKRBLwNeBLZp0CNoBA26EXgPeFSDnkdFVCEgDf/8KPAIMADWAdfTABr0XOB14EA7HqpBqzgu2MEoRoN+ABwEzEuUjUsZX8RnPwSOBvbKyvcBNzNmSvZrkft9JLBvVn4LOF+i/MU0Cci+pEOWOb7gmAbdDzgWmLFSSr/dJFHuZmUo2a8Fx63DbAD2zspPAJdLlF+piN62Sg16OPB2Jp7ERSsonrGgQfcEnhoSz53A1trEM8oONA5Tuc18QccOifIMFaNBk3d7HjgpK++SKLdSKat6bioTf9jrbipGgx4FvJOJpwuj/0TF9EpAGvRa4NnMML8JfEP9rDbxJNOc+Cp1VBqgTwLaB7g/26ZkKs/MztSaWQfsb+8/BjYBv9MAfRJQE6ayI61cAbP8m1eAzRLlCxph0ANTmX47/gSukSgPUDEadGDddC4rPwxcLVGa6DwTF5CZyu3mD7BL1TkS5SUqRoOmrvMkcHZW/h64UqK0cDmevIA06CnAc5kv6KbptYvnYFt+OH5o6IcWxTMRD6RBLwFezcTTtfSqW7sGPc5uiHbi2dXKTKtPApq12dVMZipb+JJn7D7Wofb358DJta9d9VFAual8CNjSyDT9gGzf3k+LhRLlE6aAVStkKtcOlW8Hrqp5RmLT9LmhcvJ1p0mUr5kSBitgKl8A1mTlSyXKY1SMBl1tHXQ2K99rSYG0FDE1DMZsKrdnvqCbadUunhQxSTd1T83K30mUG5hCxnIJ06BnWBSjE093VlZtKrOISSeeaK8/MqWMXEAa9ArrPLOZqaz+hqhFTN4FjrHSDmAnU86oBTRn3mCQmcp0tlYT0VyANUMRk08tlrGbKWfUAho2lRdKlJ+pn7VZxOSNtMYjUT6b8Da1YaLNVKZ1EDJfcKNEuYeKsdxyipjkPG655d8mtFltdaD/yC0n8VzQgHhSt3l6KGJyhy1BuHhG0YE06Al243B9Vt4pUVKisFo06HrLLafQV8e3EuW2CW5WWx3Inp58LRNPK7nlDRY93TQ0TW/Bx/WjA2nQ64B0iUpL+Z2pnLNg2PwCH+vq80scW8z4SNCgmy2P3aUEvkwLhOaDlrtt8/8zviL7NW7CUv5TvRnLdGvirNZMpQa9xXxOl1ve0lL0tBeXMHvk9mLgowZN5V3Ag8DLreWWe9OB8qcrJcovNIYG3SO91pwSqEJAjtPHx3qcCnEBOUW4gJwiXEBOES4gpwgXkFOEC8gpwgXkFOECcopwATlFuICcIlxADiX8DW5ZVYw89+75AAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #feeae0; border-radius: 50px">133</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="107.85714285714286" width="40" height="7.142857142857139" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="114.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">14</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">14</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">1</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Coconut Rum Brazilian Lemonade</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAGg0lEQVR4nO2dAZqjLAyGM/8zN0rPFM4EZ2rONP8TotbOlG5FQNC8Ozvbuo468hmSEOgXeATDeMV/L7cahonDeIeJw0hi4jCSmDiMJCYOI4mJw0hi4jCSmDiMJCYOI8l3+r+uBQIQMgAEjv8YAF82tgIg94DgIYkA4Nhuy7XFob+5xxdC4GhCVCiX5YriIAS/shOf4ADD9TqbC4kDo5FYDMZWOH53V/JIriKODGuR4jpW5OTieONV7IFnj/XcIjmzOH7FIDUIp45rTiiOStYixYnjmrOJwyPTQacOp7Mi50mfE8DPccqA5QJOJI/hLcfOALUGfJagd0hx5HkVMmiizkFWo1E8GYpt4IvENeOJIyNjERhDKPkce9omkUE9kpHEoT0IbtREpacW43faohK1IgOZkDHEoV7FJmfzFoibtAMi3GlDGKu7DmFFehcHzcr4EGa8RWtxgA/kGbcYqf7T8J2KYzLaG0PTwOiaK2OPL9K5u9qjOPIGyQ5XRrav2q0V6UscW11ORQPU9r1JijvFvMtGiXTorh4vjjxBLNxcbIr+QIC7zxxv6UQoB6fPPfJ9hzJc0exFWTheXr6wkDd54uexHDSXeu85N0ezAX1z9wV6u6M8ktbi0BkARZq0WSajZRakq46m3bwVHZsoUqvHk8VBOSbiQ90rneM6PuT5W1ST/pU/9eH5NDsfQe1oXDxMMyvSwnLsdDn/wnCf2lc0R46nR9OvXhNSeH5NMD15NMuJZ61IE0agAhRP68v5zc2syPco1mKNGotVWz49nLMK1afBZUuAoG91w1pSuleYD/hSKxRPuuzzOVonVvAmqBUJ028B44mjuLVY4ElyDwjVh5HN2s5xP9nK66blWRuPi3x6v3Q0niiKIB6WRRDiKpG8Dc7lXXZgzEiOvUHLYxErWpHv4Wr1WMoyHt1B4KULTvp9bpGC1mQAY+TpsLN2dDOvhKL5bbUZKH1TTlvIT1d4VmYrUmUkr5jP0aZ481f4Ki2HeMt9mlMgohx3qu5BxxKOrvuy6MTEWddhg6fyk5sT20QoNxd8rzgqeRUfDrrqs1417sAoFJIuQefga/EAhtmnQUl2aST0j8u4E2/NqWdTJK7JF0c9r6LP0TWKlkM6GXy4pSqOSZ1ybaH4mNyBcU1m+pxQurpeRrrq4730I4H55kJwTIDTF04mJGZd4Ofulzi5B+Y0fBOH9PBS76MyomEVMopKnLi00RjMPm60IuKdENxjmOPckgA7+OJJHHB5sdWKnGfeynuIxHfN/nH+07KaCLk5ybSJuzrFO7KfhkL+LnYFRuZ7c7AQO5OCk9Y30eHNDtGQaOgEqMmVyXVFAs+0OCJHXXwQk9YwzxHkBmB7hzSb8NZVLIILQQwGEc+5V5GKOGdTL9O+Y9npkI4dypZFHv3YxkWOgzR5IdNGJObbpgrkgUPZSlUaGaVfs2+IN1fMPCBOedhdBwH0fpWK5S+oTNnKj5IOaYgeyY2xqgUvnkcSX/V5uEYalQrkexmixzoD1QgAX4xfXLgmqNaQfb0U2ToP9q/n+6moo4GpeIMnoApPTdXh+1qhrMY1DuSr7JGXJCOJ9/fm4Hj3rYsIPdH6pDqQO70urYwgKXyx0zxoPYdaueJxzbzU8FNu6g9i0j8/ZhGzEX7nvYTiKfNmxT7takiLlgkK76uLpSbjZVslQX3OY7CSf5FxOBfXUY9OUChylxuXCbarIV2syP4C46mcC7Uk9DXRA9x2F9UJ3Z8R4dV54zgdDFpgfJWpCTJCVr9W3dMjH3qCqQnHjK0UCXqXzzn4YE/04ididj0H/METaanRfC0v9qF9nlalAHWk6ZA7PZKjpjbhUnKYMEh5NqOr1Tt6+byV7LhGShZiyrTqRGo/B6VLr7HkzWRk/uVE6jHnx/ZoOTpfggGfp7q8wZZgqE7/i7fQbDnCqlVt8Za+l30CdC7zdv+ZK/We5b5N/aAt+3QMPS8YRwjeFow7HFtqsjEjiaOTRWpxoyamaxjEWowtDlveuhlDiqOr2RJ/UR2M1YOcUxzZcU0lXPcxyBXnrehIRDj8AhhOw3ksx06PJBu2j/EaEfsAwJ2cWRz20aE7Obk4FuxDhzO4ijjs48ozuJA49lgRdxlrcXVxfOKR8HljkM+5tDhScc25Y5DPMXH8LlcutRTfCTBxGBdInxvFMXEYSUwcRhITh5HExGEkMXEYSUwcRhITh5HExGEkMXEYkOJ/hPx7Y3RY0BsAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">2 limes, 2 cups water, 1/2 cup coconut rum, 1/4 cup sweetened condensed milk, 2 cups ice</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fee7dc; border-radius: 50px">169</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="107.85714285714286" width="40" height="7.142857142857139" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="107.85714285714286" width="40" height="7.142857142857139" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">28</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">2</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">28</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">2</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Dave Matthews</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAD5klEQVR4nO2dW3arMAxFfbs6IzEmGBOMCc3pLps3RXkACRz57NWfNkCcaiML25B/rUi4AdK2VzfhRmhRhBvwc3UDyH2hHMSEchATykFMKAcxoRzEhHIQE8oxo2niDxmgHBPaNEo5ZlCOgVEL+jFAOXrGnMHkMUI5Eish6EeCcmxkCyaPDsph5ImGflAOI08o5aAcoan2vJQHWcihVWF0E6qNmns1GnTr1aaJB8yALOQIQeIAV1Gsg1096zt0uYGqVkXqcW6xfO7TZCGHDEshtaq0qnpFNPJ4Rx2TR9Si23dxQN/8hhyYxzKFOf7lmRkd2xvnIUcWmWOD18zYs7Ej8pDj9BNdmDk8cWI4JQszMpLjxBJSKIc3TgyohEzIRg7a8T7ZyMGa432ykeOsoEouZniUo2msYYnPuqHqb5bfmxxxDmUcIF9zykkvW++aBtcpx60ZnNj240OpQ9N4/LIBPviBuqmketBrrFbobPjxCTl0ZsbjJUJdv9N9BBBwJt5ENM6wD/GWSAzVGC1dL7/Qqlo/E0amA+xqQ1gxN2Nqw7JJumyY1GUAAUmOxa+rCXdjllWrQur2Q3bo1pKf51O+ONc7ON3K43+rFQxdnNwHR75ltvu4tuONxkCZASaHlLsS8rwsOBgbmRYN7as9d36Ei0CSY39oOz9UD15taiqHd5sBlzlwao6Ol1dwrVleVuxEjx0Eygy0zBHTMtj/F7rxYHIEQeqz0RuPJgdgcsZtNp4coAuxBLDZeHIgnoKgzUaTQ9OkKyAaL4BhZlXQ5Ej3M6bpFVS0Srdk4ky8gcjh6FFuivPMQhA5ylLqOrhA6jKADKL/IJX7+H5IXQONduDI0fnRtohlP2jjoeRISF1jzW2GNHCOmPbw5BhKEBg/pCxDiWcGrBzdyYhwLkpdo5SfjuS4fy8uQdr6vs1zLsdU/8str61a9Ltq4eW4YYkqXkZlPMgRuU08BLnIcCpHX4LUVyZyuWsftxdHckRST39JeOS6t/4YzuS4pgSR23Rq5+JQjsgXoyWOiow85Pjmyitx1ZXkIQc5jF85vragpsFYubMDt3LotxZsKtrKUL+3Q75IfCTGs23GJ3x0dcOwEjFNopaLb1Z4fAOmprfzWHn4lWNThc6DzUCWZd9BdJceIn8eutBbsqEL5QBCVafn/pwVNukPtdYlZReHaniV40uDHPJHF1+4LUjJcSgHMaEcxIRyDIwXIL4eNHsEykFMKAcxoRzEhHKMjKUGa44eyjFAN/5AOYgJ5SAmlIOYUI6e6Qs6OAg2QDnWUA3nU/Y7cHnjyUGYOYgJ5SAmlIOYUA5iQjmICeUgweI/eNmDUMeCocsAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 fluid ounce coconut-flavored rum, 1 fluid ounce amaretto liqueur, ¼ fluid ounce fresh lime juice, ¾ fluid ounce pineapple juice, ½ fluid ounce cranberry juice</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fff5f0; border-radius: 50px">0</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="65.0" x2="227.5" y2="65.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="64.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><rect x="105.0" y="64.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><rect x="180.0" y="64.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">5</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">-5</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Chilean Pebre</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAACCElEQVR4nO3bXW7aQABGUVN1R+M1edZkr4lZUytwSqKQD4qCCcbnPCWAHCSu5s9h15WxW5s/++Gn38Im/PrpN8DzEgeROIjEQSQOInEQiYNIHETiIBIHkTh4eBxDKUMpC12cx/i90HXLfGusLnR5VhvHadhopZtaW+JPsNZp5W3Y+PADa7RIHKfVhmXHqt15WilnNcyPNJPLCt05jqF8/UjVxhbiGIZLe9TzZ4ZjHecjykmdmnHlReKYptZKN463rSa+fHVrXT1c7ta3wBMvSFtrff/dT3WaWl+/eQ2edc1Ra2vHnep4vtC4qD8uQEwlz293r68m7Mcr+9aptXqndamvJqztnOPa8FGuvoKXjKNc2I28v+bSnoWXjeM/Vx03Lk54lZHj46+tHVadff286DRybO6E9DCn/PvQ573paeHZ1zaOh+fmxeo8s9inbCiO02RRazs/uJhDmc/N5j60saFp5TgYdP3Fw86pvR15uU+7xXOOR3LO8Rj+wZhIHETiIBIHkTiIxEEkDiJxEImDSBxE4iASB5E4iHZ799AJjBxE4iASB5E4iMRBJA4icRCJg0gcROIgEgeROIjEQSQOInEQiYNIHETiIBIHkTiIxEEkDiJxEImDSBxE4iASB5E4iMRBJA4icRCJg0gcROIgEgeROIjEQSQOInEQiYNIHETiIBIHkTjokr+Wm3GNNutFBgAAAABJRU5ErkJggg==" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">½ cup chopped cilantro, ¼ cup olive oil, ¼ cup red wine vinegar, 1 tomato, chopped, 1 small onion, chopped, 1 lemon, juiced, 2 chile peppers, seeded and chopped, 2 tablespoons minced garlic, salt and pepper to taste</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAA6CAYAAABfwdAwAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAEYklEQVR4nO2cXailUxjHf2va5gw5x8eYIRRRhuRCDSOZohANEuJiXCBKhHDlo56eG1z6upKPUvJVQmMIFz5DKLmRG7lAh5kyvhkfS0vPW8vO0Tln7X32u9Z+fqfT3udZ7Xrf/f7f5/2v9f7fE2KMOM5yWbXsTzqOC8gpxQXkFOECcopwATlFuICcIlxAThEuIKcIF5BThAvIKcIF5BThAnKmS0Aa9HQNeiKNoUEP06BbqYyqBKRBLwNeBLZp0CNoBA26EXgPeFSDnkdFVCEgDf/8KPAIMADWAdfTABr0XOB14EA7HqpBqzgu2MEoRoN+ABwEzEuUjUsZX8RnPwSOBvbKyvcBNzNmSvZrkft9JLBvVn4LOF+i/MU0Cci+pEOWOb7gmAbdDzgWmLFSSr/dJFHuZmUo2a8Fx63DbAD2zspPAJdLlF+piN62Sg16OPB2Jp7ERSsonrGgQfcEnhoSz53A1trEM8oONA5Tuc18QccOifIMFaNBk3d7HjgpK++SKLdSKat6bioTf9jrbipGgx4FvJOJpwuj/0TF9EpAGvRa4NnMML8JfEP9rDbxJNOc+Cp1VBqgTwLaB7g/26ZkKs/MztSaWQfsb+8/BjYBv9MAfRJQE6ayI61cAbP8m1eAzRLlCxph0ANTmX47/gSukSgPUDEadGDddC4rPwxcLVGa6DwTF5CZyu3mD7BL1TkS5SUqRoOmrvMkcHZW/h64UqK0cDmevIA06CnAc5kv6KbptYvnYFt+OH5o6IcWxTMRD6RBLwFezcTTtfSqW7sGPc5uiHbi2dXKTKtPApq12dVMZipb+JJn7D7Wofb358DJta9d9VFAual8CNjSyDT9gGzf3k+LhRLlE6aAVStkKtcOlW8Hrqp5RmLT9LmhcvJ1p0mUr5kSBitgKl8A1mTlSyXKY1SMBl1tHXQ2K99rSYG0FDE1DMZsKrdnvqCbadUunhQxSTd1T83K30mUG5hCxnIJ06BnWBSjE093VlZtKrOISSeeaK8/MqWMXEAa9ArrPLOZqaz+hqhFTN4FjrHSDmAnU86oBTRn3mCQmcp0tlYT0VyANUMRk08tlrGbKWfUAho2lRdKlJ+pn7VZxOSNtMYjUT6b8Da1YaLNVKZ1EDJfcKNEuYeKsdxyipjkPG655d8mtFltdaD/yC0n8VzQgHhSt3l6KGJyhy1BuHhG0YE06Al243B9Vt4pUVKisFo06HrLLafQV8e3EuW2CW5WWx3Inp58LRNPK7nlDRY93TQ0TW/Bx/WjA2nQ64B0iUpL+Z2pnLNg2PwCH+vq80scW8z4SNCgmy2P3aUEvkwLhOaDlrtt8/8zviL7NW7CUv5TvRnLdGvirNZMpQa9xXxOl1ve0lL0tBeXMHvk9mLgowZN5V3Ag8DLreWWe9OB8qcrJcovNIYG3SO91pwSqEJAjtPHx3qcCnEBOUW4gJwiXEBOES4gpwgXkFOEC8gpwgXkFOECcopwATlFuICcIlxADiX8DW5ZVYw89+75AAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #ffece3; border-radius: 50px">106</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="37.22222222222222" width="40" height="77.77777777777777" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="103.88888888888889" width="40" height="11.111111111111114" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">9</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">9</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">7</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">1</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Chocolate Santafereño (Colombian-Style Hot Chocolate)</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAA9klEQVR4nO3UQRGAMBAEwQRLUYsnPIGBDAbS/bz7Tu18nwFb1/4M4uCHOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIImDJA6SOEjiIM2x7v5yNMtBEgdJHCRxkMRBEgdJHCRxkMRBEgdJHCRxkMRBEgdJHCRxkMRBEgdJHCRxkMRBms9Y/eVoloMkDpI4SOIgiYMkDpI4SOIgiYMkDpI4SOIgiYMkDpI4SOIgiYMkDpI4SOIgiYMkDkb5AFsIBEjtANdRAAAAAElFTkSuQmCC" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 cup whole milk, 2 ounces bittersweet or dark chocolate(85% cacao), 1 pinch cinnamon, 1 pinch ground cloves, 1 (1-ounce) mozzarella cube</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACuklEQVR4nO2bzatNURTAf08vX/Hk+4XaokQyw8jAACkfA5QBA5QJsXmmyMzUwkgZipEoX8WAJyH8EXv2wtg3T/u2b51uvbjv3XvPunuvX93Oae3O3af7O2ftdfY+d2B8fByjXqbV3L9hEnRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhTQdxKcsM0Jm8mIvpLghCPAY+CBE1aRCYP0AU4YAC4BF1NoMXAaOEMGdESCE94Dw8BY8Gxsp939+9gPwFpgdiV8DThHJnTqTog/4vJJtg9P1OaE+cB6YEYKxRWokeC5QkaoTUdOWAk8qgiIHAieu2SGyoHZSSMtvQHWVcKfchSgUoIT9gAvgKUp9Cttf5ApqiQ44SRwrzIIvwQ+kjmaJMwDrlfO6Q6wIw3GWaNJwpzK/mXgUPB8owBqrY6cNB664qfJb+BE8NygIGqT4IQ1qQSdnkIx7ewOnicURi3pyAlbgNfA6pYStDgBtUhwwkHgGbAghX62bIuj1xLmpqqn+RT8NN4BFE6vJQxV9m8Cu0ooQWuX4KRx9S9sCZ8HjgdfbgrqWXXkhGXAQ2BmJXw4eG51s99+o2sSnLAhlaArWiogE9CLdOSE7cCrioD4EJb1JJwqCU44lu6AOBZE3pUwCadJwlCqeppp7j6wFfjT4X6yotMSmld/5CqwP3i+dLiP7JjywJzWgRdVQrHuPxs8MtXvLoXBDq8DRwH7gm8szBjdTkdO2AS8bVkH/mwCeiTBCXuB58CSUtaBVaUjJ5yCRr6Pb8VFRlNVFBdnxiY4rBkfa7Ptf9r7noF2/tHvpHHnxGmInSl0GzgaPN+7doYF0JaEyoTcaBqQLwRvzwA9lxBxwqzg+Trl3o3JSzDyfeWlWEyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkwC9fMX+/iXjH3JaZAAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fcb499; border-radius: 50px">544</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="46.91489361702128" width="40" height="68.08510638297872" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="78.82978723404256" width="40" height="36.170212765957444" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">47</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">32</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">47</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">17</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Cuban Crunchwrap</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAADgElEQVR4nO2dW3LrIBAFcSo7Gq0JrUmsybOnW4TY15bfioABun+jWKpyhzmDgBwWkeBEnTiAa75E3aLqna5+AHA4XowZ4WcUqfo8YFUO5+IAEoQqA/fkSKi44DyVZnDuy5GgygzOMzkSKDIsr+UgiAzL1zsXiYvt7kK7OxhvjRyXUGXG4WM5EjNVZgA2ynFqd1GkZ7bLkVCRGT865a9yJAgiXbKPHLS7XbKbHAmCyHDzHO/DAoCe2HnkuIQg0joZ5YiIyOKdoEiTZJYj4UU8irRHETnS6xnvoyLQDqXkSIiLfqBII5SVI0EQaYQaciS8yLLUuTVUmef4gKA6TS6Eag8AdkeOqyCyOF/7McCiHAnaXXuYkSPhfcyqMHrmuEsIBBE7GBs5zoiLvQxVpipW5UgQRPqRI33S7q/rCSI9ZA6RLH/lBJEO5BDvJVMJUKdz0Gl2yjKiFsuKODke4/c4TXkXghFE2hs5zt9W7q8tqM6zUmXy873XB4n8ZkaJa9AzD/7q3Bx0Dmy8a6GsnGpKQg+TKwVbIsyXlVUpKfgWjRMArMuxalJy9SxPHkD1qIEtEZXKSrzq4ZVyXG46z/nxZ2XMJFSZOnLs87JDY6+RPbCy8a58II3T2H9ZHhxii7H91z+9G7uqSncrW9d+xgEjVMgEKFK2lf20xBQpJc/uTxAp162o02l+s0Cc3olsuQ+0PAkmsu5TrrHwqoyyUn/63CBoUXMSTF7NhL68IBMq8bxDzKg6crzMpMWnSsmeNuS4XfeVXqNfToTEazIsHHwAdcSKHKuS8X8aQ/VyIkS8LzDxxYmXxjLHedjQtOtVrzbBnpuUzJUlLu3ADFut7HlR4BweLv09rRrPt3CQxT4W5UgHbEQznk9j/BzFoUF3XjvOOUGWM0dUIrwx75kmzk8rCPeBBcalsL3jbQVHApWlkRlSDhOrQQtysB2yErblIF5UxaocHMFgAHtyEC/MYEwO4oUlzMhBvLCHATk4atIqVeUgXtimnhwcb22eGnIwC94IZeWgjjRFKTl4yd4gReSgTW2TzHIQL1qGfx0KZUcOtOiDneXg1JSe2E0Otpr1xz5yUEe65K9ysNWsY7bLQbzono1ysNVsBD6Wg3gxDh/IQbwYjbfkoE0dk9dyUEeG5ZkcaDE434/bVM/ZoYOzloN4AffloI7AHTnQAm75Jl6Ae8A/beJrCflG9rUAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 extra large flour tortilla (12 inches or larger), 2 ounces sliced ham, 2 ounces cooked pork, 2 teaspoons mustard, 1/2 cup kettle potato chips, 1/4 cup shredded Swiss cheese, 4 dill pickle slices, 1 tablespoon butter</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACuklEQVR4nO2bzatNURTAf08vX/Hk+4XaokQyw8jAACkfA5QBA5QJsXmmyMzUwkgZipEoX8WAJyH8EXv2wtg3T/u2b51uvbjv3XvPunuvX93Oae3O3af7O2ftdfY+d2B8fByjXqbV3L9hEnRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhTQdxKcsM0Jm8mIvpLghCPAY+CBE1aRCYP0AU4YAC4BF1NoMXAaOEMGdESCE94Dw8BY8Gxsp939+9gPwFpgdiV8DThHJnTqTog/4vJJtg9P1OaE+cB6YEYKxRWokeC5QkaoTUdOWAk8qgiIHAieu2SGyoHZSSMtvQHWVcKfchSgUoIT9gAvgKUp9Cttf5ApqiQ44SRwrzIIvwQ+kjmaJMwDrlfO6Q6wIw3GWaNJwpzK/mXgUPB8owBqrY6cNB664qfJb+BE8NygIGqT4IQ1qQSdnkIx7ewOnicURi3pyAlbgNfA6pYStDgBtUhwwkHgGbAghX62bIuj1xLmpqqn+RT8NN4BFE6vJQxV9m8Cu0ooQWuX4KRx9S9sCZ8HjgdfbgrqWXXkhGXAQ2BmJXw4eG51s99+o2sSnLAhlaArWiogE9CLdOSE7cCrioD4EJb1JJwqCU44lu6AOBZE3pUwCadJwlCqeppp7j6wFfjT4X6yotMSmld/5CqwP3i+dLiP7JjywJzWgRdVQrHuPxs8MtXvLoXBDq8DRwH7gm8szBjdTkdO2AS8bVkH/mwCeiTBCXuB58CSUtaBVaUjJ5yCRr6Pb8VFRlNVFBdnxiY4rBkfa7Ptf9r7noF2/tHvpHHnxGmInSl0GzgaPN+7doYF0JaEyoTcaBqQLwRvzwA9lxBxwqzg+Trl3o3JSzDyfeWlWEyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkwC9fMX+/iXjH3JaZAAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #FFFFFF; background-color: #67000d; border-radius: 50px">2,010</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="88.10606060606061" width="40" height="26.89393939393939" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="86.21212121212122" width="40" height="28.787878787878782" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">264</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">71</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">264</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">76</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Easy Mojitos</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAADgElEQVR4nO2dW3LrIBAFcSo7Gq0JrUmsybOnW4TY15bfioABun+jWKpyhzmDgBwWkeBEnTiAa75E3aLqna5+AHA4XowZ4WcUqfo8YFUO5+IAEoQqA/fkSKi44DyVZnDuy5GgygzOMzkSKDIsr+UgiAzL1zsXiYvt7kK7OxhvjRyXUGXG4WM5EjNVZgA2ynFqd1GkZ7bLkVCRGT865a9yJAgiXbKPHLS7XbKbHAmCyHDzHO/DAoCe2HnkuIQg0joZ5YiIyOKdoEiTZJYj4UU8irRHETnS6xnvoyLQDqXkSIiLfqBII5SVI0EQaYQaciS8yLLUuTVUmef4gKA6TS6Eag8AdkeOqyCyOF/7McCiHAnaXXuYkSPhfcyqMHrmuEsIBBE7GBs5zoiLvQxVpipW5UgQRPqRI33S7q/rCSI9ZA6RLH/lBJEO5BDvJVMJUKdz0Gl2yjKiFsuKODke4/c4TXkXghFE2hs5zt9W7q8tqM6zUmXy873XB4n8ZkaJa9AzD/7q3Bx0Dmy8a6GsnGpKQg+TKwVbIsyXlVUpKfgWjRMArMuxalJy9SxPHkD1qIEtEZXKSrzq4ZVyXG46z/nxZ2XMJFSZOnLs87JDY6+RPbCy8a58II3T2H9ZHhxii7H91z+9G7uqSncrW9d+xgEjVMgEKFK2lf20xBQpJc/uTxAp162o02l+s0Cc3olsuQ+0PAkmsu5TrrHwqoyyUn/63CBoUXMSTF7NhL68IBMq8bxDzKg6crzMpMWnSsmeNuS4XfeVXqNfToTEazIsHHwAdcSKHKuS8X8aQ/VyIkS8LzDxxYmXxjLHedjQtOtVrzbBnpuUzJUlLu3ADFut7HlR4BweLv09rRrPt3CQxT4W5UgHbEQznk9j/BzFoUF3XjvOOUGWM0dUIrwx75kmzk8rCPeBBcalsL3jbQVHApWlkRlSDhOrQQtysB2yErblIF5UxaocHMFgAHtyEC/MYEwO4oUlzMhBvLCHATk4atIqVeUgXtimnhwcb22eGnIwC94IZeWgjjRFKTl4yd4gReSgTW2TzHIQL1qGfx0KZUcOtOiDneXg1JSe2E0Otpr1xz5yUEe65K9ysNWsY7bLQbzono1ysNVsBD6Wg3gxDh/IQbwYjbfkoE0dk9dyUEeG5ZkcaDE434/bVM/ZoYOzloN4AffloI7AHTnQAm75Jl6Ae8A/beJrCflG9rUAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">12 leaves mint, 2 lime slices, 1 teaspoon white sugar, or more to taste, ¼ cup ice cubes, or as needed, 1 (1.5 fluid ounce) jigger rum (such as Bacardi), 4 ½ ounces diet lemon-lime soda (such as Diet Sprite)</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #ffebe2; border-radius: 50px">121</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="114.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="114.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">7</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">7</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Italian Cherry Margarita</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAA+klEQVR4nO3SQRGDUBTAwFcsFU14whPVBApyLn9mV0EO+cz5ndXcxzWr+e37rGb7dwDvZQ6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDZA6SOUjmIJmDKQ93RQTm+H+3VwAAAABJRU5ErkJggg==" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">2 fresh cherries, pitted, or more to taste, plus more for garnish, 2 teaspoons fresh lime juice, 1 1/2 fluid ounces reposado tequila, 1 fluid ounce amaretto liqueur</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fee2d5; border-radius: 50px">222</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="114.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="114.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">16</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">16</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Homemade Za'atar</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAEq0lEQVR4nO2cYXLiMAxGzU5vJM7knMk+U3QmdmwlxiQRJLRMG+l7P7ptWmhneSN/kh0uN6IAwBb/Nq8CADnAMyAHUIEcQAVyABXIAVQgB1CBHEAFcgAVyAFUIAdQgRxABXIAFcgBVCAHUIEcQAVyABXIAVQgB1CBHEAFcgAVyAFULrfbTf+uIwbOmfkW02//IX8IyBEy5yoHhxAiUaL423/RX8G7HFIw+iuJYsSNXhXXcqzNEESOSNG5I37luLKsJM8gClQ/+KwlTuXgwMw77JgRN1KpJY4scdrKHn2NudgUrjkPNb06wV3lkJCRp3/fZIwuSshXcENZR2Ynxhjb5328yMwtXmRmKp/z4scSJfte+Kwc1zzUzHFHbJDxxiUPvRy3mDLndTRx0u46kmPgXHPo9CVRiCEOnNvL3H9XICpRow+kzNOS5CGiepFj0bgShZESz4XkJbRSgWv1MWyGFznWS0MsaYLeaD2ip/m6ZTl43jfZ2ZlEKoG0pZCsPEqqTnCAWTmej8Y348VI6cpDCDTW2nDNA5elhELpYopk7REUQorlZ7CsnIxcRp8P60WkMv8eOFOYFgUOfM35ecJgvi8i4tl6GbLdthiU41IzZptbtJdQhJgqx7JwqMSaTnKolYN9pRCDcvRIT/GkSBwlFcm244gUkGRoeGp8QvqtIfmKMhqhyIHb00rZkG28n/xNfwPLlUPLpIsBVz8SffmcVObpXTKtkzRZwoI5bMqRmV9urSWK06yzuzjGJE3KG4hk5fxH3ZIxgCk5ph3XMiZ/B+lmpWsN86lSz9u2X4bHoH21p7JN/yIXMIe6VftYTJ5C9TTherUyYIadyrG5d7q4z2A9//g+VAJpmZJZcMGkHC14tu0xaV9TmX1NI6+SQj7ZT1A959EaWhtYkEPiZyzHgOPOVuVt4tNtFzNpw44cCz6hBdWXW7pWKUJyRXbg1ouajbG6pUC6K1JIEFkLVMfkaofC9fJQQu10pTvYMV3tB/P1YNHpx+pGKsf+ajHW3VQJJf2pDpl1yr7MUehxE79NWWpWXbYzJ8KCHJtm1J22jeZVin3bk2tnOPqZ6VGoTs8WF/n84fT0cqxvXOu3SdfHiT8EzRXCQNQ4vRxSulsaqK/NQ7fyocHGvp7WSMNySjlK4suD/P/LjayLF4NDqSc/slFK0wBDBvN7hyU2DnmcUo5NasKoJ0ZXSUNOgolA2pmu/XOLXJ7+/gvke+3r3p508oXm9HLIWYrNfZO20ND3uhs6uEYslrPzVhEDchQvWg+y81H748gY37/5sd2X2w4tn4vTy/G5N+ewNw4/iru3YKjvpXAgqrK9038Ox+c7OdrcsoVp1pv4qhxly6OWjv3kx97EFY4yR9+h9KOqdku0llLJzf2PHuWo26RTAu3fjSPsbnFpOkbk5W1b7MvRbjCZz4mVI30vW49WP+I8n2jPw8yW7llyKoeUiu4tIo8NKVvIoNVsdOD76UPzXG6nHe6CT+OrWwGHgBxABXIAFcgBVCAHUIEcQAVyABXIAVQgB1CBHEAFcgAVyAFUIAdQgRxABXIAFcgBVCAHUIEcQAVyABXIAVQgB1CBHCBo/AcMHMTxeUcKLAAAAABJRU5ErkJggg==" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">3 tablespoons sesame seeds, 3 tablespoons fresh thyme leaves, 1 tablespoon sumac powder, ½ teaspoon salt</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAA5UlEQVR4nO3bsWnDUBRA0WeTIQwpvET2yizZy0uk0xZy4yqNcDDoIp/TqHg8CXThV9JpXddhX+edn48IDSIEiBAgQoAIASIEiBAgQoAIASIEiBAgQoAIASIEfLziJtefuc3MZWaW3+/5emZ+3dh9By+J8HiJn/+cXzZ2D89xFCBCgAgBIgSIECBCgAgBIgSIECBCgAgBIgSIECBCgAgBIgSIECBCgAgBIgSIECBCgAgH+u5o+XN9Zr5s7B7eyR/9+3McBYgQIEKACAEiBIgQIEKACAEiBIgQIEKACAEiBIgQIMLs7w6lDBh85orxawAAAABJRU5ErkJggg==" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fff3ed; border-radius: 50px">29</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="65.0" width="40" height="50.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">2</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">2</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">2</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">1</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Lebanese 7 Spices</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAEq0lEQVR4nO2cYXLiMAxGzU5vJM7knMk+U3QmdmwlxiQRJLRMG+l7P7ptWmhneSN/kh0uN6IAwBb/Nq8CADnAMyAHUIEcQAVyABXIAVQgB1CBHEAFcgAVyAFUIAdQgRxABXIAFcgBVCAHUIEcQAVyABXIAVQgB1CBHEAFcgAVyAFULrfbTf+uIwbOmfkW02//IX8IyBEy5yoHhxAiUaL423/RX8G7HFIw+iuJYsSNXhXXcqzNEESOSNG5I37luLKsJM8gClQ/+KwlTuXgwMw77JgRN1KpJY4scdrKHn2NudgUrjkPNb06wV3lkJCRp3/fZIwuSshXcENZR2Ynxhjb5328yMwtXmRmKp/z4scSJfte+Kwc1zzUzHFHbJDxxiUPvRy3mDLndTRx0u46kmPgXHPo9CVRiCEOnNvL3H9XICpRow+kzNOS5CGiepFj0bgShZESz4XkJbRSgWv1MWyGFznWS0MsaYLeaD2ip/m6ZTl43jfZ2ZlEKoG0pZCsPEqqTnCAWTmej8Y348VI6cpDCDTW2nDNA5elhELpYopk7REUQorlZ7CsnIxcRp8P60WkMv8eOFOYFgUOfM35ecJgvi8i4tl6GbLdthiU41IzZptbtJdQhJgqx7JwqMSaTnKolYN9pRCDcvRIT/GkSBwlFcm244gUkGRoeGp8QvqtIfmKMhqhyIHb00rZkG28n/xNfwPLlUPLpIsBVz8SffmcVObpXTKtkzRZwoI5bMqRmV9urSWK06yzuzjGJE3KG4hk5fxH3ZIxgCk5ph3XMiZ/B+lmpWsN86lSz9u2X4bHoH21p7JN/yIXMIe6VftYTJ5C9TTherUyYIadyrG5d7q4z2A9//g+VAJpmZJZcMGkHC14tu0xaV9TmX1NI6+SQj7ZT1A959EaWhtYkEPiZyzHgOPOVuVt4tNtFzNpw44cCz6hBdWXW7pWKUJyRXbg1ouajbG6pUC6K1JIEFkLVMfkaofC9fJQQu10pTvYMV3tB/P1YNHpx+pGKsf+ajHW3VQJJf2pDpl1yr7MUehxE79NWWpWXbYzJ8KCHJtm1J22jeZVin3bk2tnOPqZ6VGoTs8WF/n84fT0cqxvXOu3SdfHiT8EzRXCQNQ4vRxSulsaqK/NQ7fyocHGvp7WSMNySjlK4suD/P/LjayLF4NDqSc/slFK0wBDBvN7hyU2DnmcUo5NasKoJ0ZXSUNOgolA2pmu/XOLXJ7+/gvke+3r3p508oXm9HLIWYrNfZO20ND3uhs6uEYslrPzVhEDchQvWg+y81H748gY37/5sd2X2w4tn4vTy/G5N+ewNw4/iru3YKjvpXAgqrK9038Ox+c7OdrcsoVp1pv4qhxly6OWjv3kx97EFY4yR9+h9KOqdku0llLJzf2PHuWo26RTAu3fjSPsbnFpOkbk5W1b7MvRbjCZz4mVI30vW49WP+I8n2jPw8yW7llyKoeUiu4tIo8NKVvIoNVsdOD76UPzXG6nHe6CT+OrWwGHgBxABXIAFcgBVCAHUIEcQAVyABXIAVQgB1CBHEAFcgAVyAFUIAdQgRxABXIAFcgBVCAHUIEcQAVyABXIAVQgB1CBHCBo/AcMHMTxeUcKLAAAAABJRU5ErkJggg==" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 tablespoon ground nutmeg, 1 tablespoon ground ginger, 1 tablespoon ground allspice, 1 tablespoon fenugreek seeds, 1 tablespoon freshly ground black pepper, 1 teaspoon ground cloves, 1 teaspoon cinnamon</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fff4ee; border-radius: 50px">15</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="81.66666666666667" width="40" height="33.33333333333333" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="81.66666666666667" width="40" height="33.33333333333333" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">3</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">1</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">3</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">1</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Pan con Tomate (Spanish Tomato Bread)</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAE4klEQVR4nO2cCZLbOAwANan9EfIm+k3DNw3etFsASIo6ME7lmJWc7srhoWQrKbYAEqT89rHIAnDGt9NWAOSAz0AOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSHn79yM/CH83RA5IQQ5IQQ5IQQ54ITlU7Rd8AfeTA76M+8lRVaryzQBfwT/L9dC171UXkUVlkkFETxKNn7b0r5M4ngOvIEfVZbYh7IgX/pf1vP/YDRL3op1mJ6nahxSCy4vJoWaF/x4quC72YsSCdz/y6A3S4oW9xV+YJTZoFeLHS8nhEWHROqkQAWDu5d1cRffNFlI8nMCLyRF3/dxiaSaax3GjTC07Y9axB7zWwtumjKGySHdlM/Q4tEg/uR8hcrxe5Gijy02caN3cJViZWuK0/i7MuH3kaPe8pIdamJAxU41jrbH/5Iemj/rkA5HmHnLUx9rBWadq9dHlbkB6YKSXUg7Hxnync3IOXE2O4/pI9LFJ85Ty/jwG6GONNoeBClx6zOHlqrO7eSfNWeTwDt6OPizIqJSogUwxyf+sUzLCjRvIEdOLpyfNM5VtVWOusdtExU72cBQ56vRamHGT2YoUsWJFJJhDLolhRL/RLRbsgsccDLwW6iXRaJH8WjXiCNxyKjszZrJrGlkrp10cH23a5JeU8VfJMS2wiOyr5pFDmhCbpEGF9PZyWO/6IsppX0adQ96ljSaL7FKP5ZBeu7Cc4oXVOa2oNH3aNdrUmdnKdaeybV1tdNJU0VoLo+PkaRbTxhxtYaWYG72+EVZYDprW6fXx8JHI+bqNFCy5YOToK66+ZUN824VGeGhL7XXVwhui31sdy8/2kKG1zYD7hg/bCDLXQeN9zYBidplEGvFG6yI+7YVrFcGi+90M6x+tNZqsr2Wp37P3+QTFY4Mnol4yjyhycpnvIr2kJkXcJK21iUid9JpjjuiYGCC4Ga2b29ijTOuru2X6Ke2sqy21bnYRjqtsZjdqWhhkk4sPSNuimvp2LuvliPBjhaUNIvbzjtgCWMRTgyWVSCKlZYrNFWrbMBaf7NUNd2hMd1HkgnKMAWnb9lmKV7F+YD+fd+e7WierRZ8a0UVOFvenN0VLESui+ubSOgakZJbLRY6ugc1S2339Yzs9e8mrxBxkJIh5k9h85va94i7Y5LlSIb3scytrF/5UZBe/4330YGtt827TsYssl229JGnlgpHDlPhN8bzlBd8KpPap68MKT9/FsPSqs5WoXf3y54zyuT3NsG15enW4evl8kXp05Ik0n27bSTvexihxLZ5kuXgRTJ/s9rORRNmXNVpLHcWy2uY4h6cWtNroU4o+vRZcTo5H1MZjxjE9qWaDBu9vrbtFkUkOq3N4lX0tqXtOaQ/JtcJ56WbUto2jl8zWa1X8uG4RbPNyOxe1m74VyuYtyF5RbeMVf2Q2ltli7dXrZuHWeTH9T/6HXpX/JXLMe3fWXcC7p+kHvglw7NWYHnIapTPbBHbS+/H0/em/wYolcLsn3uA63O/LW+DLQA5IQQ5IQQ5IeftgDQoSiByQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghywZPwHvBP4ZYYxFpoAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 large tomato, chopped, 2 slices crusty bread, 1 clove garlic, halved, 1 tablespoon extra-virgin olive oil, or to taste, sea salt to taste</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACuklEQVR4nO2bzatNURTAf08vX/Hk+4XaokQyw8jAACkfA5QBA5QJsXmmyMzUwkgZipEoX8WAJyH8EXv2wtg3T/u2b51uvbjv3XvPunuvX93Oae3O3af7O2ftdfY+d2B8fByjXqbV3L9hEnRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhRgEhTQdxKcsM0Jm8mIvpLghCPAY+CBE1aRCYP0AU4YAC4BF1NoMXAaOEMGdESCE94Dw8BY8Gxsp939+9gPwFpgdiV8DThHJnTqTog/4vJJtg9P1OaE+cB6YEYKxRWokeC5QkaoTUdOWAk8qgiIHAieu2SGyoHZSSMtvQHWVcKfchSgUoIT9gAvgKUp9Cttf5ApqiQ44SRwrzIIvwQ+kjmaJMwDrlfO6Q6wIw3GWaNJwpzK/mXgUPB8owBqrY6cNB664qfJb+BE8NygIGqT4IQ1qQSdnkIx7ewOnicURi3pyAlbgNfA6pYStDgBtUhwwkHgGbAghX62bIuj1xLmpqqn+RT8NN4BFE6vJQxV9m8Cu0ooQWuX4KRx9S9sCZ8HjgdfbgrqWXXkhGXAQ2BmJXw4eG51s99+o2sSnLAhlaArWiogE9CLdOSE7cCrioD4EJb1JJwqCU44lu6AOBZE3pUwCadJwlCqeppp7j6wFfjT4X6yotMSmld/5CqwP3i+dLiP7JjywJzWgRdVQrHuPxs8MtXvLoXBDq8DRwH7gm8szBjdTkdO2AS8bVkH/mwCeiTBCXuB58CSUtaBVaUjJ5yCRr6Pb8VFRlNVFBdnxiY4rBkfa7Ptf9r7noF2/tHvpHHnxGmInSl0GzgaPN+7doYF0JaEyoTcaBqQLwRvzwA9lxBxwqzg+Trl3o3JSzDyfeWlWEyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkyCAkwC9fMX+/iXjH3JaZAAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fdd6c4; border-radius: 50px">322</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="73.97435897435898" width="40" height="41.02564102564102" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="97.05128205128204" width="40" height="17.948717948717956" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">39</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">16</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">39</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">7</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Spanish Gin and Tonic (Gin Tonica)</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAE4klEQVR4nO2cCZLbOAwANan9EfIm+k3DNw3etFsASIo6ME7lmJWc7srhoWQrKbYAEqT89rHIAnDGt9NWAOSAz0AOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSHn79yM/CH83RA5IQQ5IQQ5IQQ54ITlU7Rd8AfeTA76M+8lRVaryzQBfwT/L9dC171UXkUVlkkFETxKNn7b0r5M4ngOvIEfVZbYh7IgX/pf1vP/YDRL3op1mJ6nahxSCy4vJoWaF/x4quC72YsSCdz/y6A3S4oW9xV+YJTZoFeLHS8nhEWHROqkQAWDu5d1cRffNFlI8nMCLyRF3/dxiaSaax3GjTC07Y9axB7zWwtumjKGySHdlM/Q4tEg/uR8hcrxe5Gijy02caN3cJViZWuK0/i7MuH3kaPe8pIdamJAxU41jrbH/5Iemj/rkA5HmHnLUx9rBWadq9dHlbkB6YKSXUg7Hxnync3IOXE2O4/pI9LFJ85Ty/jwG6GONNoeBClx6zOHlqrO7eSfNWeTwDt6OPizIqJSogUwxyf+sUzLCjRvIEdOLpyfNM5VtVWOusdtExU72cBQ56vRamHGT2YoUsWJFJJhDLolhRL/RLRbsgsccDLwW6iXRaJH8WjXiCNxyKjszZrJrGlkrp10cH23a5JeU8VfJMS2wiOyr5pFDmhCbpEGF9PZyWO/6IsppX0adQ96ljSaL7FKP5ZBeu7Cc4oXVOa2oNH3aNdrUmdnKdaeybV1tdNJU0VoLo+PkaRbTxhxtYaWYG72+EVZYDprW6fXx8JHI+bqNFCy5YOToK66+ZUN824VGeGhL7XXVwhui31sdy8/2kKG1zYD7hg/bCDLXQeN9zYBidplEGvFG6yI+7YVrFcGi+90M6x+tNZqsr2Wp37P3+QTFY4Mnol4yjyhycpnvIr2kJkXcJK21iUid9JpjjuiYGCC4Ga2b29ijTOuru2X6Ke2sqy21bnYRjqtsZjdqWhhkk4sPSNuimvp2LuvliPBjhaUNIvbzjtgCWMRTgyWVSCKlZYrNFWrbMBaf7NUNd2hMd1HkgnKMAWnb9lmKV7F+YD+fd+e7WierRZ8a0UVOFvenN0VLESui+ubSOgakZJbLRY6ugc1S2339Yzs9e8mrxBxkJIh5k9h85va94i7Y5LlSIb3scytrF/5UZBe/4330YGtt827TsYssl229JGnlgpHDlPhN8bzlBd8KpPap68MKT9/FsPSqs5WoXf3y54zyuT3NsG15enW4evl8kXp05Ik0n27bSTvexihxLZ5kuXgRTJ/s9rORRNmXNVpLHcWy2uY4h6cWtNroU4o+vRZcTo5H1MZjxjE9qWaDBu9vrbtFkUkOq3N4lX0tqXtOaQ/JtcJ56WbUto2jl8zWa1X8uG4RbPNyOxe1m74VyuYtyF5RbeMVf2Q2ltli7dXrZuHWeTH9T/6HXpX/JXLMe3fWXcC7p+kHvglw7NWYHnIapTPbBHbS+/H0/em/wYolcLsn3uA63O/LW+DLQA5IQQ5IQQ5IeftgDQoSiByQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghywZPwHvBP4ZYYxFpoAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">whole spices, such as juniper berries, pink peppercorns, star anise, cardamom pods, cloves, or cinnamon sticks, 2 fluid ounces gin, 4 to 6 fluid ounces tonic water, to taste, sliced fresh citrus fruit, such as lemon, orange, lime, or blood orange, fresh herbs, such as basil, thyme, mint, rosemary, or tarragon</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAA6CAYAAAB79J21AAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAC6klEQVR4nO2cy6tNURjAf+smr7jyvmEgSiQzjAwMkPIYoAwYoEyIPKZYvpGp10gZipEor2LAlRD+jxPG3iytWqd2J7dzj3P3Xmd99/vV6ey+1T772/1a63xrr3WOCyFg6GUodwJGvZhg5Zhg5Zhg5Zhg5Zhg5Zhg5Zhg5Zhg5Zhg5Zhg5Zhg5RQnWJxsEScbc+dRCkUJFieHgMfAA3GyInc+JTCFAhAnDrgIXEihhcBJ4FTm1CaHYHHyHhgBWj749b20j+PcD8BqYGYlfA04S81IH/fVrb3buYPWg2OiS/+zfcw2cTIXWAtMS6G4O+GMD/4yzTDSx311a+92ru4hWpwsBx5V5Eb2+eDvZkyrOAayyBIncch6A6yphD+ZXAWCxcku4AWwOIV+pfcfGdMqloESLE6OA/cqBdVL4GPmtIpmkATPAa5XcroDbEuFlaFA8KzK8SXggA/+W8Z8VJC1ihYn8YFFfLX5DRzzwd/ImJYqsgkWJ6vSNGhqCsWheKcP/kmunDSSZYgWJ5uA18DKjmmQyS1dsDjZDzwD5qXQz453o2DBs1N13H469TT23IZzmFQ0LXi4cnwT2GHToMIFi5PYa+d3hM8BR33wNiyXXEWLkyXAQ2B6JXzQB3+rzusaDQgWJ+vSNGhZR6VscksfosXJVuBVRW58gBGxBYPSBYuTI6nnxu/eyDtbMNAjeDhVx+2h/z6wGfgzwdcxMglu99rIVWCvD/7LBF/DaLLISvumFlRCcV572gd/pd/PNjIL/se+qSh3jw8+LtobJQ/R4mQD8LZj39Rnk6tAsDjZDTwHFqWQ7ZvSMkSLkxNA/H6NvzaIjKbqOS7ct8Y4rR1v9dg2nvY6aXW5dj/tjdyX6+Wf7sTJUHr0uD2FbgOHffDfa8vQaE5wZfFgNBVX533wNsfVJDgiTmb44L/WkpGRX7BRDoO0bdaoAROsHBOsHBOsHBOsHBOsHBOsHBOsHBOsHBOsHBOsHBOMbv4C9JXLKa45kGUAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fdcfbc; border-radius: 50px">366</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="112.2972972972973" width="40" height="2.7027027027026946" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="105.54054054054053" width="40" height="9.459459459459467" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">74</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">2</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">74</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">7</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Indian Summer Raspberry Peach Sangria</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAAE4klEQVR4nO2cCZLbOAwANan9EfIm+k3DNw3etFsASIo6ME7lmJWc7srhoWQrKbYAEqT89rHIAnDGt9NWAOSAz0AOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSEEOSHn79yM/CH83RA5IQQ5IQQ5IQQ54ITlU7Rd8AfeTA76M+8lRVaryzQBfwT/L9dC171UXkUVlkkFETxKNn7b0r5M4ngOvIEfVZbYh7IgX/pf1vP/YDRL3op1mJ6nahxSCy4vJoWaF/x4quC72YsSCdz/y6A3S4oW9xV+YJTZoFeLHS8nhEWHROqkQAWDu5d1cRffNFlI8nMCLyRF3/dxiaSaax3GjTC07Y9axB7zWwtumjKGySHdlM/Q4tEg/uR8hcrxe5Gijy02caN3cJViZWuK0/i7MuH3kaPe8pIdamJAxU41jrbH/5Iemj/rkA5HmHnLUx9rBWadq9dHlbkB6YKSXUg7Hxnync3IOXE2O4/pI9LFJ85Ty/jwG6GONNoeBClx6zOHlqrO7eSfNWeTwDt6OPizIqJSogUwxyf+sUzLCjRvIEdOLpyfNM5VtVWOusdtExU72cBQ56vRamHGT2YoUsWJFJJhDLolhRL/RLRbsgsccDLwW6iXRaJH8WjXiCNxyKjszZrJrGlkrp10cH23a5JeU8VfJMS2wiOyr5pFDmhCbpEGF9PZyWO/6IsppX0adQ96ljSaL7FKP5ZBeu7Cc4oXVOa2oNH3aNdrUmdnKdaeybV1tdNJU0VoLo+PkaRbTxhxtYaWYG72+EVZYDprW6fXx8JHI+bqNFCy5YOToK66+ZUN824VGeGhL7XXVwhui31sdy8/2kKG1zYD7hg/bCDLXQeN9zYBidplEGvFG6yI+7YVrFcGi+90M6x+tNZqsr2Wp37P3+QTFY4Mnol4yjyhycpnvIr2kJkXcJK21iUid9JpjjuiYGCC4Ga2b29ijTOuru2X6Ke2sqy21bnYRjqtsZjdqWhhkk4sPSNuimvp2LuvliPBjhaUNIvbzjtgCWMRTgyWVSCKlZYrNFWrbMBaf7NUNd2hMd1HkgnKMAWnb9lmKV7F+YD+fd+e7WierRZ8a0UVOFvenN0VLESui+ubSOgakZJbLRY6ugc1S2339Yzs9e8mrxBxkJIh5k9h85va94i7Y5LlSIb3scytrF/5UZBe/4330YGtt827TsYssl229JGnlgpHDlPhN8bzlBd8KpPap68MKT9/FsPSqs5WoXf3y54zyuT3NsG15enW4evl8kXp05Ik0n27bSTvexihxLZ5kuXgRTJ/s9rORRNmXNVpLHcWy2uY4h6cWtNroU4o+vRZcTo5H1MZjxjE9qWaDBu9vrbtFkUkOq3N4lX0tqXtOaQ/JtcJ56WbUto2jl8zWa1X8uG4RbPNyOxe1m74VyuYtyF5RbeMVf2Q2ltli7dXrZuHWeTH9T/6HXpX/JXLMe3fWXcC7p+kHvglw7NWYHnIapTPbBHbS+/H0/em/wYolcLsn3uA63O/LW+DLQA5IQQ5IQQ5IeftgDQoSiByQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghyQghywZPwHvBP4ZYYxFpoAAAAASUVORK5CYII=" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 (750 milliliter) bottle red wine, 24 fluid ounces raspberry-flavored soda water, ½ cup peach schnapps, ½ cup pomegranate juice, ½ cup fresh lemon juice, 2 peaches, sliced, 2 lemons, sliced, 1 cup fresh raspberries, 1 orange, sliced, 4 cups ice cubes, or as desired</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAA6CAYAAABfwdAwAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAEYklEQVR4nO2cXailUxjHf2va5gw5x8eYIRRRhuRCDSOZohANEuJiXCBKhHDlo56eG1z6upKPUvJVQmMIFz5DKLmRG7lAh5kyvhkfS0vPW8vO0Tln7X32u9Z+fqfT3udZ7Xrf/f7f5/2v9f7fE2KMOM5yWbXsTzqOC8gpxQXkFOECcopwATlFuICcIlxAThEuIKcIF5BThAvIKcIF5BThAnKmS0Aa9HQNeiKNoUEP06BbqYyqBKRBLwNeBLZp0CNoBA26EXgPeFSDnkdFVCEgDf/8KPAIMADWAdfTABr0XOB14EA7HqpBqzgu2MEoRoN+ABwEzEuUjUsZX8RnPwSOBvbKyvcBNzNmSvZrkft9JLBvVn4LOF+i/MU0Cci+pEOWOb7gmAbdDzgWmLFSSr/dJFHuZmUo2a8Fx63DbAD2zspPAJdLlF+piN62Sg16OPB2Jp7ERSsonrGgQfcEnhoSz53A1trEM8oONA5Tuc18QccOifIMFaNBk3d7HjgpK++SKLdSKat6bioTf9jrbipGgx4FvJOJpwuj/0TF9EpAGvRa4NnMML8JfEP9rDbxJNOc+Cp1VBqgTwLaB7g/26ZkKs/MztSaWQfsb+8/BjYBv9MAfRJQE6ayI61cAbP8m1eAzRLlCxph0ANTmX47/gSukSgPUDEadGDddC4rPwxcLVGa6DwTF5CZyu3mD7BL1TkS5SUqRoOmrvMkcHZW/h64UqK0cDmevIA06CnAc5kv6KbptYvnYFt+OH5o6IcWxTMRD6RBLwFezcTTtfSqW7sGPc5uiHbi2dXKTKtPApq12dVMZipb+JJn7D7Wofb358DJta9d9VFAual8CNjSyDT9gGzf3k+LhRLlE6aAVStkKtcOlW8Hrqp5RmLT9LmhcvJ1p0mUr5kSBitgKl8A1mTlSyXKY1SMBl1tHXQ2K99rSYG0FDE1DMZsKrdnvqCbadUunhQxSTd1T83K30mUG5hCxnIJ06BnWBSjE093VlZtKrOISSeeaK8/MqWMXEAa9ArrPLOZqaz+hqhFTN4FjrHSDmAnU86oBTRn3mCQmcp0tlYT0VyANUMRk08tlrGbKWfUAho2lRdKlJ+pn7VZxOSNtMYjUT6b8Da1YaLNVKZ1EDJfcKNEuYeKsdxyipjkPG655d8mtFltdaD/yC0n8VzQgHhSt3l6KGJyhy1BuHhG0YE06Al243B9Vt4pUVKisFo06HrLLafQV8e3EuW2CW5WWx3Inp58LRNPK7nlDRY93TQ0TW/Bx/WjA2nQ64B0iUpL+Z2pnLNg2PwCH+vq80scW8z4SNCgmy2P3aUEvkwLhOaDlrtt8/8zviL7NW7CUv5TvRnLdGvirNZMpQa9xXxOl1ve0lL0tBeXMHvk9mLgowZN5V3Ag8DLreWWe9OB8qcrJcovNIYG3SO91pwSqEJAjtPHx3qcCnEBOUW4gJwiXEBOES4gpwgXkFOEC8gpwgXkFOECcopwATlFuICcIlxADiX8DW5ZVYw89+75AAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fee6db; border-radius: 50px">175</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="114.0" width="40" height="2" stroke="#808080" stroke-width="4" fill="#808080"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="110.45454545454545" width="40" height="4.545454545454547" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">22</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">0</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">22</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">1</text></g>
</svg>
</div></td>
</tr>
<tr>
<td class="gt_row gt_left gt_stub" data-quarto-table-cell-role="th" style="white-space: normal; background-color: aliceblue">Vietnamese Egg Coffee</td>
<td class="gt_row gt_center" style="border: 0px"><span style="white-space:nowrap;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAIAAACe4euXAAADA0lEQVR4nO2cDW4iMQxG01Vv9PVMcKbOmeo7rTJ/wC7mrxkg9ntCCBXEAPNqO3EmHz9SATjHn7N/BUAOuARygAtygAtygAtygAtygAtygAtygAtygAtygAtygAtygAtygAtygAtygAtygAtyHGPjDWaQ44B29QYrn4eHwGraU4gcK1blqH6QWWaQY2ZNKGSWFeRY2B0/oDKtUHMU7f7NI1PwsKEkBznO1aFUpiPIgRwu2WuO/3PKLU8lIbscl4KESnKQ46GncpBaDsl++YLYpJajfP/6BaHJK8eNUUGJg0deOQ5Tok1eFpHEctxYb6qkJakcdyULZc0s/cyQtj1DdyWLXSlD06NbH+GoGznmfe1eUgGoqNWwZWzmWSeR6KOz3QRltWXa1UdesX03MaPPmsNke/W3VsuKfakvMzqMHCdUR2rAf89vYMuKkN6ciCHHUfv03WYjhmJD9z9sb2nlHDaopvP3YR/BjCCRY0XfYzHyqi9k490+zu8ZSo5XZpkhSLQILsezR7w2Fp7dVp355HhaCLFQeSSRHIe2yBbLMoZ6Fy+VJJJjwfTT9O2+UrRrIwxlr9L8Cke927TKNqSQo/0/uUoGuunKPshUc2whh6ZpjciaBJdju4JK6qn5/hjB5dgw/quE5zP+fiwboeUQcTWJXJDePaa4f1cOhR62hI4ceqQ5ct+8qkpgAstxa06Z2/3LuKMqMtaZumVedd5DLKYjYWdIa/teDfqouhpI4rZXosrhz5dP0xP39VFtjiLKNZseM624deKDqy40pR4vimgXcwOxoKMVbbJ6zwaVs+sRA0aNPHLUKwOKtZjqNtN4kcHFw0UhoBwne3kNYyqpBWPLE2h7Te98/qBRiFhz6BlXmNmUoexKrdo1ASNHPU9Pu8LMliwTUY5QQ9l5UaBesHpPyyYATSqbNyGUHNCWiGkFGoEc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIc4IIcUDz+AtYhvLDVLHHZAAAAAElFTkSuQmCC" style="height: 2em;vertical-align: middle;" /></span></td>
<td class="gt_row gt_left" style="white-space: normal; background-color: papayawhip">1 large egg yolk, 2 tablespoons sweetened condensed milk, ½ cup hot strong coffee</td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAACwElEQVR4nO2by6tNURjAf+t284or7xsGokQyw8jAACmPAcqAAcqEyGOKzzcy9RopQzES5VUMuBLC/3HD2JulVevU7tSN455z9nfW/n512rtvtc/and/e3/r2WvuEGCNOvQzV3L/jEmzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgzgEgwwcBI06GYNuoGCGCgJGvQg8Ai4r0GXUwjDDAAaNAAXgPM5tAA4AZykALoiQYO+A0aBcYmyrpN2/fux74FVwIxK+CpwhkLo1p2QfsQl/9k+OlGbBp0DrAGm5lBagTotUS5REGbTkQZdBjysCEjslSh3KAyTA7MGTWnpNbC6Ev5YogCTEjToTuA5sCiHfubtdwrFlAQNegy4WxmEXwAfKBxLEmYD1yrndBvYmgfjorEkYWZl/yKwX6J8pQHUWh1p0PTQlT4tfgFHJcp1GkRtEjToylyCTsmhlHZ2SJTHNIxa0pEG3Qi8Ala0laCNE1CLBA26D3gKzM2hH23bxtFvCbNy1dN6Cn6S7gAaTr8ljFT2bwDbm1CC1i5Bg6arf15b+CxwRKI0NgX1rTrSoIuBB8C0SviARLnZy34HjZ5J0KBrcwm6tK0CcgH9SEcadAvwsiIgPYQVPQlnSoIGPZzvgDQWJN42YRLOkoSRXPW00tw9YBPwu8v9FEW3JbSu/sQVYI9E+dzlPopj0gNzXgeeXwmluv+URLk82e9uCsNdXgdOAnZLlLQw4/Q6HWnQ9cCbtnXgTy6gTxI06C7gGbCwKevAptKRBj0OpHyf3opLjOWqKC3OjE9wWCs+3mHbv7QPPKGTf/Rr0KE8DbEth24BhyTKt56dYQPoSEJlQm4sD8jnJIo/A/RbQkKDTpcoXybbuTMJCU65r7w0FpdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdgAJdA/fwBDx6vHU2TEtYAAAAASUVORK5CYII=" style="height:30px" /></td>
<td class="gt_row gt_center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA6CAYAAACgTzeXAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8fJSN1AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAn0lEQVR4nO3RMQEAIAzAMMC/5yFjPRIDPXpn5rDrLfcxocGEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTAgwIcCEABMCTDj7PrgLA3GHn2osAAAAAElFTkSuQmCC" style="height:30px" /></td>
<td class="gt_row gt_center" style="color: #000000; background-color: #fee6db; border-radius: 50px">175</td>
<td class="gt_row gt_center"><div>
<svg role="img" viewbox="0 0 250 130" style="height: 2em; margin-left: auto; margin-right: auto; font-size: inherit; overflow: visible; vertical-align: middle; position:relative;">
<defs><pattern id="area_pattern" width="8" height="8" patternunits="userSpaceOnUse"><path class="pattern-line" d="M 0,8 l 8,-8 M -1,1 l 4,-4 M 6,10 l 4,-4" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" shape-rendering="geometricPrecision"></path></pattern></defs>
<style> text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; stroke-width: 0.15em; paint-order: stroke; stroke-linejoin: round; cursor: default; } .vert-line:hover rect { fill: #911EB4; fill-opacity: 40%; stroke: #FFFFFF60; color: red; } .vert-line:hover text { stroke: white; fill: #212427; } .horizontal-line:hover text {stroke: white; fill: #212427; } .ref-line:hover rect { stroke: #FFFFFF60; } .ref-line:hover line { stroke: #FF0000; } .ref-line:hover text { stroke: white; fill: #212427; } .y-axis-line:hover rect { fill: #EDEDED; fill-opacity: 60%; stroke: #FFFFFF60; color: red; } .y-axis-line:hover text { stroke: white; stroke-width: 0.20em; fill: #1A1C1F; } </style>
<line x1="22.5" y1="115.0" x2="227.5" y2="115.0" stroke="#BFBFBF" stroke-width="4"></line><rect x="30.0" y="76.9047619047619" width="40" height="38.0952380952381" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="105.0" y="15.0" width="40" height="100.0" stroke="#3290CC" stroke-width="4" fill="green"></rect><rect x="180.0" y="86.42857142857143" width="40" height="28.57142857142857" stroke="#3290CC" stroke-width="4" fill="green"></rect><g class="y-axis-line"><rect x="0" y="0" width="65" height="130" stroke="transparent" stroke-width="0" fill="transparent"></rect><text x="0" y="19.0" fill="transparent" stroke="transparent" font-size="25">21</text><text x="0" y="126.0" fill="transparent" stroke="transparent" font-size="25">0</text></g><g class="vert-line"><rect x="40.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="60.0" y="20" fill="transparent" stroke="transparent" font-size="30px">8</text></g><g class="vert-line"><rect x="115.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="135.0" y="20" fill="transparent" stroke="transparent" font-size="30px">21</text></g><g class="vert-line"><rect x="190.0" y="0" width="20" height="130" stroke="transparent" stroke-width="12" fill="transparent"></rect><text x="210.0" y="20" fill="transparent" stroke="transparent" font-size="30px">6</text></g>
</svg>
</div></td>
</tr>
</tbody><tfoot class="gt_sourcenotes">
<tr>
<td colspan="7" class="gt_sourcenote">Data: allrecipies.com</td>
</tr>
</tfoot>
&#10;</table>

</div>
