from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict_corridor

app = FastAPI()

# Configuración de CORS
'''app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes especificar dominios en lugar de "*"
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los headers
)'''

@app.get("/")
def read_root():
    return {"message": "API Predictor Riesgo de Pesca Ilegal. Informes: https://datacenter.causanatura.org/"}

app.include_router(predict_corridor.router, prefix='/api', tags=['predictions'])