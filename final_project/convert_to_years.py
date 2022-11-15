import pandas as pd

df_old = pd.read_csv('/Users/pscollins/CAPP_30239/CAPP30239_FA22/final_project/sg_weather.csv')
df_old[['year','month']] = df_old['month'].str.split('-',expand=True)
df_new = pd.DataFrame(columns=["year","count","total_rainfall","maximum_rainfall_in_a_day","no_of_rainy_days","sum_temp","mean_temp","max_temperature"]) # ,"temp_extremes_min"])
df_new['year'] = range(1982, 2023)
df_new = df_new.fillna(0.)

for index, row in df_old.iterrows():
    df_new["count"][int(row["year"]) - 1982] += 1

    df_new["total_rainfall"][int(row["year"]) - 1982] += float(row["total_rainfall"])
    
    max_rain = float(row["maximum_rainfall_in_a_day"])
    if max_rain > df_new["maximum_rainfall_in_a_day"][int(row["year"]) - 1982]:
        df_new["maximum_rainfall_in_a_day"][int(row["year"]) - 1982] = max_rain

    df_new["no_of_rainy_days"][int(row["year"]) - 1982] += int(row["no_of_rainy_days"])

    df_new["sum_temp"][int(row["year"]) - 1982] += float(row["mean_temp"])

    max_temperature = float(row["max_temperature"])
    if max_temperature > df_new["max_temperature"][int(row["year"]) - 1982]:
        df_new["max_temperature"][int(row["year"]) - 1982] = max_temperature

for index, row in df_new.iterrows():
    df_new["mean_temp"][index] = df_new["sum_temp"][index] / df_new["count"][index]

print(df_new)

df_new.to_csv('/Users/pscollins/CAPP_30239/CAPP30239_FA22/final_project/sg_weather_year.csv', index = False)