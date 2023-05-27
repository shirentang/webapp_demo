import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "antd-mobile";

const NavBarAgain = function NavBarAgain(props) {
  let { title } = props;
  const handleBack = () => {
    //逻辑处理
  };

  return <NavBar onBack={handleBack}>{title}</NavBar>;
};

NavBarAgain.defaultProps = {
  title: "个人中心",
};

NavBarAgain.propTypes = {
  title: PropTypes.string,
};

export default NavBarAgain;
