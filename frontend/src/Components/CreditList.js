import React from 'react'

const CreditList = ({rating, mortgages, selectedMortgage, setSelectedMortgage}) => {
  return (
    <div className='credit-list-container'>
        <div className='rating'>
        Credit Rating - <span className="rating-value"> {rating}</span>
        </div>

        <div className='credit-lists'>
            {
                mortgages.length > 0 
                ?
                mortgages.map((item, index) => (
                    <div className={selectedMortgage?.id === item.id ? 'credit-list credit-selected' : 'credit-list'} onClick={() => setSelectedMortgage(item)}>
                        <p>Mortgage - #{item.id}</p>
                    </div>
                ))
                :
                <div>No Mortgages present.</div>
            }
        </div>
    </div>
  )
}

export default CreditList