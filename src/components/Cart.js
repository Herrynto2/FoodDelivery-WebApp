import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class Cart extends React.Component {

    handleDelete = async(id) => {
        const alerts = Swal.mixin({ customClass: { confirmButton: 'btn-auth btn btn-warning' } })
            // alerts.fire({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     icon: 'warning',
            //     showCancelButton: true,
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'delete it!'
            // }).then((result) => {
            //     if (result.value) {
            //         alerts.fire(
            //             'Deleted!',
            //             'Your file has been deleted.',
            //             'success'
            //         )
            //     }
            // })
        await axios.delete(`${process.env.REACT_APP_API_URL}/carts/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token'))
                }
            })
            .then(res => {
                console.log(res.data)
                if (res.data.success !== false) {
                    try {
                        alerts.fire({ icon: 'success', text: 'Delete item successfully' })
                    } catch (error) {
                        console.log(error.response)
                        alerts.fire({ icon: 'error', text: `${error.response.msg}` })
                    }
                } else {
                    alerts.fire({ icon: 'error', title: 'Oops...', text: 'Failed to delete item' })
                }
            })
            .catch(err => {
                console.log({ err })
                alerts.fire({ icon: 'error', text: `${err.response.msg}` })
            })
    }

    render() {
        return ( <
            div className = "col-lg-3" >
            <
            Link to = { `/carts/${this.props.id_cart}` }
            className = "text-decoration-none" >
            <
            div className = "card  text-center cardresto mb-5" >
            <
            div className = "value-cart" > { this.props.total_item } < /div> <
            img alt = { this.props.items }
            src = { process.env.REACT_APP_API_URL + this.props.images }
            className = "card-img-top imgitems" / >
            <
            div className = "card-body text-center" >
            <
            h5 className = "card-texts" > { this.props.items } < /h5> <
            h7 className = "card-resto" > { this.props.restaurant } < /h7> <
            h6 className = "textcolors" > { this.props.prices } < /h6> <
            button onClick = { e => this.handleDelete(this.props.id) }
            type = "button"
            className = "btn btn-danger mt-3" > Delete < /button> <
            /div> <
            /div> <
            /Link> <
            /div>
        )
    }
}

export default Cart;