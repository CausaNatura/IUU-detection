import requests, zipfile, io

token = '' #Provided by Protected Seas (M2 developer)
radarID = '23' #ID Loreto1
loc_pref = ''
if radarID == '23':
    loc_pref = 'LOR' 
year = '2023'
month = '01'
headers = {
    'Authorization' : token,
}

for y in range(2): # Loop for 2 years (2023, 2024)
    for m in range(12): # Loop for 12 months
        url = "https://m2mobile.protectedseas.net/api/map/{}/{}/{}/download-s3-zip".format(radarID,int(year)+y,int(month)+m)
        try:
            r = requests.get(url, headers=headers)
            z = zipfile.ZipFile(io.BytesIO(r.content))
            path = "{}_{}/{}_{}_{}".format(loc_pref,int(year)+y,radarID,int(year)+y,int(month)+m)
            z.extractall(path)
        except Exception as error:
            print(error)