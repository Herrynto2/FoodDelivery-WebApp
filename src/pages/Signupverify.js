import React from 'react';
import '../assets/Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../assets/Login.css'
import Swal from 'sweetalert2'

class Verify extends React.Component {
    constructor(props) {
        super(props)
        this.state = { code: '' }
    }

    handleCode = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            code: e.target.value
        })
    }
    handleVerify = (e) => {
        e.preventDefault()
        const data = {
            code: this.state.code
        }
        const alerts = Swal.mixin({ customClass: { confirmButton: 'btn btn-warning' } })
        if (this.state.code === "") {
            alerts.fire({ icon: 'error', text: 'Code cannot be empty' })
        } else {
            axios.patch(`${process.env.REACT_APP_API_URL}/verify?code=${data.code}`)
                .then(res => {
                    if (res.status === 200) {
                        try {
                            alerts.fire({ icon: 'success', text: 'Verification successful' })
                            this.props.history.push('/login')
                        } catch (error) {
                            alerts.fire({ icon: 'error', text: `${error.response.msg}` })
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                    alerts.fire({ icon: 'error', title: 'Oops...', text: 'Incorrect verification code' })
                })
        }
    }


    render() {
        return (
            <div>
                <div className="bg">
                    <div className="container">
                        <div className="row justify-content-center" >
                            <div className="col-lg-6 info-panel" >
                                <div className="row" >
                                    <div className="col-lg formverify pl-5 pr-5 pt-5" >
                                        <div className="titleverify"><label>Verify your account</label></div>
                                        <input type="text" onChange={e => this.handleCode(e)} className="form-control inputverify" name="code" placeholder="code ..." />
                                        <div className="btnverify" >
                                            < button type="button" onClick={e => this.handleVerify(e)} className="btn-auth btn btn-warning mt-4" > Verify </button>
                                        </div >
                                        <Link to="/login" className="text-decoration-none" > <span className="signuplink"> Back to login </span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Verify;