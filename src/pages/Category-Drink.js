import React from 'react'
import '../assets/Style.css'
import ListItems from '../components/Listitems'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { getDrinksCategory } from '../redux/action/items'
import Navbarsubuser from '../components/Navbarsubuser'

class CategoryDrink extends React.Component {

    componentDidMount() {
        this.props.getDrinksCategory()
    }


    render() {
        return (
            <div >
                { /* Navbar */}
                <Navbarsubuser />
                { /* Content Items */}
                <div >
                    <div className="container margincontent" >
                        <div className="row" >
                            <div className="col-md-12" > < h4 className="text-center bold mt-5 mb-5" > Drink Category </h4></div >
                        </div>
                        <div className="row " > {this.props.data_drinks.map((val, idx) => (<ListItems key={idx} items={val.name_item} restaurant={val.name_restaurant} prices={val.price} id={val.id_item} images={val.images} />))}
                        </div>
                    </div>
                </div>
                { /* Footer */}
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    data_drinks: state.items.data_drinks
})

const mapDispatchToProps = { getDrinksCategory }

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDrink)