import React from "react";
import { Media } from "reactstrap";
import Trash from "../img/trash.png";
import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { getItemRestaurantID } from "../redux/action/restaurants";

class ReviewItemResto extends React.Component {
  componentDidMount() {
    this.props.getItemRestaurantID(this.props.id, this.props.token);
  }

  handleDelete = async (id) => {
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/items-review/${id}`, {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success !== false) {
          try {
            alerts.fire({ icon: "success", text: "Delete successful" });
            this.props.getItemRestaurantID(this.props.id);
            console.log(this.props.data_review);
          } catch (error) {
            console.log(error.response);
            alerts.fire({ icon: "error", text: `${error.response.msg}` });
          }
        } else {
          alerts.fire({ icon: "error", title: "Oops", text: "Delete failed" });
        }
      })
      .catch((err) => {
        console.log({ err });
        alerts.fire({ icon: "error", text: `error` });
      });
  };

  render() {
    return (
      <div>
        <div className="marginreview">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="reviews-box">
                  <Media className="text-left">
                    <Media left>
                      <img src={this.props.images} className="img-reviews" />
                      <div className="trash">
                        {" "}
                        <img
                          src={Trash}
                          onClick={(e) => this.handleDelete(this.props.id)}
                          className="trash"
                        />
                      </div>
                    </Media>
                    <Media body>
                      <Media heading className="reviewer">
                        {" "}
                        {this.props.name}
                      </Media>
                      <hr />
                      <p className="text-muted datereview">
                        {" "}
                        Date Creted: {this.props.date_created}{" "}
                      </p>{" "}
                      <span className="reviewerComn">
                        {" "}
                        {this.props.review}{" "}
                      </span>
                    </Media>
                  </Media>
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
  data_review: state.restaurants.data_review,
});
const mapDispatchToProps = { getItemRestaurantID };
export default connect(mapStateToProps, mapDispatchToProps)(ReviewItemResto);
