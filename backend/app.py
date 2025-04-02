import logging
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from models import Base, engine, AsyncSessionLocal
from schemas import MortgageModel
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
import credit_rating
import os

load_dotenv()

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
LOG_FILE = os.getenv("LOG_FILE", "credit_rating.log")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler(LOG_FILE)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database initialized.")    
        

async def get_db() -> AsyncSession:
   async with AsyncSessionLocal() as session:
       yield session

@app.on_event("startup")
async def on_startup():
    await init_db()
    logger.info("FastAPI started.")
    
@app.get("/")
def read_root():
    logger.info("Root endpoint accessed.")
    return { "message": "Hello from FastAPI! "}

@app.post("/mortgages/")
async def create_mortgage(mortgage: MortgageModel, db: AsyncSession = Depends(get_db)):
    logger.info("Creating a new mortgage.")
    return await credit_rating.create_mortgage(db, mortgage.dict())

@app.get('/mortgages/')
async def get_mortgages(db: AsyncSession = Depends(get_db)):
    logger.info("Retrieving mortgages.")
    return await credit_rating.get_mortgages(db)

@app.get('/mortgages/{mortgage_id}')
async def get_mortgage(mortgage_id: int, db: AsyncSession = Depends(get_db)):
    logger.info(f"Retrieving mortgage with ID: {mortgage_id}.")
    response = await credit_rating.get_mortgage(db, mortgage_id)
    if response["status"] == "error":
        logger.error(f"Mortgage with ID {mortgage_id} not found.")
        raise HTTPException(status_code=404, detail=response["message"])
    return response

@app.put('/mortgages/{mortgage_id}')
async def update_mortgage(mortgage_id: int, mortgage: MortgageModel, db: AsyncSession =Depends(get_db)):
    logger.info(f"Updating mortgage with ID: {mortgage_id}.")
    response  = await credit_rating.update_mortgage(db, mortgage_id, mortgage.dict())
    if response["status"] == "error":
        logger.error(f"Mortgage with ID {mortgage_id} not found.")
        raise HTTPException(status_code=404, detail=response["message"])
    return response 

@app.delete("/mortgages/{mortgage_id}")
async def delete_mortgage(mortgage_id: int, db: AsyncSession = Depends(get_db)):
    logger.info(f"Deleting mortgage with ID: {mortgage_id}.")
    response  = await credit_rating.delete_mortgage(db, mortgage_id)
    if response["status"] == "error":
        logger.error(f"Mortgage with ID {mortgage_id} not found.")
        raise HTTPException(status_code=404, detail=response["message"])
    return response 