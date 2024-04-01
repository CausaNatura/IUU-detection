#******************** AQUÍ SE CREA EL DATASET DE IRREGULARIDADES ********************
#     SE IMOPRTAN LAS LIBRERIAS NECESARIAS
import pandas as pd
import geopandas as gpd
import os
import glob

# FUNCTIONS
def read_M2_data(zone:str):
    #       SE RECORREN LAS CARPETAS CON DE LOS DIFERENTES AÑOS EN LAS CUALES VIENEN LOS ARCHIVOS POR MES DE LOS REGISTROS DEL M2
    path = os.getcwd()
    years=glob.glob(zone)
    months=[]
    for year in years:
        months.extend(glob.glob(os.path.join(path,year,"*")))
    files = []
    for month in months:
        files.extend(glob.glob(os.path.join(month,"*radar.shp")))
    #       SE HACE UN CICLO EN EL CUAL SE LEEN TODOS LOS ARCHIVOS .SHP EXTRAIDOS DEL M2 Y SE VAN UNIENDO EN UN ÚNICO DATAFRAME
    df = pd.DataFrame()
    for f in files:
        try:
            new_data = gpd.read_file(f)[['id','alert_stat','confidence','sdate','stime','ldate','ltime','geometry']]
        except:
            new_data = gpd.read_file(f)[['id','alert_stat','sdate','stime','ldate','ltime','geometry']]
        df = pd.concat([df,new_data], ignore_index=True)
    #       SE ELIMINAN DUPLICADOS EN CASO DE EXISTIR
    df = df.drop_duplicates()
    #       SE FILTRAN LOS REGISTROS DONDE LA CONFIANZA SEA MAYOR AL 80%
    df = df[(df['confidence']>0.8) & (df['confidence']<1)]
    #       SE OBTIENE UN CENTROIDE DEL RECORRIDO DE CADA REGISTRO PARA ASIGNAR UNA COORDENADA ÚNICA AL REGISTRO
    df['centroid'] = df['geometry'].centroid
    df = pd.DataFrame(df.drop(columns='geometry'))
    df = df[df['centroid'] != None]
    #       SE OBTIENE LA COORDENA DEL CENTROIDE Y SE AGREGA AL DATFRAME     
    df['coords'] = ''
    for row in df.iterrows():
        df.loc[row[0],'coords'] = df.loc[row[0],'centroid'].coords.xy
    df['y'] = df['coords'].str[0].astype(float)
    df['x'] = df['coords'].str[1].astype(float)
    #       SE UNEN FECHAS Y HORAS DE INICIO Y FIN EN UNA SOLA VARIABLE DATETIME
    df['sdt'] = pd.to_datetime(df['sdate']+' '+df['stime'])
    df['ldt'] = pd.to_datetime(df['ldate']+' '+df['ltime'])
    #       SE ELIMINAN VARIABLES SOBRANTES
    df.drop(columns=['sdate','stime','ldate','ltime', 'confidence','coords','centroid'], inplace=True)
    #       RETURN DF
    return df

def add_weather_data(df,weather_data,grid_zones):
    #       EN ESTA PARTE, PARA CADA REGISTRO, SE CALCULAN LAS VARIABLES DEPENDIENTES DE LA FECHA Y HORA DE LA IRREGULARIDAD Y SE LLENAN LOS DATOS DEL CLIMA 
    df[['hour','month','dayweek','workday','period','wind_kph','humidity','temp_c','feelslike_c','visibility_km','chance_rain','uv','moon_phase']] = ''
    for row in df.iterrows():
        avg_dt = pd.to_datetime((row[1]['sdt'].value+row[1]['ldt'].value)/2)
        df.loc[row[0],'hour'] = avg_dt.hour
        df.loc[row[0],'month'] = avg_dt.month
        df.loc[row[0],'dayweek'] = avg_dt.day_of_week+1
        if (avg_dt.day_of_week+1 == 6) or (avg_dt.day_of_week+1 == 7):
            df.loc[row[0],'workday'] = 0
        else:
            df.loc[row[0],'workday'] = 1
        w = weather_data[(weather_data['Datetime'].dt.date==avg_dt.date()) & (weather_data['Datetime'].dt.hour==avg_dt.hour)]
        df.loc[row[0],'period'] = w['Is_Day'].iloc[0]
        df.loc[row[0],'wind_kph'] = w['Wind_kph'].iloc[0]
        df.loc[row[0],'humidity'] = w['Humidity'].iloc[0]
        df.loc[row[0],'temp_c'] = w['Temp_C'].iloc[0]
        df.loc[row[0],'feelslike_c'] = w['Feelslike_c'].iloc[0]
        df.loc[row[0],'visibility_km'] = w['Visbility_km'].iloc[0]
        df.loc[row[0],'chance_rain'] = w['Chance_rain'].iloc[0]
        df.loc[row[0],'uv'] = w['UV'].iloc[0]
        df.loc[row[0],'moon_phase'] = w['Moon_Phase'].iloc[0]
    moon_phase_dict = {'Waxing Gibbous': 0, 'Full Moon': 1, 'Waning Gibbous': 2, 'Waning Crescent': 3, 'New Moon': 4, 'Last Quarter': 5, 'First Quarter': 6, 'Waxing Crescent': 7}
    df = df.replace({"moon_phase": moon_phase_dict})
    #       SE ELIMINAN VARIABLES SOBRANTES
    df = df.drop(columns=['sdt','ldt'])
    #       SE ASIGNAN REGISTROS A LA ZONA
    df['ZONA']=''
    for row in df.iterrows():
        coord = gpd.points_from_xy([row[1]['y']], [row[1]['x']])
        x = grid_zones['geometry'].contains(coord[0])
        if True in x.values:
            idx = x.index[x==True].tolist()[0]
            df.loc[row[0],'ZONA'] = grid_zones.iloc[idx]['h3_id']
            for col in grid_zones.columns:
                if col.startswith('DP_'):
                    df.loc[row[0],col] = grid_zones.iloc[idx][col]
                elif col.startswith('PR_'):
                    df.loc[row[0],col] = grid_zones.iloc[idx][col]
        else: 
            pass
    df = df[df['ZONA']!='']
    return df

# LORETO
wd = pd.read_csv('wa_loreto.csv', parse_dates=['Datetime'])
zonas = gpd.read_file('h3_loreto_2211_1732.geojson')
df =  read_M2_data('LOR*')
df = add_weather_data(df,wd,zonas)
df.to_csv('dataset_lor_v2_h3.csv', index=False)

# CABO PULMO
wd = pd.read_csv('wa_cabo_pulmo.csv', parse_dates=['Datetime'])
zonas = gpd.read_file('h3_cabopulmo_2211_1730.geojson')
df =  read_M2_data('CP*')
df = add_weather_data(df,wd,zonas)
df.to_csv('dataset_cp_v2_h3.csv', index=False)