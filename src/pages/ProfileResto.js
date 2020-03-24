import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbarsubuser from '../components/Navbarsubuser'
import Swal from 'sweetalert2'
import { getDataAdmin } from '../redux/action/users'
import { connect } from 'react-redux'
import { CustomInput } from 'reactstrap'
import IG from '../img/ig.png'

class Profilerestaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name_restaurant: '',
            created_by: '',
            description: '',
            location: '',
            logo: null
        }
    }


    componentDidMount() {
        this.props.getDataAdmin(this.props.token)
    }

    /////Edit Restaurant
    handleName = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            name_restaurant: e.target.value
        })
    }
    handleOwner = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            created_by: e.target.value
        })
    }
    handleDesc = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            description: e.target.value
        })
    }
    handleLocation = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            location: e.target.value
        })
    }

    handleLogo = (e) => {
        console.log(e.target.files[0])
        this.setState({
            logo: e.target.files[0]
        })
    }

    handleEdit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name_restaurant', this.state.name_restaurant)
        data.append('logo', this.state.logo)
        data.append('location', this.state.location)
        data.append('description', this.state.description)
        data.append('created_by', this.state.created_by)
        const alerts = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning' } })
        if (this.state.name_restaurant === "") {
            alerts.fire({ icon: 'error', text: 'Text still empty! ' })
        } else {
            axios.patch(`${process.env.REACT_APP_API_URL}/restaurant`, data, { headers: { Authorization: 'Bearer ' + this.props.token } })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success !== false) {
                        try {
                            alerts.fire({ icon: 'success', text: 'update restaurant successfully ' })
                            this.props.getDataAdmin(this.props.token)
                        } catch (error) {
                            alert(error.response.msg)
                        }
                    } else {
                        alerts.fire({ icon: 'error', title: 'Oops', text: 'failed to update' })
                    }
                })
                .catch(err => {
                    console.log('error', err.response)
                    alerts.fire({ icon: 'error', text: `${err.response.msg}` })
                })
        }
    }


    render() {
        return (
            <div >
                <Navbarsubuser />
                <div className="container" >
                    <div className="row mt-5" >
                        <div className="col-sm-12" >
                            <h3 className="tittleuserprofile" > Restaurant Profile </h3><hr />
                        </div>
                    </div>
                    <div className="row mt-3" >
                        <div className="col-lg-4 sizeprofile" >
                            <Link to="/items" > < button class=" btnitems btn btn-warning my-2 my-sm-0"
                                type="submit" > Items </button></Link >
                            <label for="image" > < img src={process.env.REACT_APP_API_URL + this.props.data_admin.logo} name="logo" className="sizeuserprofile mb-3 mt-4" /> </label> <input type="file" name="" id="image" hidden onChange={e => this.handleLogo(e)} />
                        </div>
                        <div className="col-lg-1" >
                        </div>
                        <div className="col-lg-6" >
                            <div class="form-group" >
                                <label for="exampleFormControlInput1" className=" sml" > Restaurant </label>
                                <input onChange={e => this.handleName(e)} name="name" type="text" className="form-control" id="exampleFormControlInput1" defaultValue={this.props.data_admin.name_restaurant} />
                                <label for="exampleFormControlInput1" className="mt-2 sml" > Owner </label>
                                <input onChange={e => this.handleOwner(e)} name="owner" type="text" className="form-control"
                                    id="exampleFormControlInput1" defaultValue={this.props.data_admin.created_by} />
                                <label for="exampleFormControlInput1" className="mt-2 sml" > Description </label> < input onChange={e => this.handleDesc(e)} name="description" type="text" className="form-control" id="exampleFormControlInput1" defaultValue={this.props.data_admin.description} />
                                <label for="exampleFormControlInput1" className="mt-2 sml" > Location </label> <input onChange={e => this.handleLocation(e)} name="location" type="text" className="form-control mb-4"
                                    id="exampleFormControlInput1" defaultValue={this.props.data_admin.location} />
                                <button onClick={e => this.handleEdit(e)} class="btn btn-warning my-2 my-sm-0" type="submit" > Edit </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data_admin: state.user.data_admin,
    token: state.auth.token
})


const mapDispatchToProps = { getDataAdmin }

export default connect(mapStateToProps, mapDispatchToProps)(Profilerestaurant)