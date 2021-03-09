import React from "react";
import classes from "./ItemsLayout.module.css";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Link, withRouter } from "react-router-dom";

class ItemsLayout extends React.Component {
  // onComponentClick = () => {};

  // componentDidMount() {
  //   this.props.itemInitialize();
  // }
  render() {
    let post = <Loader />;
    let newData = {};

    if (!this.props.loading) {
      if (this.props.data && Object.keys(this.props.data).length !== 0) {
        newData = this.props.data;
        post = Object.keys(newData).map((key) => {
          return (
            <div
              data-aos="fade-up"
              className={classes.card}
              key={newData[key].id}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: `/item/${newData[key].id}`,
                  state: { data: newData[key], productName: key },
                }}
              >
                <CardComponent data={newData[key]} />
              </Link>
            </div>
          );
        });
      }
      if (this.props.data && Object.keys(this.props.data).length === 0) {
        post = (
          <div className={classes.page}>
            {" "}
            <h2>
              No items found according to your search.Try different words!
            </h2>
          </div>
        );
      }

      if (!this.props.data) {
        newData = this.props.data2;
        post = Object.keys(newData).map((key) => {
          return (
            <div
              data-aos="fade-up"
              className={classes.card}
              key={newData[key].id}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: `/item/${newData[key].id}`,
                  state: { data: newData[key], productName: key },
                }}
              >
                <CardComponent data={newData[key]} />
              </Link>
            </div>
          );
        });
      }
    }

    return <div className={classes.main}>{post}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.item.loading,
    data2: state.item.data,
  };
};

export default connect(mapStateToProps, null)(withRouter(ItemsLayout));
