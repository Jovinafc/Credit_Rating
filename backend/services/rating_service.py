def average_credit_score(mortgages):
    total = 0
    for x in mortgages:
        total += x.credit_score
        
    return total / len(mortgages)

def calculate_risk_score(mortgage):
    risk_score = 0
    ltv = (mortgage.loan_amount / mortgage.property_value) * 100
    
    if ltv > 90:
        risk_score += 2
    elif ltv > 80:
        risk_score += 1
        
    dti = (mortgage.debt_amount / mortgage.annual_income) * 100
    
    if dti > 50:
        risk_score += 2
    elif dti > 40:
        risk_score += 1
        
    if mortgage.credit_score < 650:
        risk_score += 1
    elif mortgage.credit_score >= 700:
        risk_score -= 1
        
    if mortgage.loan_type == 'adjustable':
        risk_score += 1
    elif mortgage.loan_type == 'fixed':
        risk_score -= 1
        
    if mortgage.property_type == 'condo':
        risk_score += 1
        
    return risk_score
    

def calculate_rating(mortgages):
    total_risk_score = 0
    for x in mortgages:
        total_risk_score += calculate_risk_score(x)
        
    average_credit = average_credit_score(mortgages)
    
    if average_credit >= 700:
        total_risk_score -= 1
    elif average_credit < 650:
        total_risk_score += 1
    
    final_rating = ''
    if total_risk_score <= 2:
        final_rating = 'AAA'
    elif total_risk_score <= 5:
        final_rating = 'BBB'
    else:
        final_rating = 'C'
        
    return final_rating, total_risk_score
    