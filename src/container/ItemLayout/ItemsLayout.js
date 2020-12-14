import React from "react";
import classes from "./ItemsLayout.module.css";
import { connect } from "react-redux";
import { itemGetStarted } from "../../redux/actions/actionCreator";
import Loader from "../../components/Loader/Loader";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Link, withRouter } from "react-router-dom";

class ItemsLayout extends React.Component {
  onComponentClick = () => {};

  componentDidMount() {
    this.props.itemInitialize();
  }
  render() {
    let post = <Loader />;
    if (!this.props.loading) {
      post = Object.keys(this.props.data).map((key) => {
        return (
          <div
            data-aos="fade-up"
            className={classes.card}
            key={this.props.data[key].id}
          >
            <Link
              style={{ textDecoration: "none" }}
              to={{
                pathname: `/item/${this.props.data[key].id}`,
                state: this.props.data[key],
              }}
            >
              <CardComponent data={this.props.data[key]} />
            </Link>
          </div>
        );
      });
    }
    return <div className={classes.main}>{post}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.item.loading,
    data: state.item.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  itemInitialize: () => {
    dispatch(itemGetStarted());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemsLayout));
