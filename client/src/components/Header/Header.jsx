import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import useAuthCheck from '../../hooks/useAuthCheck';
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";

const Header = () => {

  const [menuOpened, setMenuOpened] = useState(false);
  const [addPropertyModalOpened, setAddPropertyModalOpened] = useState(false);

  const headerColor = useHeaderColor();

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck()

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setAddPropertyModalOpened(true);
    }
  }

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="./logo.png" alt="logo" width={120} />
        </Link>
        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:zainkeepscode@gmail.com">Contact</a>

            {/** Add a proerty **/}
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={addPropertyModalOpened} setOpened={setAddPropertyModalOpened} />

            {/* Login button */}
            {
              !isAuthenticated ?

                < button className="button" onClick={loginWithRedirect}>
                  Login
                </button> :

                <ProfileMenu user={user} logout={logout} />
            }
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div >
    </section >
  );
};

export default Header;
