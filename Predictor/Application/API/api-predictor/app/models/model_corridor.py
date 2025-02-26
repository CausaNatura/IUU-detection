""" 
Esta versión del modelo está entrenada con datos de PN Bahía de Loreto y Cabo Pulmo como una sola zona.
En este mismo modelo se incluirán datos de nuevas zonas para crear el corredor.
Entrenamiento actualizado: Diciembre 2023 
"""
import requests
import json
import pandas as pd
#import geopandas as gpd
import json
import pickle
import os
cdir = os.path.dirname(os.path.abspath(__file__))
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.environ.get("API_KEY")

def get_weather_forecast(location):
    key = API_KEY
    url = 'http://api.weatherapi.com/v1/forecast.json'
    lang = 'esp'
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

def prepare_prediction_dataset(wd, location):
    zones=''
    ''' if location == 'Loreto Baja California Sur':
        zones = gpd.read_file(os.path.join(cdir, 'H3', 'h3_loreto.geojson'))
    elif location == 'Cabo Pulmo Baja California Sur':
        zones = gpd.read_file(os.path.join(cdir, 'H3', 'h3_cabo_pulmo.geojson'))
    dataset = zones[['h3_id','geometry','PR_MAX','PR_MIN']]'''
    if location == 'Loreto Baja California Sur':
        #zones = gpd.read_file(os.path.join(cdir, 'H3', 'h3_loreto.geojson'))
        with open('h3_loreto.geojson') as f: zones = json.load(f)
        zones = pd.json_normalize(zones['features'])
        zones = zones.drop(columns='geometry')
    elif location == 'Cabo Pulmo Baja California Sur':
        #zones = gpd.read_file(os.path.join(cdir, 'H3', 'h3_cabo_pulmo.geojson'))
        with open('h3_cabo_pulmo.geojson') as f: zones = json.load(f)
        zones = pd.json_normalize(zones['features'])
        zones = zones.drop(columns='geometry')
    dataset = zones[['h3_id','PR_MAX','PR_MIN']]
    deep_cols = [col for col in zones.columns if "DP_" in col]
    dataset['DIST_MIN'] = zones[deep_cols].min(axis=1)
    dataset['DIST_MAX'] = zones[deep_cols].max(axis=1)
    for row in wd.iterrows():
        dataset[['date','month','dayweek','wind_kph','humidity','temp_c','moon_phase']] = row[1]
        if row[0] == 0:
            df = dataset.copy()
        else:
            df = pd.concat([df,dataset],ignore_index=True)
    dataset = df[['h3_id','date','month','dayweek','wind_kph','humidity','temp_c','moon_phase','PR_MAX','PR_MIN','DIST_MIN','DIST_MAX']]
    return dataset

def predict(location='Loreto Baja California Sur'):
    wd = get_weather_forecast(location)
    dataset = prepare_prediction_dataset(wd, location)
    model = pickle.load(open((os.path.join(cdir, 'brf_corridor.pk1')), 'rb'))
    prediction = model.predict_proba(dataset.drop(columns=['h3_id','date']))
    adjuster = pickle.load(open((os.path.join(cdir, 'adjuster_corridor.pk1')) , 'rb')) # ADJUST PROBABILITIES
    prediction = adjuster.transform(prediction[:,1])
    output = pd.concat([dataset['h3_id'], dataset['date'],pd.DataFrame(prediction)], axis=1)
    output.columns=['h3_id','date','prob']
    return json.loads(output.to_json(orient='records'))