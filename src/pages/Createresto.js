import React from "react";
import "../assets/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { getDataAdmin } from "../redux/action/users";

class CreateRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name_restaurant: "",
      location: "",
      description: "",
      created_by: "",
      logo: null,
    };
  }
  handleName = (e) => {
    console.log(e.target.value);
    this.setState({
      name_restaurant: e.target.value,
    });
  };
  handleLocation = (e) => {
    console.log(e.target.value);
    this.setState({
      location: e.target.value,
    });
  };
  handleDesc = (e) => {
    console.log(e.target.value);
    this.setState({
      description: e.target.value,
    });
  };
  handleOwner = (e) => {
    console.log(e.target.value);
    this.setState({
      created_by: e.target.value,
    });
  };
  handleLogo = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      logo: e.target.files[0],
    });
  };

  handleCreate = (e) => {
    console.log("haii");
    const data = new FormData();
    data.append("name_restaurant", this.state.name_restaurant);
    data.append("location", this.state.location);
    data.append("description", this.state.description);
    data.append("created_by", this.state.created_by);
    data.append("logo", this.state.logo);

    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (this.state.logo === null) {
      alerts.fire({ icon: "error", text: "Data connot be empty" });
    } else {
      // console.log(data) // to get data fotm username & password
      axios
        .post(`${process.env.REACT_APP_API_URL}/restaurant`, data, {
          headers: {
            Authorization: "Bearer " + this.props.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success !== false) {
            try {
              alerts.fire({
                icon: "success",
                text: "Create restaurant successfully",
              });
            } catch (error) {
              alerts.fire({ icon: "error", text: `${error.response.msg}` });
            }
          } else {
            alerts.fire({
              icon: "error",
              title: "Sorry...",
              text: "You already have restaurant",
            });
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
        <div className="bgcreateresto">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6-lg info-panel">
                <div className="row">
                  <div className="col-lg formjoinus pl-5 pr-5 pt-4">
                    <div className="titlecreateresto">
                      {" "}
                      <label> Create your restaurant </label>
                    </div>
                    <div class="form-group ">
                      <label
                        for="exampleFormControlInput1"
                        className="lbljoinus"
                      >
                        {" "}
                        Restaurant 's name
                      </label>{" "}
                      <input
                        onChange={(e) => this.handleName(e)}
                        name="name"
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name ..."
                        required
                      />
                      <label
                        for="exampleFormControlInput1"
                        className="lbljoinus mt-3"
                      >
                        {" "}
                        Location{" "}
                      </label>
                      <input
                        onChange={(e) => this.handleLocation(e)}
                        name="location"
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Location ..."
                        required
                      />
                      <label
                        for="exampleFormControlInput1"
                        className="lbljoinus mt-3"
                      >
                        {" "}
                        Description{" "}
                      </label>{" "}
                      <input
                        onChange={(e) => this.handleDesc(e)}
                        name="owner"
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Description ..."
                        required
                      />
                      <label
                        for="exampleFormControlInput1"
                        className="lbljoinus mt-3"
                      >
                        {" "}
                        Owner{" "}
                      </label>{" "}
                      <input
                        onChange={(e) => this.handleOwner(e)}
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Created by ..."
                        required
                      />
                      <label
                        for="exampleFormControlInput1"
                        className="lbljoinus mt-3"
                      >
                        {" "}
                        Logo{" "}
                      </label>{" "}
                      <input
                        onChange={(e) => this.handleLogo(e)}
                        name="logo"
                        type="file"
                        className="form-control-file"
                        id="exampleFormControlInput1"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        onClick={(e) => this.handleCreate(e)}
                        type="button"
                        className=" btn-auth btn btn-warning mt-4"
                      >
                        {" "}
                        Create{" "}
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <Link to="/home" className="text-decoration-none">
                        {" "}
                        <span className="signuplink"> Back to home </span>
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
});
const mapDispatchToProps = { getDataAdmin };
export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurant);
