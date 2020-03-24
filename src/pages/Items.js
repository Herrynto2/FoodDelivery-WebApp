import React from 'react'
import '../assets/Style.css'
import Navbarsubuser from '../components/Navbarsubuser'
import ListItems from '../components/Listitems'
import Footer from '../components/Footer'
import { getDataItems } from '../redux/action/items'
import { connect } from 'react-redux'

class Items extends React.Component {

    componentDidMount() {
        this.props.getDataItems()
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
                            <div className="col-md-12" > < h4 className="text-center bold mt-5 mb-5" > List Items </h4></div >
                        </div>
                        <div className="row " >
                            {this.props.data_items.map((val, idx) => (
                                <ListItems key={idx} images={val.images} items={val.name_item} restaurant={val.name_restaurant} prices={val.price} id={val.id_item} />))}
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
    data_items: state.items.data_items
})

const mapDispatchToProps = { getDataItems }
export default connect(mapStateToProps, mapDispatchToProps)(Items)