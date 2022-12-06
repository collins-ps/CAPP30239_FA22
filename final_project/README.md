# CAPP30239 Final Project: Climate Change in Singapore between 1982-2022

This directory was created as a final project for CAPP30239: Data Visualizaton for Policy Analysis. I decided to do my project on climate change because I believe it is the biggest existential threat of my generation, and understanding how the climate has changed is the first step to taking measures to prepare for the future. Since the effects of climate change vary geographically, I wanted to focus on my home country of Singapore specifically. I chose to focus on temperature and rainfall, which are the two most important aspects of Singapore's climate.

The final webpage can be viewed [here](https://collins-ps.github.io/CAPP30239_FA22/final_project/final_project_collins), using this [html file](final_project_collins.html).

## Data sources
The visualizations in this directory use data from Changi Climate Station taken on a monthly basis between 1982 and 2022. The dataset is posted on the Govenrment of Singapore's [open data portal](https://data.gov.sg/). The [original dataset](sg_weather.csv) containing monthly data was [aggregated](convert_to_years.py) to produce a dataset by [year](sg_weather_year.csv). One limitation is that this project only uses data from 1 of 28 climate stations in Singapore. While it would have been ideal to have had data from all weather stations, this was not avaialable, and the Singapore Government says that data from one station is representative of all stations nation-wide, thus the analysis here is generally relevant for the country as a whole.

## Reference code
A lot of reference code to produce the charts was provided by [Professor Tiffany France](https://github.com/tiffanyfrance/CAPP30239_FA22) and [Observable](https://observablehq.com/). 
