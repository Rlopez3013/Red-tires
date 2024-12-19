import Axios from 'axios'


 export const PayButton = () => {
    const handleCheckout = () => {
          Axios.post(`http://localhost:4000/api/payments`)
    }
    return(
        <>
        <button onClick={() => handleCheckout()}>Check Out</button>
        </>
    )
}