import React from 'react';
import { Link } from 'react-router-dom'
import { getDataAdmin } from '../redux/action/users'
import { connect } from 'react-redux'

class Profilerestos extends React.Component {

    componentDidMount() {
        this.props.getDataAdmin()
    }

    render() {
        return ( <
            div > { console.log(this.props.data_admin) } <
            div className = "container" >
            <
            Link to = "/restaurantprofile"
            className = "card-body-link" >
            <
            div className = "card mb-5 mt-5 card-body-hover" >
            <
            div className = "row no-gutters" >
            <
            div className = "row no-gutters" >
            <
            img src = { process.env.REACT_APP_API_URL + this.props.data_admin.logo }
            className = "card-img card-img-profile" / >
            <
            /div> <
            div className = "col-md-8" >
            <
            div className = "card-body " >
            <
            h5 className = "card-title" > { this.props.data_admin.name_restaurant } < /h5> <
            hr / >
            <
            p className = "card-text" > < small className = "text-muted" > Last updated { this.props.data_admin.date_updated } < /small></p >
            <
            p className = "card-text text-muted mb-5" > { this.props.data_admin.description } < /p> <
            h5 className = "card-text text-muted" > { this.props.data_admin.location } < /h5>

            <
            /div> <
            /div> <
            /div> <
            /div> <
            /Link> <
            /div> <
            /div>
        )
    }
}

const mapStateToProps = state => ({
    data_admin: state.user.data_admin
})
const mapDispatchToProps = { getDataAdmin }

export default connect(mapStateToProps, mapDispatchToProps)(Profilerestos)