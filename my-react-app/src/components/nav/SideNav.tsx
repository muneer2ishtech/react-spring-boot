import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import BookIcon from "@mui/icons-material/Book";
import "./SideNav.css";

const SideNav: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className={`sidenav ${isNavOpen ? "" : "collapsed"}`}>
            <div className="toggle-btn" onClick={toggleNav}>
                {isNavOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </div>
            <Link to="/books">
                <BookIcon />
                {isNavOpen && <span>Books</span>}
            </Link>
        </div>
    );
};

export default SideNav;
