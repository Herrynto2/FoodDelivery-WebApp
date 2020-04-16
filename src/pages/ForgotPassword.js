import React from "react";
import "../assets/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", newpassword: "", confirmpassword: "" };
  }

  handleUsername = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      username: e.target.value,
    });
  };
  handleNewPassword = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      newpassword: e.target.value,
    });
  };
  handleConfirmPassword = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      confirmpassword: e.target.value,
    });
  };

  //When login button click
  handleSend = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      newpassword: this.state.newpassword,
      confirmpassword: this.state.confirmpassword,
    };
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (
      this.state.username === "" ||
      this.state.newpassword === "" ||
      this.state.confirmpassword === ""
    ) {
      alerts.fire({ icon: "error", text: "Data cannot be empty" });
      return;
    } else if (this.state.newpassword !== this.state.confirmpassword) {
      alerts.fire({ icon: "error", text: "confirm password must be same" });
      return;
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/forgot-password`, data)
        .then((res) => {
          console.log(res.data.verification_code);
          if (res.data.success !== false) {
            try {
              this.props.history.push("/verify");
              prompt(
                "Please copy this verification code",
                res.data.verification_code
              );
            } catch (error) {
              alerts.fire({ icon: "error", text: `${error.response.msg}` });
            }
          } else {
            alerts.fire({ icon: "error", text: "username not found" });
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
        <div className="bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 info-panel">
                <div className="row">
                  <div className="col-lg formforgot pl-5 pr-5 pt-5">
                    <div class="form-group">
                      <label
                        for="exampleFormControlInput1"
                        className="text-dark gray"
                      >
                        {" "}
                        Username{" "}
                      </label>{" "}
                      <input
                        type="username"
                        onChange={(e) => this.handleUsername(e)}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="username ..."
                      />
                      <label for="exampleFormControlInput1" className="mt-3">
                        {" "}
                        New password{" "}
                      </label>{" "}
                      <input
                        type="password"
                        onChange={(e) => this.handleNewPassword(e)}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="password ..."
                      />
                      <label for="exampleFormControlInput1" className="mt-3">
                        {" "}
                        Confirm password{" "}
                      </label>{" "}
                      <input
                        type="password"
                        onChange={(e) => this.handleConfirmPassword(e)}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="password ..."
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={(e) => this.handleSend(e)}
                        className="btn-auth btn btn-warning mt-2"
                      >
                        {" "}
                        Send{" "}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
