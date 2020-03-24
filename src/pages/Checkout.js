import React from 'react';
import Navbarsubuser from '../components/Navbarsubuser'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getCartItemID } from '../redux/action/cart'

class Checkout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            total_item: 1,
            show: false
        }
    }

    handleValue = (e) => {
        console.log(e.target.value)
        this.setState({
            total_item: e.target.value
        })
    }
    handleModal() {
        console.log(true)
        this.setState({ show: !this.state.show })
    }

    componentDidMount() {
        this.props.getCartItemID(this.props.match.params.id, this.props.token)
    }

    ////Checkout
    handleCheckout = async (e) => {
        const data = {
            total_item: this.state.total_item
        }
        const alerts = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning' } })
        if (this.state.total_item < 1) {
            alerts.fire({ icon: 'error', text: 'Please input value minimal 1!' })
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}/checkout/${this.props.match.params.id}`, data, {
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.success !== false) {
                        try {
                            alerts.fire({ icon: 'success', text: 'Payment successful' })
                            this.props.history.push('/cart')
                        } catch (error) {
                            console.log(error.response)
                            alerts.fire({ icon: 'error', text: 'error' })
                        }
                    } else {
                        alerts.fire({ icon: 'error', title: 'Oops...', text: 'Payment failed' })
                    }
                })
                .catch(err => {
                    console.log({ err })
                    alerts.fire({ icon: 'error', text: 'error' })
                })
        }
    }

    render() {
        return (
            <div >
                <Navbarsubuser />
                <div className='container' >
                    <h4 className=" bold mt-5 mb-5 text-center " > Checkout Item </h4>
                    {this.props.data_cartID && (<div className="card-body-link" >
                        <div className="card mb-5 card-profil" >
                            <div className="row no-gutters" >
                                <div className="row no-gutters" >
                                    <img src={process.env.REACT_APP_API_URL + this.props.data_cartID.images} className="card-img card-img-detail" alt="..." />
                                </div>
                                <div className="col-md-6" >
                                    <div className="card-body" >
                                        <h5 className="cart-titles" > {this.props.data_cartID.name_item} </h5> <hr />
                                        <h6 className="cart-resto" > {this.props.data_cartID.name_restaurant} - {this.props.data_cartID.location} </h6> <p className="text-muted" > {this.props.data_cartID.description} </p>
                                        <h6 className="cart-price" > Rp. {this.props.data_cartID.price} < span className="text-" > item</span > </h6>
                                    </div>
                                </div>
                            </div>
                        </div> </div>
                    )
                    }

                    <div class="card" >
                        <div class="card-body" >
                            <div className="text-checkout bold" > Checkout:
            <button onClick={() => { this.handleModal() }} className="ml-3 btn btn-danger bold" > Rp. {this.props.checkout} </button>
                            </div>
                        </div>
                    </div>
                </div>

                { /* Add Items Hide*/} {
                    this.props.data_cartID && (
                        <Modal centered show={this.state.show} onHide={() => this.handleModal()} >
                            <Modal.Header closeButton > < span className="bold text-muted" > {this.props.data_cartID.name_item}
                            </span></Modal.Header >
                            <Modal.Body className="text-center" >
                                <div class="card mb-3" >
                                    <div class="row no-gutters" >
                                        <div class="col-md-4" >
                                            <img src={process.env.REACT_APP_API_URL + this.props.data_cartID.images} className="imgshapes" />
                                        </div>
                                        <div class="col-md-8 text-left" >
                                            <div class="card-body card-bodies" >
                                                <h6 className="cart-prices" > Rp. {this.props.data_cartID.price} <span>item</span > </h6>
                                                <input type="number" onChange={e => this.handleValue(e)} name="value" className="cartvalue form-control" min="1" placeholder="input value ..." defaultValue={this.props.data_cartID.total_item} />
                                                <div className="valuealign" > < button onClick={e => this.handleCheckout(e)} type="button"
                                                    className="btn-carts btn-auth btn btn-danger mt-3" > Checkout </button></div >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_cartID: state.cartItems.data_cartID,
    checkout: state.cartItems.checkout,
    token: state.auth.token

})
const mapDispatchToProps = { getCartItemID }
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)