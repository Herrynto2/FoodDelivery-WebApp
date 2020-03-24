import React from 'react'
import '../assets/Style.css'
import Navbarsub from '../components/Navbarsubuser'
import ListRestaurant from '../components/Listrestaurant'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { getDataRestaurants } from '../redux/action/restaurants'

class Restaurant extends React.Component {

    componentDidMount() {
        this.props.getDataRestaurants()
    }

    render() {
        return (
            <div >
                <Navbarsub />
                <div>
                    <div className="container margincontent" >
                        <div className="row" >
                            <div className="col-md-12" > < h4 className="text-center bold mt-5 mb-5" > Restaurant </h4>
                            </div >
                        </div>
                        <div className="row mb-5" > {
                            this.props.data_restaurants.map((val, idx) => (<ListRestaurant key={idx} name={val.name_restaurant} location={val.location} id={val.id_restaurant} logo={val.logo} />))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data_restaurants: state.restaurants.data_restaurants
})

const mapDispatchToProps = { getDataRestaurants }
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant)