import React from "react";
import Advertisment from "../../container/Advertisement/Advertisement";
import ItemLayout from "../../container/ItemLayout/ItemsLayout";

const homeComponent = (props) => {
  return (
    <div>
      <Advertisment />
      <hr />
      <ItemLayout />
    </div>
  );
};

export default homeComponent;
