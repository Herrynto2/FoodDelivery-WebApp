import React from 'react';
import Navbarsubuser from '../components/Navbarsubuser'
import Footer from '../components/Footer'
import axios from 'axios'
import ListItemRestoGuest from '../components/Listitemsrestoguest.js'

class RestaurantID extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data_resto: null,
            data_items: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.getDataResto(this.props.match.params.id)
    }

    async getDataResto(id) {
        await axios.get(`${process.env.REACT_APP_API_URL}/detail-restaurant/${id}`)
            .then(res => {
                console.log(res)
                console.log('berhasil')
                let dataArr = res.data.detail
                let dataArr2 = res.data.items
                this.setState({
                    data_resto: dataArr,
                    data_items: dataArr2
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Navbarsubuser />
                <div className='container margincontent-resto' >
                    <h4 className=" bold mt-5 text-center mergintitleresto" > Restaurant </h4>
                    {this.state.data_resto && (
                        <div className="card-body-link" >
                            <div className="card mb-3 card-profile img-cartsize card-body-hover" >
                                <div className="row no-gutters" >
                                    <div className="row no-gutters" >
                                        <div className="img-cartsize" > < img src={process.env.REACT_APP_API_URL + this.state.data_resto.logo}
                                            className="card-img-resto" />
                                        </div>
                                    </div>
                                    <div className="col-md-6" >
                                        <div className="card-body" >
                                            <h5 className="cart-title text-left" > {this.state.data_resto.name_restaurant} </h5>
                                            <hr />
                                            <h6 className="cart-resto" > {this.state.data_resto.location} </h6>
                                            <h6 className="text-muted text-justify" > {this.state.data_resto.description} </h6> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    <hr className="mt-5" />
                    <div className="row " > {
                        this.state.data_items.map((val, idx) => (<ListItemRestoGuest key={idx} items={val.name_item} images={val.images} restaurant={val.name_restaurant} prices={val.price} category={val.category} id={val.id_item} />))}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default RestaurantID;