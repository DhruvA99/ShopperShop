import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import HomeComponent from "../../components/HomeComponent/HomeComponents";
import { connect } from "react-redux";
import Footer from "../../components/Footer/Footer";

class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar />
        <HomeComponent />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
