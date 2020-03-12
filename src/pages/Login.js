import React from 'react';
import '../assets/Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {

    showAlert() {
        alert(this.state.fullname)
    }

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    handleUsername = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            username: e.target.value
        })
    }
    handlePassword = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            password: e.target.value
        })
    }

    //When login button click
    handleLogin = (e) => {
        console.log(this.state.username, this.state.password)
        e.preventDefault()
        const data = {
                username: this.state.username,
                password: this.state.password
            }
            //Validation username && password
        if (this.state.username === "" && this.state.password === "") {
            alert('Username or password connot be empty !')
        } else {
            // console.log(data) // to get data fotm username & password
            axios.post('http://localhost:3000/login', { //check to port 3000 from table users that connect to backend
                    username: this.state.username,
                    password: this.state.password
                })
                .then(res => {
                    console.log(res) //to get data token 
                    if (res.status === 200) { // 200 is http code success
                        try {
                            localStorage.setItem('token', JSON.stringify(res.data.data.token)) //save token to localstorage
                                //console.log(this.props)
                            this.props.history.push('/home') //push home page
                        } catch (error) {
                            //console.log(error.response)
                            alert(error.response.msg)

                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log(err.response)
                    alert(err.response.data.msg)
                })
        }
    }



    render() {
        return ( <
            div >
            <
            div className = "bg" >
            <
            div className = "container" >
            <
            div className = "row justify-content-center" >
            <
            div className = "col-lg-4 info-panel" >
            <
            div className = "row" >
            <
            div className = "col-lg formlogin pl-5 pr-5 pt-5" >
            <
            div className = "titlelogin" > < label > Login < /label></div >
            <
            div class = "form-group" >
            <
            label
            for = "exampleFormControlInput1"
            className = "text-dark gray" > Username < /label> <
            input type = "text"
            onChange = { e => this.handleUsername(e) }
            className = "form-control"
            name = "username"
            id = "exampleFormControlInput1"
            placeholder = "username ..." / >
            <
            label
            for = "exampleFormControlInput1"
            className = "mt-3" > password < /label> <
            input type = "password"
            onChange = { e => this.handlePassword(e) }
            className = "form-control"
            name = "password"
            id = "exampleFormControlInput1"
            placeholder = "password ..." / >
            <
            /div> <
            div className = "text-right" >
            <
            Link to = "/forgot-password"
            className = "text-decoration-none" > < span className = "forgotlink" > forgot the password < /span></Link >
            <
            /div> <
            div className = "text-center" >
            <
            button onClick = { e => this.handleLogin(e) }
            type = "button"
            className = "btn btn-primary mt-4" > Login < /button> <
            /div> <
            div className = "text-center mt-4" >
            <
            Link to = "/signup"
            className = "text-decoration-none" > < span className = "signuplink" > Create new account < /span></Link >
            <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div>
        )
    }
}

export default Login;