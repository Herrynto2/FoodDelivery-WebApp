import React from 'react'
import '../assets/Style.css'
import Navbarsubuser from '../components/Navbarsubuser'
import ListItem from '../components/Listitems'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { getFoodsCategory } from '../redux/action/items'

class CategoryFood extends React.Component {

    componentDidMount() {
        this.props.getFoodsCategory()
    }

    render() {
        return (
            <div >
                { /* Navbar */}
                <Navbarsubuser />
                {console.log('keys', this.props.data_foods)}
                { /* Content Items */}
                <div >
                    <div className="container margincontent" >
                        <div className="row" >
                            <div className="col-md-12" > < h4 className="text-center bold mt-5 mb-5" > Food Category </h4></div >
                        </div>
                        <div className="row " >
                            {this.props.data_foods.map((val, idx) => (<ListItem key={idx} items={val.name_item} restaurant={val.name_restaurant} prices={val.price} id={val.id_item} images={val.images} />))}
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
    data_foods: state.items.data_foods
})

const mapDispatchToProps = { getFoodsCategory }

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFood)