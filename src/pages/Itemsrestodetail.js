import React from "react";
import Navbarsubuser from "../components/Navbarsubuser";
import axios from "axios";
import { Modal } from "react-bootstrap";
import ReviewItemResto from "../components/ReviewItemResto";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { getItemRestaurantID } from "../redux/action/restaurants";

class itemsrestoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data_items: null,
      name_item: "",
      category: "",
      price: "",
      description: "",
      images: null,
      total_item: "",
      // review: [],
      show: false,
    };
  }
  handleName = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name_item]: e.target.value,
    });
  };
  handleCategory = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.category]: e.target.value,
    });
  };
  handlePrice = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.price]: e.target.value,
    });
  };
  handleDescription = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.description]: e.target.value,
    });
  };
  handleImages = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      images: e.target.files[0],
    });
  };
  handleValue = (e) => {
    console.log(e.target.value);
    this.setState({
      total_item: e.target.value,
    });
  };

  componentDidMount() {
    this.props.getItemRestaurantID(
      this.props.match.params.id,
      this.props.token
    );
  }
  // async getDataItems(id) {
  //     await axios.get(`${process.env.REACT_APP_API_URL }/restaurant-items/${id}`, { headers: { Authorization: 'Bearer ' + this.props.token } })
  //         .then(res => {
  //             console.log(res.data.data)
  //             let dataArr = res.data.data[0]
  //             let dataArr2 = res.data.review
  //             console.log(dataArr.name_item)
  //             this.setState({
  //                 name_item:dataArr.name_item,
  //                 images: dataArr.images,
  //                 description: dataArr.description,
  //                 price:dataArr.price,
  //                 name_restaurant: dataArr.name_restaurant,
  //                 location: dataArr.location,
  //                 category: dataArr.category,
  //                 review: dataArr2
  //             })
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         })
  // }

  //Edit Items
  handleEdit = (e) => {
    console.log(this.state);
    const data = new FormData();
    data.append("name_item", this.state.name_item);
    data.append("category", this.state.category);
    data.append("price", this.state.price);
    data.append("description", this.state.description);
    data.append("images", this.state.images);
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (
      this.state.name_item === "" ||
      this.state.category === "" ||
      this.state.price === "" ||
      this.state.description === ""
    ) {
      alerts.fire({ icon: "error", text: "text still empty" });
    } else {
      // console.log(data) // to get data fotm username & password
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/items/${this.props.match.params.id}`,
          data,
          { headers: { Authorization: "Bearer " + this.props.token } }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success !== false) {
            try {
              alerts.fire({
                icon: "success",
                text: "Item updated successfully",
              });
              this.getDataItems(this.props.match.params.id);
            } catch (error) {
              console.log(error.response);
              alerts.fire({ icon: "error", text: `error` });
            }
          } else {
            alerts.fire({
              icon: "error",
              title: "Oops",
              text: "Edit items failed",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alerts.fire({ icon: "error", text: `error` });
        });
    }
  };

  //Add total Items
  handleAdd = async (e) => {
    const data = {
      total_item: this.state.total_item,
    };
    const alerts = Swal.mixin({
      customClass: { confirmButton: "btn btn-warning" },
    });
    if (this.state.totaL_item === "") {
      alerts.fire({ icon: "error", text: "Value must be minimal 1" });
    } else {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/items/total/${this.props.match.params.id}`,
          { total_item: `${this.state.total_item}` },
          {
            headers: {
              Authorization: "Bearer " + this.props.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.success !== false) {
            try {
              alerts.fire({
                icon: "success",
                text: "Successfully added stock items",
              });
            } catch (error) {
              console.log(error.response);
              alerts.fire({ icon: "error", text: `${error.response.msg}` });
            }
          } else {
            alerts.fire({
              icon: "error",
              title: "Oops",
              text: "Add stock failed",
            });
          }
        })
        .catch((err) => {
          console.log({ err });
          alerts.fire({ icon: "error", text: `${err.response.msg}` });
        });
    }
  };

  // Modals
  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <Navbarsubuser />
        <div className="container marginitemresto">
          <button
            type="button"
            onClick={() => {
              this.handleModal();
            }}
            className="btn-auth btn btn-warning"
          >
            {" "}
            Review{" "}
          </button>{" "}
          {console.log(this.props.data_itemID)}{" "}
          {this.props.data_itemID && (
            <div className="row">
              <div className="col-lg-5">
                <div className="card-body-link">
                  <div className="cards card mb-5">
                    <div className="row no-gutters card-gutters">
                      <div className="row no-gutters">
                        <img
                          src={
                            process.env.REACT_APP_API_URL +
                            this.props.data_itemID.images
                          }
                          className="card-img card-img-detail"
                          alt="..."
                        />
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="card-body">
                          <h5 className="cart-titles">
                            {" "}
                            {this.props.data_itemID.name_item}{" "}
                          </h5>{" "}
                          <hr />
                          <h6 className="cart-resto">
                            {" "}
                            {this.props.data_itemID.name_restaurant} -{" "}
                            {this.props.data_itemID.location}{" "}
                          </h6>{" "}
                          <h6 className="cart-price">
                            {" "}
                            Rp. {this.props.data_itemID.price}{" "}
                          </h6>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-lg-7">
                <input
                  type="text"
                  onChange={(e) => this.handleName(e)}
                  name="name"
                  className="form-control mb-3"
                  defaultValue={this.props.data_itemID.name_item}
                  placeholder="items name"
                />
                <select
                  onChange={(e) => this.handleCategory(e)}
                  name="category"
                  className="form-control mb-3"
                >
                  <option> --Select category-- </option> <option> Food </option>{" "}
                  <option> Drink </option>{" "}
                </select>{" "}
                <input
                  type="text"
                  onChange={(e) => this.handlePrice(e)}
                  name="price"
                  className="form-control mb-3"
                  defaultValue={this.props.data_itemID.price}
                  placeholder="price"
                />
                <input
                  type="text"
                  onChange={(e) => this.handleDescription(e)}
                  name="description"
                  className="form-control mb-3"
                  defaultValue={this.props.data_itemID.description}
                  placeholder="description"
                />
                <input
                  onChange={(e) => this.handleImages(e)}
                  type="file"
                  className="form-control-file mb-3"
                />
                <button
                  onClick={(e) => this.handleEdit(e)}
                  className="btn-auth btn btn-warning block btn-edit-item-resto mb-5"
                >
                  {" "}
                  Edit{" "}
                </button>{" "}
                <input
                  type="number"
                  onChange={(e) => this.handleValue(e)}
                  name="value"
                  className="form-control mb-3"
                  min="1"
                  placeholder="add items..."
                />
                <button
                  onClick={(e) => this.handleAdd(e)}
                  type="button"
                  className="btn-auth btn btn-warning block btn-edit-item-resto"
                >
                  {" "}
                  Add{" "}
                </button>{" "}
              </div>{" "}
            </div>
          )}
        </div>{" "}
        {/* Review Items */}{" "}
        <Modal
          size="lg"
          centered
          show={this.state.show}
          onHide={() => this.handleModal()}
        >
          <Modal.Header closeButton>
            {" "}
            <span className="bold text-muted"> Reviews </span>
          </Modal.Header>
          <Modal.Body className="text-center">
            {" "}
            {this.props.data_review.map((val, idx) => (
              <ReviewItemResto
                name={val.name_user}
                review={val.review}
                date_created={val.date_created}
                id={val.id}
                date={val.date_created}
                images={process.env.REACT_APP_API_URL + val.images}
              />
            ))}{" "}
          </Modal.Body>{" "}
          <Modal.Footer></Modal.Footer>{" "}
        </Modal>{" "}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  data_review: state.restaurants.data_review,
  data_itemID: state.restaurants.data_itemID,
});
const mapDispatchToProps = { getItemRestaurantID };
export default connect(mapStateToProps, mapDispatchToProps)(itemsrestoDetail);
