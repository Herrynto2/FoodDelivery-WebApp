import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class ListItemResto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onDelete: true
        }
    }

    // componentDidMount() {
    //     this.getDataItems()
    // }

    // componentDidUpdate(prev, next) {
    //     if (!this.state.onDelete) {
    //         this.getDataItems()
    //         console.log('text')
    //         this.setState({onDelete:false})
    //     }
    // }


    handleDelete = async(e, id) => {
        e.preventDefault()
        const alerts = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning' } })
        await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token'))
                }
            })
            .then(res => {
                console.log(res.data)
                if (res.data.success !== false) {
                    alerts.fire({ icon: 'success', text: 'Item was successfully deleted' })
                        // this.setState({onDelete:true})
                        // this.getDataItems()
                } else {
                    alerts.fire({ icon: 'error', title: 'Oops', text: 'delete item failed' })
                }
            })
            .catch(err => {
                alerts.fire({ icon: 'error', text: `error` })
            })
    }


    render() {
        return ( <
            div className = "col-lg-2 itemsbottom mb-5" >
            <
            Link to = { `/restaurant-items/${this.props.id}` }
            className = "text-decoration-none" >
            <
            div className = "card text-center carditemrestos" >
            <
            img src = { process.env.REACT_APP_API_URL + this.props.images }
            className = "card-img-top imgitemrestos" / >
            <
            div className = "card-body text-center" >
            <
            h5 className = "card-text-resto" > { this.props.items } < /h5> <
            h7 className = "card-resto-category" > { this.props.category } < /h7> <
            h6 className = "textcolor text-price" > { this.props.prices } < /h6> <
            /div> <
            div className = "btn-group text-center" >
            <
            button onClick = { e => this.handleDelete(e, this.props.id) }
            type = "button"
            className = "btn btn-danger btndel" > Delete < /button> <
            /div> <
            /div> <
            /Link>

            <
            /div>

        )
    }
}

export default ListItemResto;