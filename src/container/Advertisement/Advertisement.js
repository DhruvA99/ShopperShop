import React from "react";
import classes from "./Advertisement.module.css";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { adGetStarted } from "../../redux/actions/actionCreator";
import AdvertisementImage from "../../util/images/advertismentImage.jpg";

class Advertisement extends React.Component {
  componentDidMount() {
    this.props.adGetStarted();
  }
  render() {
    let page = <Loader />;
    if (!this.props.loading) {
      page = (
        <div className={classes.main}>
          <p>{this.props.name}</p>
          <img className={classes.Image} src={AdvertisementImage} alt="img" />
        </div>
      );
    }
    return <div>{page}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ad.loading,
    data: state.ad.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  adGetStarted: () => {
    dispatch(adGetStarted());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertisement);
