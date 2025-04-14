import pytest
from services.rating_service import average_credit_score, calculate_risk_score, calculate_rating

# Mock Mortgage Class
class Mortgage:
    def __init__(self, credit_score, loan_amount, property_value, annual_income, debt_amount, loan_type, property_type):
        self.credit_score = credit_score
        self.loan_amount = loan_amount
        self.property_value = property_value
        self.annual_income = annual_income
        self.debt_amount = debt_amount
        self.loan_type = loan_type
        self.property_type = property_type

@pytest.fixture
def sample_mortgages():
    return [
        Mortgage(750, 200000, 250000, 80000, 30000, 'fixed', 'single_family'),
        Mortgage(680, 150000, 200000, 60000, 20000, 'adjustable', 'condo'),
        Mortgage(620, 180000, 220000, 50000, 40000, 'adjustable', 'single_family'),
    ]

def test_average_credit_score(sample_mortgages):
    result = average_credit_score(sample_mortgages)
    assert result == 683.33  # Adjust as needed based on the logic

def test_calculate_risk_score():
    mortgage = Mortgage(750, 200000, 250000, 80000, 30000, 'fixed', 'single_family')
    result = calculate_risk_score(mortgage)
    assert result == -1  # Expected based on the risk calculation logic

def test_calculate_rating_AAA():
    mortgages = [
        Mortgage(750, 100000, 200000, 90000, 10000, 'fixed', 'single_family'),
        Mortgage(720, 120000, 250000, 85000, 15000, 'fixed', 'condo'),
    ]
    result, score = calculate_rating(mortgages)
    assert result == 'AAA'

def test_calculate_rating_BBB():
    mortgages = [
        Mortgage(680, 150000, 200000, 60000, 30000, 'adjustable', 'condo'),
        Mortgage(700, 180000, 220000, 70000, 25000, 'fixed', 'single_family'),
    ]
    result, score = calculate_rating(mortgages)
    assert result == 'BBB'

def test_calculate_rating_C():
    mortgages = [
        Mortgage(600, 250000, 300000, 40000, 100000, 'adjustable', 'single_family'),
        Mortgage(620, 220000, 280000, 35000, 90000, 'adjustable', 'condo'),
    ]
    result, score = calculate_rating(mortgages)
    assert result == 'C'
