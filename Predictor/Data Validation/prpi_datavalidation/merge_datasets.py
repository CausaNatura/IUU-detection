import pandas as pd

data_cp = pd.read_csv('dataset_cp_v2_h3.csv')
data_lor = pd.read_csv('dataset_lor_v2_h3.csv')

df = pd.concat([data_cp,data_lor])

df.fillna(200000, inplace=True) #Remplazar distancias no disponibles por un valor muy elevado

df.to_csv('dataset_lor_cp_v2_h3.csv', index=False)