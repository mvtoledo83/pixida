import React from "react";
import Search from "./components/Search";
import Logo from "./components/Logo";
import "./styles.scss";

const Header = () => {
  return (
    <header id="artapi-layout-header" className="artapi-layout-header">
      <Logo />
      <Search />
    </header>
  );
};

export default Header;
