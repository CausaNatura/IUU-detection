from fastapi import APIRouter, HTTPException
from app.schemas.prediction_corridor import PredictionRequest, PredictionResponse
from app.models.model_corridor import predict
from fastapi.encoders import jsonable_encoder
import pandas as pd
from typing import List

router = APIRouter()

@router.get('/predict', response_model=List[PredictionResponse])
async def get_prediction(location:str):
    request = PredictionRequest(location=location)
    try:
        prediction = pd.DataFrame(predict(request.location))
        prediction = prediction.to_dict(orient='records')
        prediction = jsonable_encoder(prediction)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))