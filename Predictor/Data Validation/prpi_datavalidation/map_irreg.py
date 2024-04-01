import pandas as pd
import plotly.express as px

data = pd.read_csv('dataset_lor_v2_h3.csv')
fig = px.scatter_mapbox(data, 
                        lat="x", 
                        lon="y", 
                        zoom=8,
                        color='alert_stat', 
                        height=800,
                        width=800)

fig.update_layout(mapbox_style="open-street-map")
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
fig.show()