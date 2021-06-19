import React from "react";
import { Link } from "react-router-dom";

function Header(props) {

  return (
    <header className='header'>
      <div className='logo' />
      <div className='header__navigation'>
      <p className="header__email">{props.userEmail}hello</p>
			<Link className="header__link header__link_loggedin" to={props.link} onClick={props.onClick}>Log in</Link>
      </div>
    </header>
  );
}

export default Header;
