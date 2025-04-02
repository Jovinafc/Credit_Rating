import React, { useEffect, useState } from 'react'
import ActionButton from './ActionButton';
import { addData, deleteData, updateData } from '../services';
import { SuccessToast } from '../Toasts/SuccessToast'
import { ErrorToast } from '../Toasts/ErrorToast'

const CreditForm = ( { getMortgages, selectedMortgage, setSelectedMortgage }) => {
    const [creditScore, setCreditScore] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [propertyValue, setPropertyValue] = useState(0);
    const [annualIncome, setAnnualIncome] = useState(0);
    const [debtAmount, setDebtAmount] = useState(0);
    const [propertyType, setPropertyType] = useState('');
    const [loanType, setLoanType] = useState('');
    const [editForm, setEditForm] = useState(false);

    const [creditScoreError, setCreditScoreError] = useState('');
    const [loanAmountError, setLoanAmountError] = useState('');
    const [propertyValueError, setPropertyValueError] = useState('');
    const [annualIncomeError, setAnnualIncomeError] = useState('');
    const [debtAmountError, setDebtAmountError] = useState('');
    const [propertyTypeError, setPropertyTypeError] = useState('');
    const [loanTypeError, setLoanTypeError] = useState('');

    useEffect(() => {
        if(selectedMortgage !== null){
            console.log(selectedMortgage);
            setCreditScore(selectedMortgage?.credit_score)
            setLoanAmount(selectedMortgage?.loan_amount)
            setPropertyValue(selectedMortgage?.property_value)
            setAnnualIncome(selectedMortgage?.annual_income)
            setDebtAmount(selectedMortgage?.debt_amount)
            setPropertyType(selectedMortgage?.property_type)
            setLoanType(selectedMortgage?.loan_type)
            setEditForm(true);
        }
    }, [selectedMortgage])

    const resetForm = () => {
        setCreditScore(0);
        setCreditScoreError("")
        setLoanAmount(0);
        setLoanAmountError("")
        setPropertyValue(0);
        setPropertyValueError("")
        setAnnualIncome(0);
        setAnnualIncomeError("")
        setDebtAmount(0);
        setDebtAmountError("")
        setPropertyType('')
        setPropertyTypeError("");
        setLoanType('')
        setLoanTypeError("");
        setEditForm(false)
        setSelectedMortgage(null);
    }

    const validateFields = () => {
        let isValid = true;
        if (isNaN(creditScore) || creditScore < 300 || creditScore > 850) {
            setCreditScoreError('Credit score must be between 300 and 850.');
            isValid = false;
        }

        if (isNaN(loanAmount) || loanAmount <= 0) {
            setLoanAmountError('Loan amount must be a positive number.');
            isValid = false;
        }

        if (isNaN(propertyValue) || propertyValue <= 0) {
            setPropertyValueError("Property value must be a positive number.");
            isValid = false;
        }

        if (isNaN(annualIncome) || annualIncome <= 0) {
            setAnnualIncomeError('Annual income must be a positive number.');
            isValid = false;
        }

        if (isNaN(debtAmount) || debtAmount <= 0) {
            setDebtAmountError('Debt amount cannot be negative.');
            isValid = false;
        }

        if (!['fixed', 'adjustable'].includes(loanType)) {
            setLoanTypeError('Select a valid loan type (fixed or adjustable).');
            isValid = false;
        }

        // Property Type Validation
        if (!['single_family', 'condo'].includes(propertyType)) {
            setPropertyTypeError('Select a valid property type (single_family or condo).');
            isValid = false;
        }

        return isValid;
    }

    const onSumitForm = () => {
        if (validateFields()) {
            let obj = {
                "credit_score": creditScore,
                "loan_amount": loanAmount,
                "property_value": propertyValue,
                "annual_income": annualIncome,
                "debt_amount": debtAmount,
                "loan_type": loanType,
                "property_type": propertyType
            }

            if(selectedMortgage){
                // Update Mortgage
                updateData(selectedMortgage?.id, obj)
                .then((res) => {
                    if (res.status === "success") {
                        SuccessToast(res.message);
                        getMortgages();
                        resetForm();
                    } else {
                        ErrorToast("Failed to update.")
                    }
                })
                .catch(err => {
                    ErrorToast("Failed to update.")
                })
            }else{
                // Add Mortgage
                addData(obj)
                .then((res) => {
                    if (res.status === "success") {
                        SuccessToast(res.message);
                        getMortgages();
                        resetForm();
                    } else {
                        ErrorToast("Failed to add.")
                    }
                })
                .catch(err => {
                    ErrorToast("Failed to add.")
                })
            }
        }
    }

    const deleteMortgage = () => {
        if(selectedMortgage){
            deleteData(selectedMortgage?.id)
                .then((res) => {
                    console.log("Response", res);
                    if (res.status === "success") {
                        SuccessToast(res.message);
                        getMortgages();
                        resetForm();
                    } else {
                        ErrorToast("Failed to delete.")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    ErrorToast("Failed to delete.")
                })
        }
    }

    return (
        <div className='credit-form'>
            <h2>Residential Mortgage Securities (RMBS) Credit Rating</h2>
            <form>
                <div className='credit-form-div'>
                    <label htmlFor='credit_score'>Credit Score (Between 300 and 850)</label>
                    <input value={creditScore} onChange={(e) => {
                        setCreditScore(e.target.value)
                        setCreditScoreError("")
                    }} id="credit_score" type='number' disabled={editForm} />
                    <span className='error-message'>{creditScoreError}</span>
                </div>
                <div className='credit-form-div'>
                    <label htmlFor='loan_amount'>Loan Amount</label>
                    <input value={loanAmount} onChange={(e) => {
                        setLoanAmount(e.target.value)
                        setLoanAmountError("")
                    }} id="loan_amount" type='number' disabled={editForm} />
                    <span className='error-message'>{loanAmountError}</span>
                </div>
                <div className='credit-form-div'>
                    <label htmlFor='property_value'>Property Value</label>
                    <input value={propertyValue} onChange={(e) => {
                        setPropertyValue(e.target.value)
                        setPropertyValueError("")
                    }
                    } id="property_value" type='number' disabled={editForm} />
                    <span className='error-message'>{propertyValueError}</span>
                </div>
                <div className='credit-form-div'>
                    <label htmlFor='annual_income'>Annual Income</label>
                    <input value={annualIncome} onChange={(e) => {
                        setAnnualIncome(e.target.value)
                        setAnnualIncomeError("")
                    }
                    } id="annual_income" type='number' disabled={editForm} />
                    <span className='error-message'>{annualIncomeError}</span>
                </div>
                <div className='credit-form-div'>
                    <label htmlFor='debt_amount'>Debt Amount</label>
                    <input value={debtAmount} onChange={(e) => {
                        setDebtAmount(e.target.value)
                        setDebtAmountError("")
                    }} id="debt_amount" type='number' disabled={editForm} />
                    <span className='error-message'>{debtAmountError}</span>
                </div>
                <div className='credit-form-div'>
                    <label htmlFor='loan_type'>Loan Type</label>
                    <select value={loanType} onChange={(e) => {
                        setLoanType(e.target.value)
                        setLoanTypeError("")
                    }} id="loan_type" disabled={editForm}>
                        <option value="">Select Loan Type</option>
                        <option value="fixed">fixed</option>
                        <option value="adjustable">adjustable</option>
                    </select>
                    <span className='error-message'>{loanTypeError}</span>
                </div>
                <div className='credit-form-div'>
                    <label htmlFor='property_type'>Property Type</label>
                    <select value={propertyType} onChange={(e) => {
                        setPropertyType(e.target.value)
                        setPropertyTypeError("")
                    }} id="property_type" disabled={editForm}>
                        <option value="">Select Property Type</option>
                        <option value="single_family">single_family</option>
                    <option value="condo">condo</option>
                    </select>
                    <span className='error-message'>{propertyTypeError}</span>
                </div>
            </form>
            <ActionButton editForm={editForm} setEditForm={setEditForm} resetForm={resetForm} onSumitForm={onSumitForm} selectedMortgage={selectedMortgage} deleteMortgage={deleteMortgage} />
        </div>
    )
}

export default CreditForm