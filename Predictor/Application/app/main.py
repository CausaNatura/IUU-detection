from fastapi import FastAPI
from app.routes import predict_corridor

app = FastAPI()

app.include_router(predict_corridor.router, prefix='/api', tags=['predictions'])