import pandas as pd

df_old = pd.read_csv('/Users/pscollins/CAPP_30239/CAPP30239_FA22/final_project/historical-daily-weather-records.csv')
# df_old = df_old[ df_old.highest_30_min_rainfall  != "na"]
df_old[['year','month','date']] = df_old['date'].str.split('-',expand=True)
df_old = df_old[ df_old.year in ["2014","2015","2016","2017","2018"] ]
df_new = pd.DataFrame(columns=["year","count","highest_30_min_rainfall","highest_60_min_rainfall","highest_120_min_rainfall"]) # ,"temp_extremes_min"])
df_new['year'] = range(2014, 2018)
df_new = df_new.fillna(0.)

print(df_old)

for index, row in df_old.iterrows():
    df_new["count"][int(row["year"]) - 2014] += 1
    
    for item in ["highest_30_min_rainfall","highest_60_min_rainfall","highest_120_min_rainfall"]:
        max_rain = float(row[item])
        if max_rain > df_new[item][int(row["year"]) - 2014]:
            df_new[item][int(row["year"]) - 2014] = max_rain

print(df_new)

df_new.to_csv('sg_weather_daily.csv', index = False)