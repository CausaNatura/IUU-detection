from fastapi import FastAPI
import requests
import json
import pandas as pd
import geopandas as gpd
import pickle
from shapely.geometry import Point

# Parameters
def get_weather_forecast(location):
    key = '3c7c8dff6b4b48d9a21142127233103'
    url = 'http://api.weatherapi.com/v1/forecast.json'
    lang = 'esp'
    #q = 'Loreto Baja California Sur'
    q = location
    days = 10

    params = {
                'key': key,
                'q': q,
                'lang': lang,
                'days': days
            }
    
    r = requests.get(url, params=params)
    data = json.loads(r.text)
    wd = pd.DataFrame()
    
    for day in data['forecast']['forecastday']:
        wd =pd.concat([wd, pd.DataFrame([[day['date'],'','',day['day']['maxwind_mph'],day['day']['avghumidity'],day['day']['avgtemp_c'],day['astro']['moon_phase']]])],ignore_index=True)

    wd.columns=['date','month','dayweek','wind_kph','humidity','temp_c','moon_phase']
    wd['date'] = pd.to_datetime(wd['date'])
    wd['month'] = wd['date'].dt.month.astype(float)
    wd['dayweek'] = wd['date'].dt.day_of_week.astype(float)+1
    wd['date'] = wd['date'].dt.strftime('%d-%m-%Y')
    moon_phase_dict = {'Waxing Gibbous': 0, 'Full Moon': 1, 'Waning Gibbous': 2, 'Waning Crescent': 3, 'New Moon': 4, 'Last Quarter': 5, 'First Quarter': 6, 'Waxing Crescent': 7}
    wd = wd.replace({"moon_phase": moon_phase_dict})

    return wd

def get_dataset(wd,location=''):
    zones = gpd.read_file('h3_loreto.geojson')
    dataset = zones[['h3_id','geometry','PR_MAX','PR_MIN']]
    dataset['DIST_MIN'] = zones[['DP_LORETO_MEAN','DP_NOPOLO_MEAN','DP_PUERTOESCONDIDO_MEAN','DP_ENSENADABLANCA_MEAN']].min(axis=1)
    dataset['DIST_MAX'] = zones[['DP_LORETO_MEAN','DP_NOPOLO_MEAN','DP_PUERTOESCONDIDO_MEAN','DP_ENSENADABLANCA_MEAN']].max(axis=1)
    
    for row in wd.iterrows():
        dataset[['date','month','dayweek','wind_kph','humidity','temp_c','moon_phase']] = row[1]
        if row[0] == 0:
            df = dataset.copy()
        else:
            df = pd.concat([df,dataset],ignore_index=True)

    dataset = df[['h3_id','date','month','dayweek','wind_kph','humidity','temp_c','moon_phase','PR_MAX','PR_MIN','DIST_MIN','DIST_MAX','geometry']]

    return dataset
    
def make_predict(df):
    model = pickle.load(open('brf.pk1' , 'rb'))
    y_pred = model.predict_proba(df.drop(columns=['h3_id','date','geometry']))
    ### ADJUST PROB
    ###
    res = pd.concat([df['h3_id'], df['date'],pd.DataFrame(y_pred).iloc[:,1],df['geometry']], axis=1)
    #res = pd.concat([df['h3_id'], df['date'],pd.DataFrame(([[0.1 for _ in range(364)]+[0.5 for _ in range(364)]+[0.9 for _ in range(364)]][0])),df['geometry']], axis=1)
    res = gpd.GeoDataFrame(res)
    res.columns=['h3_id','date','prob','geometry']
    return json.loads(res.to_json())
    
################## API ##################

app = FastAPI()

@app.get("/")
def home():
    wd = get_weather_forecast("'Loreto Baja California Sur'")
    df = get_dataset(wd)
    return make_predict(df)