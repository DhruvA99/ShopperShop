import Loader from "components/Loader/Loader";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Advertisment from "../../container/Advertisement/Advertisement";
import ItemLayout from "../../container/ItemLayout/ItemsLayout";
import { itemGetStarted } from "../../redux/actions/actionCreator";
import { adGetStarted } from "../../redux/actions/actionCreator";
import classes from "./HomeComponent.module.css";

const HomeComponent = (props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(props.items);

  useEffect(() => {
    props.itemInitialize();
    props.adGetStarted();
  }, []);

  const onSearchHandler = () => {
    let updatedData = {};
    if (search === "") {
      updatedData = props.items;
    } else {
      console.log(props.items);
      let searchParam = search.toLocaleLowerCase();
      for (let key in props.items) {
        if (props.items[key].name.toLowerCase().includes(searchParam)) {
          updatedData = { ...updatedData, [key]: props.items[key] };
        }
      }
    }

    console.log(updatedData);
    setData({ ...updatedData });
  };
  let post = <Loader />;
  if (!props.loading) {
    post = (
      <>
        <div>
          <Advertisment />
          <hr />
          <div className={classes.searchBar}>
            <input
              className={classes.input}
              type="text"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={classes.button} onClick={onSearchHandler}>
              Search
            </button>
          </div>
          <hr />
          <ItemLayout data={data} />
        </div>
      </>
    );
  }
  return <div>{post}</div>;
};

const mapStateToProps = (state) => ({
  items: state.item.data,
  loading: state.item.loading,
});

const mapDispatchToProps = (dispatch) => ({
  itemInitialize: () => {
    dispatch(itemGetStarted());
  },
  adGetStarted: () => {
    dispatch(adGetStarted());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
