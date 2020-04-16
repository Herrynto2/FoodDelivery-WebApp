import React from "react";
import "../assets/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      email: "",
    };
  }
  handleName = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      name: e.target.value,
    });
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
  handleEmail = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      email: e.target.value,
    });
  };
  //When login button click
  handleSignup = (e) => {
    console.log(this.state.username, this.state.password);
    e.preventDefault();
    const data = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      gender: this.state.gender,
      work: this.state.work,
      address: this.state.address,
    };
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (this.state.username === "" && this.state.password === "") {
      alerts.fire({
        icon: "error",
        text: "Username or password cannot be empty",
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/register`, data)
        .then((res) => {
          console.log(res.data.Verification_codes);
          if (res.status === 200) {
            try {
              alerts.fire("registration successful");
              this.props.history.push("/verify");
            } catch (error) {
              alert(error.response.msg);
              alerts.fire({ icon: "error", text: `${error.response.msg}` });
              console.log(error);
            }
          }
        })
        .catch((err) => {
          alerts.fire({ icon: "error", text: `error` });
        });
    }
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-8 bgsignup"></div>{" "}
          <div className="col-sm-4 p-5">
            <div className="text-center bold mb-5 text-signup">Sign Up</div>
            <div class="form-group">
              <input
                type="text"
                onChange={(e) => this.handleName(e)}
                name="name"
                className="form-control"
                placeholder="name ..."
              />
              <input
                type="text"
                onChange={(e) => this.handleUsername(e)}
                name="username"
                className="form-control mt-3"
                placeholder="username ..."
              />
              <input
                type="password"
                onChange={(e) => this.handlePassword(e)}
                name="password"
                className="form-control mt-3"
                placeholder="password ..."
              />
              <input
                type="email"
                onChange={(e) => this.handleEmail(e)}
                name="email"
                className="form-control mt-3"
                placeholder="email ..."
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={(e) => this.handleSignup(e)}
                className="btn-auth btn btn-warning mt-4"
              >
                {" "}
                Sign Up{" "}
              </button>
            </div>
            <div className="text-center mt-4">
              <Link to="/login" className="text-decoration-none">
                {" "}
                <span className="signuplink"> Back to login </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
