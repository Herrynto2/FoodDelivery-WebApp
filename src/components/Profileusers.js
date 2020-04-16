import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getDataUser } from "../redux/action/users";
import { connect } from "react-redux";

class Profileusers extends React.Component {
  componentDidMount() {
    this.props.getDataUser();
  }

  render() {
    return (
      <div>
        <div className="container">
          <Link to="/userprofile" className="card-body-link">
            <div className="card mb-3 card-profile card-body-hover">
              <div className="row no-gutters">
                <div className="row no-gutters">
                  <div className="img-profilesize">
                    {" "}
                    <img
                      src={
                        process.env.REACT_APP_API_URL +
                          this.props.data_user.images || null
                      }
                      className="card-img card-img-profile"
                      alt=""
                    />{" "}
                  </div>
                </div>{" "}
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      {this.props.data_user.name_user}{" "}
                    </h5>{" "}
                    <hr />
                    <p className="card-text">
                      {" "}
                      <small className="text-muted">
                        {" "}
                        {this.props.data_updated.updated_at}{" "}
                      </small>
                    </p>
                    <p className="card-text text-muted mt-5">
                      {" "}
                      {this.props.data_user.address}{" "}
                    </p>{" "}
                    <h5 className="card-text text-muted">
                      {" "}
                      {this.props.data_user.work}{" "}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data_user: state.auth.data_user,
  data_updated: state.auth.data_updated,
});
const mapDispatchToProps = { getDataUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profileusers);
