import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import cart from '../img/cart.png'
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'
import { getDataItemsID } from '../redux/action/items'
import { connect } from 'react-redux'

class ListItemRestoGuest extends React.Component {
    constructor(props) {
        super()
        this.state = {
            visible: false,
            show: false,
            total_item: ''
        }
        this.handleModal = this.handleModal.bind(this)
    }

    handleModal(e, id) {
        e.preventDefault()
        this.props.getDataItemsID(this.props.id)
        console.log(this.props.id)
        this.setState({ show: !this.state.show })

    }
    handleValue = (e) => {
        console.log(e.target.value)
        this.setState({
            total_item: e.target.value
        })
    }
    handleAddToCart = async (e) => {
        const data = {
            total_item: this.state.total_item
        }
        const alerts = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning' } })

        if (this.state.total_item === "") {
            alerts.fire({ icon: 'error', text: 'value still empty' })
        } else {
            await axios.post(`${process.env.REACT_APP_API_URL}/carts/${this.props.id}`, data, {
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                }
            })
                .then(res => {
                    if (res.data.success !== false) {
                        try {
                            alerts.fire({ icon: 'success', text: 'Save items successfully' })
                        } catch (error) {
                            console.log(error.response)
                            alerts.fire({ icon: 'error', text: `${error.response.msg}` })
                        }
                    } else {
                        alerts.fire({ icon: 'error', title: 'Oops...', text: 'Failed to save items' })
                    }
                })
                .catch(err => {
                    console.log({ err })
                    alerts.fire({ icon: 'error', text: `${err.response.msg}` })
                })
        }
    }


    render() {
        console.log(this.props)
        return (
            <div className="col-lg-3">
                <Link to={`/detail-items/${this.props.id}`} className="text-decoration-none">
                    <div className="card  text-center carditemrestodetail mb-5" >
                        <img src={process.env.REACT_APP_API_URL + this.props.images} className="card-img-top imgitemresto" />
                        <div className="card-body text-center" >
                            <img onClick={(e) => { this.handleModal(e) }} src={cart} alt="" className="imgcarts" />
                            <h5 className="card-text-resto" > {this.props.items} </h5>
                            <h7 className="card-resto-category" > {this.props.category} </h7>
                            <h6 className="textcolor text-price" > {this.props.prices} </h6>
                        </div>
                        <div className="btn-group text-center" >
                        </div>
                    </div>
                </Link> {
                    this.props.data_item && (
                        <Modal centered show={this.state.show} onHide={() => this.setState({ show: false })} >
                            <Modal.Header closeButton > < span className="bold text-muted" > {this.props.data_item.name_restaurant} </span></Modal.Header >
                            <Modal.Body className="text-center" >
                                <div class="card mb-3">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src={process.env.REACT_APP_API_URL + this.props.data_item.images} className="imgshapes" />
                                        </div>
                                        <div class="col-md-8 text-left" >
                                            <div class="card-body card-bodies" >
                                                <h6 className="cart-prices" > Rp. {this.props.data_item.price} < span className="peritem" > /item</span > </h6>

                                                <input type="number" onChange={e => this.handleValue(e)} name="value" className="cartvalue form-control" min="1" placeholder="add items..." />
                                                <div className="valuealign" > < button onClick={e => this.handleAddToCart(e)} type="button"
                                                    className="btn-carts btn-auth btn btn-warning mt-3" > Save </button></div >
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
    data_item: state.items.data_item,
    token: state.auth.token
})

const mapDispatchToProps = { getDataItemsID }

export default connect(mapStateToProps, mapDispatchToProps)(ListItemRestoGuest)