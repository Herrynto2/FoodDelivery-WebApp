import React from 'react';
import Navbarsubuser from '../components/Navbarsubuser'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import Cart from '../components/Cart'
import { getCartItems } from '../redux/action/cart'

class CartsItem extends React.Component {

        componentDidMount() {
            this.props.getCartItems(this.props.token)
        }

        render() {
                return ( < div >
                        <
                        Navbarsubuser / > { console.log(this.props.data_cart) } <
                        div className = 'container margincart' >
                        <
                        h4 className = " bold mt-5 text-center mb-5" > Cart < /h4>  <
                        div className = "row " > {
                            this.props.data_cart && this.props.data_cart.map((val, idx) => ( < Cart key = { idx }
                                    images = { val.images }
                                    items = { val.name_item }
                                    restaurant = { val.name_restaurant }
                                    prices = { val.price }
                                    id = { val.id_item }
                                    id_cart = { val.id_cart }
                                    total_item = { val.total_item }
                                    />))}  < /
                                    div > <
                                    /div> { console.log(this.props.token) } <
                                    Footer / >
                                    <
                                    /div>
                                )
                            }
                        }

                        const mapStateToProps = state => ({
                            data_cart: state.cartItems.data_cart,
                            token: state.auth.token
                        })

                        const mapDispatchToProps = { getCartItems }

                        export default connect(mapStateToProps, mapDispatchToProps)(CartsItem)