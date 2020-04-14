import axios from 'axios'
import { GET_CART_USER, GET_CART_ID } from './types'
import { connect } from 'react-redux'

export const getCartItems = (token) => dispatch => {
    axios.get(process.env.REACT_APP_API_URL + '/carts', { headers: { Authorization: 'Bearer ' + token } })
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_CART_USER,
                payload: res.data.data
            })
        })
        .catch(err => console.log(err))
}

export const getCartItemID = (id, token) => dispatch => {
    axios.get(process.env.REACT_APP_API_URL + `/cart/${id}`, { headers: { Authorization: 'Bearer ' + token } })
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_CART_ID,
                payload: res.data.data[0],
                checkout: res.data.checkout
            })
        })
        .catch(err => console.log(err))
}
