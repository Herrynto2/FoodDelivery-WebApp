import React from "react";
import { Link } from "react-router-dom";
import { getDataAdmin } from "../redux/action/users";
import { connect } from "react-redux";

class Profilerestos extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: {},
      isAvailable: false,
    };
  }
  componentDidMount() {
    console.log("data", this.props.data_admin);
    this.props.getDataAdmin(this.props.token);
    if (this.props.data_admin) {
      this.setState({
        isAvailable: true,
      });
    } else {
      this.setState({
        isAvailable: false,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.isAvailable === true ? (
            <Link to="/restaurantprofile" className="card-body-link">
              <div className="card mb-5 mt-5 card-body-hover">
                <div className="row no-gutters">
                  <div className="row no-gutters">
                    <img
                      src={
                        process.env.REACT_APP_API_URL +
                          this.props.data_admin.logo || null
                      }
                      className="card-img card-img-profile"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body ">
                      <h5 className="card-title">
                        {this.props.data_admin.name_restaurant
                          ? this.props.data_admin.name_restaurant
                          : ""}
                      </h5>
                      <hr />
                      <p className="card-text">
                        {" "}
                        <small className="text-muted">
                          {" "}
                          Last updated {this.props.data_admin.date_updated}{" "}
                        </small>
                      </p>
                      <p className="card-text text-muted mb-5">
                        {" "}
                        {this.props.data_admin.description}{" "}
                      </p>{" "}
                      <h5 className="card-text text-muted">
                        {" "}
                        {this.props.data_admin.location}{" "}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data_admin: state.auth.data_admin,
  token: state.auth.token,
});
const mapDispatchToProps = { getDataAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(Profilerestos);
