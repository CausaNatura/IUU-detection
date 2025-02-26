from fastapi import FastAPI
from app.routes import predict_corridor

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API Predictor Riesgo de Pesca Ilegal. Informes: https://datacenter.causanatura.org/"}

app.include_router(predict_corridor.router, prefix='/api', tags=['predictions'])