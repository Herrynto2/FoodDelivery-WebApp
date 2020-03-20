import React from 'react'
import '../assets/Style.css'
import Navbarsub from '../components/Navbarsub'
import ListItemResto from '../components/Listitemsresto'
import Footer from '../components/Footer'
import axios from 'axios'
import { Pagination, PaginationItem, PaginationLink, CustomInput } from 'reactstrap';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField'
import { Modal } from 'react-bootstrap'
import Default from '../img/default.png'
import Swal from 'sweetalert2'


class Itemsresto extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data_items: [],
                show: false,
                // 
                name_item: '',
                category: '',
                price: '',
                description: '',
                images: null,
                total_item: ''
            }
        }
        componentDidMount() {
            this.getDataItems()
        }
        async getDataItems() {
                await axios.get(`http://localhost:3000/items`, { headers: { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')) } })
                    .then(res => {
                        console.log(res.data.data)
                        let dataArr = res.data.data
                        this.setState({
                            data_items: dataArr,
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            //Add Items
        handleName = (e) => {
            this.setState({
                name_item: e.target.value
            })
        }
        handleCategory = (e) => {
            this.setState({
                category: e.target.value
            })
        }
        handlePrice = (e) => {
            this.setState({
                price: e.target.value
            })
        }
        handleDesc = (e) => {
            this.setState({
                description: e.target.value
            })
        }
        handleImages = (e) => {
            this.setState({
                images: e.target.files[0]
            })
        }
        handleTotal = (e) => {
            this.setState({
                total_item: e.target.value
            })
        }
        handleAdd = (e) => {
            const data = new FormData()
            data.append('name_item', this.state.name_item)
            data.append('category', this.state.category)
            data.append('price', this.state.price)
            data.append('description', this.state.description)
            data.append('images', this.state.images)
            data.append('total_item', this.state.total_item)
            const alerts = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning' } })
            if (this.state.name_item === "" || this.state.category === "" || this.state.price === "" || this.state.description === "") {
                alerts.fire({ icon: 'error', text: 'Data cannot be empty ' })
            } else {
                axios.post(`http://localhost:3000/items`, data, { headers: { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')) } })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success !== false) {
                            try {
                                alerts.fire({ icon: 'success', text: 'Add items successfully ' })
                            } catch (error) {
                                alerts.fire({ icon: 'error', text: `${error.response.msg}` })
                            }
                        } else {
                            alerts.fire({ icon: 'error', title: 'Oops...', text: 'Add item failed' })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alerts.fire({ icon: 'error', text: `${err.response.msg}` })
                    })
            }
        }


        // Modals
        handleModal() {
            this.setState({ show: !this.state.show })
        }


        render() {

                const style = {
                    background: 'linear-gradient(45deg, #ffc107 30%, #ffc107 90%)',
                    color: 'white',
                    height: 55,
                    padding: '0 30px',
                    boxShadow: '0 3px 5px 2px rgb(204, 204, 204)',
                }

                return ( <
                        div > { /* Navbar */ } <
                        Navbarsub / >

                        { /* Content Items */ } <
                        div >
                        <
                        div className = "container marginallitems" >
                        <
                        div className = "row" >
                        <
                        div className = "mt-4 text-right" >
                        <
                        Fab style = { style }
                        borderRadius = "25%"
                        onClick = {
                            () => { this.handleModal() } } >
                        <
                        AddIcon / >
                        <
                        /Fab>

                        <
                        /div> <
                        div className = "col-md-12" > < h4 className = "text-center bold mb-5" > List Items Restaurant < /h4></div >
                        <
                        /div> <
                        div className = "row " > {
                            this.state.data_items.map((val, idx) => ( <
                                    ListItemResto key = { idx }
                                    images = { val.images }
                                    items = { val.name_item }
                                    restaurant = { val.name_restaurant }
                                    prices = { val.price }
                                    category = { val.category }
                                    id = { val.id_item }
                                    />))} <
                                    /div> <
                                    /div> <
                                    /div>

                                    { /* Add Items Hide*/ } <
                                    Modal centered show = { this.state.show }
                                    onHide = {
                                        () => this.handleModal() } >
                                    <
                                    Modal.Header closeButton > < span className = "bold text-muted" > Add New Items < /span></Modal.Header >
                                    <
                                    Modal.Body className = "text-center" >
                                    <
                                    img src = { Default }
                                    className = "imgshape" / >
                                    <
                                    div className = "text-center " >
                                    <
                                    CustomInput type = "file"
                                    onChange = { e => this.handleImages(e) }
                                    name = "images"
                                    className = "handleImages" / >
                                    <
                                    /div> <
                                    form noValidate autoComplete = "off" >
                                    <
                                    TextField onChange = { e => this.handleName(e) }
                                    label = "Items name"
                                    color = "primary"
                                    className = "inputadditems mt-3 text-muted" / >
                                    <
                                    TextField onChange = { e => this.handleCategory(e) }
                                    label = "Category"
                                    color = "primary"
                                    className = "inputadditems" / >
                                    <
                                    TextField onChange = { e => this.handlePrice(e) }
                                    label = "Price"
                                    color = "primary"
                                    className = "inputadditems" / >
                                    <
                                    TextField onChange = { e => this.handleDesc(e) }
                                    label = "Description name"
                                    color = "primary"
                                    className = "inputadditems" / >
                                    <
                                    TextField onChange = { e => this.handleTotal(e) }
                                    label = "Items total"
                                    color = "primary"
                                    className = "inputadditems" / >
                                    <
                                    div className = "text-center" >
                                    <
                                    button type = "button"
                                    onClick = { e => this.handleAdd(e) }
                                    className = "btn-auth btn btn-warning mt-4 mb-5" > Create < /button> <
                                    /div> <
                                    /form> <
                                    /Modal.Body> <
                                    Modal.Footer >
                                    <
                                    /Modal.Footer> <
                                    /Modal>

                                    { /* Pagination */ } <
                                    div className = "container marginpaginat mt-5" >
                                    <
                                    div className = "row justify-content-center" >
                                    <
                                    Pagination >
                                    <
                                    PaginationItem >
                                    <
                                    PaginationLink first href = "#" / >
                                    <
                                    /PaginationItem> <
                                    PaginationItem >
                                    <
                                    PaginationLink previous href = "#" / >
                                    <
                                    /PaginationItem> <
                                    PaginationItem active >
                                    <
                                    PaginationLink href = "#" > 1 <
                                    /PaginationLink> <
                                    /PaginationItem> <
                                    PaginationItem >
                                    <
                                    PaginationLink next href = "#" / >
                                    <
                                    /PaginationItem> <
                                    PaginationItem >
                                    <
                                    PaginationLink last href = "#" / >
                                    <
                                    /PaginationItem> <
                                    /Pagination> <
                                    /div> <
                                    /div> <
                                    /div>
                                )
                            }
                        }

                        export default Itemsresto;