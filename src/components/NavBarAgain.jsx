import React from "react";
import PropTypes from "prop-types";
import { useNavigate,useLocation,useSearchParams } from "react-router-dom";
import { NavBar } from "antd-mobile";

const NavBarAgain = function NavBarAgain(props) {
  let { title } = props;
  const navigate= useNavigate(),
  location = useLocation(),
  [usp] = useSearchParams();

  const handleBack = () => {
    //逻辑处理
    //登陆页&to为detail
    let to = usp.get('to');
    if(location.pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
      navigate(to,{replace:true})
      return;
    }
    navigate(-1)
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
