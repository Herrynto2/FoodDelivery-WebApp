    import { combineReducers } from 'redux'
    import authReducer from './auth'
    import restaurantReducer from './restaurants'
    import itemReducer from './items'
    import cartReducer from './cart'
    import userReducer from './users'

    export default combineReducers({
        auth: authReducer,
        restaurants: restaurantReducer,
        items: itemReducer,
        cartItems: cartReducer,
        user: userReducer,
    })