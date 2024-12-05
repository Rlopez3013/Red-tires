import Axios from 'axios'


 export const PayButton = () => {
    const handleCheckout = ({cartItems}) => {
          Axios.post(`${url}/stripe/create-checkout-session`)
    }
    return(
        <>
        <button onClick={() => handleCheckout()}>Check Out</button>
        </>
    )
}