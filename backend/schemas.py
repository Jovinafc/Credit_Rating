from pydantic import BaseModel

class MortgageModel(BaseModel):
    credit_score: int
    loan_amount: float
    property_value: float
    annual_income: float
    debt_amount: float
    loan_type: str
    property_type: str
    