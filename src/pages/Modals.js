// import React from 'react'
// import '../assets/Style.css'
// import { Modal, Button } from 'react-bootstrap'
// import { Alert } from 'reactstrap'


// class Modals extends React.Component {
//     constructor(props) {
//         super()
//         this.state = {
//             show: false,
//             visible: false
//         }
//     }
//     handleModal() {
//         this.setState({ show: !this.state.show })
//     }

//     toggle() {
//         this.setState({
//             visible: !this.state.visible
//         })
//     }

//     render() {
//         return ( <
//             div >
//             <
//             Button className = "btnmodal btn-warning"
//             onClick = { this.toggle.bind(this) } > Show < /Button> <
//             Alert color = "primary alertbg"
//             isOpen = { this.state.visible }
//             toggle = { this.toggle.bind(this) } > Haii Alert...!!! < /Alert>


//             <
//             Button className = "btnmodal btn-warning"
//             onClick = {
//                 () => { this.handleModal() } } > Show < /Button> <
//             Modal ceneterd show = { this.state.show }
//             onHide = {
//                 () => this.handleModal() } >
//             <
//             Modal.Header closeButton > Hello World < /Modal.Header> <
//             Modal.Body >
//             Haii, Lorem ipsum dolor, sit amet consectetur adipisicing elit.Vel, fugit ?
//             <
//             input type = "text" / >
//             <
//             /Modal.Body> <
//             Modal.Footer >
//             <
//             Button className = "btnmodal  btn-warning"
//             onClick = {
//                 () => { this.handleModal() } } >
//             Close <
//             /Button> <
//             /Modal.Footer> <
//             /Modal> <
//             /div>
//         )
//     }
// }

// export default Modals;