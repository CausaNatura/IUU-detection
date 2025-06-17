from pydantic import BaseModel, validator
from typing import ClassVar
import difflib

class PredictionRequest(BaseModel):
    location: str
    locations: ClassVar[list[str]]= ['Loreto Baja California Sur', 'Cabo Pulmo Baja California Sur','Corredor San Basilio-BDLP']
    
    @validator("location")
    def match_location(cls, v, values, **kwargs):
        locations = values.get('locations', cls.locations)
        match = difflib.get_close_matches(v, locations, n=1, cutoff=0.1)
        return match[0] if match else v

class PredictionResponse(BaseModel):
    h3_id: str
    date: str
    prob: float