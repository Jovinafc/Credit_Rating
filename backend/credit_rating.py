import logging
from models import Mortgage
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from utils import response_structure
from services.rating_service import calculate_rating

logger = logging.getLogger(__name__)

async def create_mortgage(db: AsyncSession, mortgage_data: dict):
    mortgage = Mortgage(**mortgage_data)
    db.add(mortgage)
    await db.commit()
    await db.refresh(mortgage)
    logger.info("Mortgage created successfully.")
    return response_structure("success", "Mortgage created successfully." ,mortgage)

async def get_mortgages(db: AsyncSession):
    # return db.query(Mortgage).limit(limit).all()
    result = await db.execute(select(Mortgage))
    mortgages = result.scalars().all()
    logger.info("Calculating rating of mortgages.")
    total_rating, total_score = calculate_rating(mortgages)
    result = {
        "mortgages":mortgages,
        "total_rating":total_rating,
        "total_score":total_score
    }
    logger.info("Mortgages retrieved successfully.")
    return response_structure("success", "Mortgages retrieved successfully", result)
    
async def get_mortgage(db: AsyncSession, mortgage_id: int):
    # return db.query(Mortgage).filter(Mortgage.id == mortgage_id).first()
    # return db.get(Mortgage, mortgage_id)
    result = await db.execute(select(Mortgage).filter(Mortgage.id == mortgage_id))
    mortgage = result.scalars().first()
    if mortgage:
        logger.info("Mortgage found with ID %d", mortgage_id)
        return response_structure("success", "Mortgage found", mortgage)
    logger.warning("Mortgage with ID %d not found", mortgage_id)
    return response_structure("error", "Mortgage not found")

async def update_mortgage(db: AsyncSession, mortgage_id: int, mortgage_data: dict):
    result = await db.execute(select(Mortgage).filter(Mortgage.id == mortgage_id))
    mortgage = result.scalars().first()

    if mortgage:
        logger.info("Mortgage found with ID %d to update", mortgage_id)
        for key, value in mortgage_data.items():
            setattr(mortgage, key, value)
        await db.commit()
        await db.refresh(mortgage)
        logger.info("Mortgage updated successfully.")
        return response_structure("success", "Mortgage updated successfully", mortgage)
    logger.warning("Mortgage with ID %d not found", mortgage_id)
    return response_structure("error", "Mortgage not found")

async def delete_mortgage(db: AsyncSession, mortgage_id: int):
    # mortgage = db.get(Mortgage, mortgage_id)
    
    # if mortgage:
    #     db.delete(mortgage)
    #     db.commit()
    #     return mortgage
    
    # return None
    
    result = await db.execute(select(Mortgage).filter(Mortgage.id == mortgage_id))
    mortgage = result.scalars().first()

    if mortgage:
        logger.info("Mortgage found with ID %d to delete.", mortgage_id)
        await db.delete(mortgage)
        await db.commit()
        logger.info("Mortgage deleted successfully.")
        return response_structure("success", "Mortgage deleted successfully", mortgage)
    logger.warning("Mortgage with ID %d not found", mortgage_id)
    return response_structure("error", "Mortgage not found")

    