// import {pool} from '../db.js'

// export const getAddressess = async (req, res) => {
//     try {
//         const [result] = await pool.query(
//             `select
//              CA.number,
//       CA.street,
//       CA.city,
//       CA.state,
//       CA.country,
//       CA.zip_code 
//       from customers_address CA 
//       join customers C on CA.customer_id = C.id`
//         )
//         console.log(result)
//         res.json(result)
//     } catch(error) {
//         console.log(error)
//         return res.status(500).json({message: error.message})
//     }
// }