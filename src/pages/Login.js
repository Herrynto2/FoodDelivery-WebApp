import React from "react";
import "../assets/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { loginUser } from "../redux/action/auth";
import { getDataAdmin, getDataUser } from "../redux/action/users";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

class Login extends React.Component {
  showAlert() {
    alert(this.state.fullname);
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      load: false,
    };
  }
  fetchData = () => {
    this.setState({ load: true });
    setTimeout(() => {
      this.setState({ load: false });
    }, 2000);
  };

  handleUsername = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      password: e.target.value,
    });
  };

  //When login button click
  handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (this.state.username === "" && this.state.password === "") {
      alerts.fire({ icon: "error", text: "Data connot be empty" });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, data)
        .then((res) => {
          console.log(res.data.data.token);
          if (res.data.success === true) {
            try {
              // this.fetchData()
              this.props.loginUser(res.data.data.token);
              this.props.getDataAdmin(res.data.data.token);
              this.props.getDataUser(res.data.data.token);
              this.props.history.push("/home");
            } catch (error) {
              alerts.fire({ icon: "error", text: "" });
              console.log(error);
            }
          } else {
            alerts.fire({
              icon: "error",
              title: "Oops...",
              text: "Username or password wrong",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alerts.fire({ icon: "error", title: "Oops...", text: "Invalid" });
        });
    }
  };

  render() {
    return (
      <div>
        <div className="bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 info-panel">
                <div className="row">
                  <div className="col-lg formlogin pl-5 pr-5 pt-5">
                    <div className="titlelogin">
                      <label>Login</label>
                    </div>
                    <div class="form-group">
                      <label
                        for="exampleFormControlInput1"
                        className="text-dark gray"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        onChange={(e) => this.handleUsername(e)}
                        className="form-control"
                        name="username"
                        id="exampleFormControlInput1"
                        placeholder="username ..."
                      />
                      <label for="exampleFormControlInput1" className="mt-3">
                        password
                      </label>
                      <input
                        type="password"
                        onChange={(e) => this.handlePassword(e)}
                        className="form-control"
                        name="password"
                        id="exampleFormControlInput1"
                        placeholder="password ..."
                      />
                    </div>
                    <div className="text-right">
                      <Link
                        to="/forgot-password"
                        className="text-decoration-none"
                      >
                        <span className="signuplink forgotlink">
                          forgot the password
                        </span>
                      </Link>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={(e) => this.handleLogin(e)}
                        type="button"
                        className="btn-auth btn btn-warning mt-4"
                      >
                        Login
                      </button>
                      {/* {load && <Spinner color="warning" />} */}
                    </div>
                    <div className="text-center mt-4">
                      <Link to="/signup" className="text-decoration-none">
                        <span className="signuplink">Create new account</span>
                      </Link>
                      <br />
                      <Link to="/home" className="text-decoration-none">
                        <span className="homelink signuplink">
                          Back to home
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { loginUser, getDataUser, getDataAdmin })(Login);
