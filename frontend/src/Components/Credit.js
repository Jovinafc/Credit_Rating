import React, { useEffect, useState } from 'react'
import CreditList from './CreditList'
import CreditForm from './CreditForm'
import { getData } from '../services';

const Credit = () => {
    const [rating, setRating] = useState("");
    const [mortgages, setMortgages] = useState([]);
    const [selectedMortgage, setSelectedMortgage] = useState(null);
    
   useEffect(() => {
    getMortgages();
   }, []);

   const getMortgages = () => {
    getData()
        .then((res) => {
            console.log("Res", res);
            if(res.status === "success"){
                setMortgages(res?.data?.mortgages);
                setRating(res?.data?.total_rating)
            }
        })
        .catch(err => console.log(err))
   }

  return (
    <div class="credit-container">
    <CreditList selectedMortgage={selectedMortgage} setSelectedMortgage={setSelectedMortgage} rating={rating} mortgages={mortgages} />
    <CreditForm selectedMortgage={selectedMortgage} setSelectedMortgage={setSelectedMortgage}  getMortgages={getMortgages} />
    </div>
  )
}

export default Credit