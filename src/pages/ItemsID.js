import React from "react";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import { TabContent } from "reactstrap";
import Navbarsubuser from "../components/Navbarsubuser";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { getDataItemsID } from "../redux/action/items";
import { connect } from "react-redux";

class ItemsID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      total_item: "",
      show: false,
    };
  }

  componentDidMount() {
    this.props.getDataItemsID(this.props.match.params.id);
  }

  handleTextComment = (e) => {
    console.log(e.target.value);
    this.setState({
      review: e.target.value,
    });
  };

  handleComment = async (e) => {
    const data = {
      review: this.state.review,
    };
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (this.state.review === "") {
      alerts.fire({ icon: "error", text: "value still empty" });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/review/${this.props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + this.props.token,
            },
          }
        )
        .then((res) => {
          if (res.data.success !== false) {
            try {
              alerts.fire({ icon: "success", text: "Comment successful" });
              this.props.getDataItemsID(this.props.match.params.id);
            } catch (error) {
              console.log(error.response);
              alerts.fire({ icon: "error", text: "Failed" });
            }
          } else {
            alerts.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed post comment",
            });
          }
        })
        .catch((err) => {
          console.log({ err });
          alerts.fire({ icon: "error", text: `failed give comment` });
        });
    }
  };

  ////Add To Cart
  handleValue = (e) => {
    console.log(e.target.value);
    this.setState({
      total_item: e.target.value,
    });
  };

  handleAddToCart = async (e) => {
    const data = {
      total_item: this.state.total_item,
    };
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });

    if (this.state.total_item === "") {
      alerts.fire({ icon: "error", text: "value still empty" });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/carts/${this.props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + this.props.token,
            },
          }
        )
        .then((res) => {
          if (res.data.success !== false) {
            try {
              alerts.fire({ icon: "success", text: "Save items successfully" });
            } catch (error) {
              console.log(error.response);
              alerts.fire({ icon: "error", text: `${error.response.msg}` });
            }
          } else {
            alerts.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to save items",
            });
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log({ err });
          alerts.fire({ icon: "error", text: `error` });
        });
    }
  };

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <Navbarsubuser />
        <div className="container">
          <h4 className=" bold mt-5 mb-5 text-center">Items</h4>
          {this.props.data_item && (
            <div className="card-body-link">
              <div className="card mb-5 card-profil">
                <div className="row no-gutters">
                  <div className="row no-gutters">
                    <img
                      src={
                        process.env.REACT_APP_API_URL +
                        this.props.data_item.images
                      }
                      className="card-img card-img-detail"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="cart-titles">
                        {" "}
                        {this.props.data_item.name_restaurant}{" "}
                      </h5>{" "}
                      <hr />
                      <h6 className="cart-resto">
                        {" "}
                        {this.props.data_item.name_item} -{" "}
                        {this.props.data_item.location}{" "}
                      </h6>
                      <p className="text-muted">
                        {" "}
                        {this.props.data_item.desciption}{" "}
                      </p>{" "}
                      <h6 className="cart-price">
                        {" "}
                        Rp. {this.props.data_item.price}{" "}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* {console.log('data', this.props.data_item)} */}
          <button
            onClick={() => {
              this.handleModal();
            }}
            type="button"
            className="btn btn-warning plus marginplus"
          >
            Cart{" "}
          </button>
        </div>
        <div className="container mt-5">
          <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
            <TabList>
              <Tab className="btn btn-danger mr-2"> Hide </Tab>
              <Tab className="btn btn-danger"> See Review </Tab>
            </TabList>
            <hr />
            <TabContent>
              <TabPanel></TabPanel>{" "}
            </TabContent>
            <TabPanel>
              {" "}
              {this.props.data_review &&
                this.props.data_review.map((val, idx) => (
                  <Reviews
                    name={val.name_user}
                    date_created={val.date_created}
                    review={val.review}
                    date={val.date_created}
                    images={process.env.REACT_APP_API_URL + val.images}
                  />
                ))}
              <div className="row justify-content-center">
                <div className="text-center">
                  {" "}
                  <textarea
                    onChange={(e) => this.handleTextComment(e)}
                    name="comment"
                    className="form-comment form-control pl-3"
                    rows="2"
                    placeholder="comment ..."
                  >
                    {" "}
                  </textarea>
                </div>
              </div>
              <div className="col-lg-5 justify-content-center text-center mt-3">
                <button
                  type="button"
                  onClick={(e) => this.handleComment(e)}
                  className="btn btn-danger"
                >
                  Comment
                </button>{" "}
              </div>
            </TabPanel>
          </Tabs>
        </div>
        {/* Add Items Hide*/}
        {this.props.data_item && (
          <Modal
            centered
            show={this.state.show}
            onHide={() => this.handleModal()}
          >
            <Modal.Header closeButton>
              {" "}
              <span className="bold text-muted">
                {" "}
                {this.props.data_item.name_restaurant}{" "}
              </span>
            </Modal.Header>
            <Modal.Body className="text-center">
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      src={
                        process.env.REACT_APP_API_URL +
                        this.props.data_item.images
                      }
                      className="imgshapes"
                    />
                  </div>
                  <div class="col-md-8 text-left">
                    <div class="card-body card-bodies">
                      <h6 className="cart-prices">
                        {" "}
                        Rp. {this.props.data_item.price} <span> /item</span>
                      </h6>
                      <input
                        type="number"
                        onChange={(e) => this.handleValue(e)}
                        name="value"
                        className="cartvalue form-control"
                        min="1"
                        placeholder="add items..."
                      />
                      <div className="valuealign">
                        {" "}
                        <button
                          onClick={(e) => this.handleAddToCart(e)}
                          type="button"
                          className="btn-carts btn-auth btn btn-warning mt-3"
                        >
                          {" "}
                          Save{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data_item: state.items.data_item,
  data_review: state.items.data_review,
  token: state.auth.token,
});

const mapDispatchToProps = { getDataItemsID };

export default connect(mapStateToProps, mapDispatchToProps)(ItemsID);
