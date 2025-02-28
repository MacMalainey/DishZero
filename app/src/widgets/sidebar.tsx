import { useContext } from "react";
import {slide as Menu} from "react-burger-menu";
import { Link } from "react-router-dom"; // TODO: convert <a> tags to <Link> components
import { FirebaseAuth, FirebaseContext, Role } from "../firebase";
import "../styles/sidebar.css"

export const Sidebar = () => {

    const fbContext = useContext(FirebaseContext);
    let showAdmin = false;
    let showVolunteer = false;
    if (fbContext?.role == Role.ADMIN) {
        showAdmin = true;
        showVolunteer = true;
    } else if (fbContext?.role == Role.VOLUNTEER) {
        showVolunteer = true
    }

    return (
        <Menu>
            <p
                className="memu-title"
                style={{
                textAlign: "left"
            }}>
                <img
                style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://image.shutterstock.com/image-vector/plate-vector-illustrationisolated-on-white-260nw-1815162875.jpg"></img>DishZero</p>
            <Link className="menu-item" to="/home">
                <p>MENU</p><img
                style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://cdn-icons-png.flaticon.com/512/25/25694.png"></img>
                Home
            </Link>
            {showAdmin && <Link className="menu-item" to="/admin/dashboard">
                <img
                  style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://cdn-icons-png.flaticon.com/512/76/76211.png"></img>
                Admin Dashboard
            </Link>}
            {showVolunteer && <Link className="menu-item" to="/volunteer/return">
                <img
                  style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://cdn-icons-png.flaticon.com/512/76/76211.png"></img>
                Return Dishes
            </Link>}
            <div style={{paddingTop: 280}}></div>
            <a
                className="menu-item"
                href="/dishes"
                style={{
            }}>
                <img
                    style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-clipboard-512.png"></img>
                How it works
            </a>
            <a className="menu-item" href="/dishes">
                <img
                style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://static.thenounproject.com/png/4653746-200.png"></img>
                Our impact
            </a>
            <button className="menu-item" onClick={() => {FirebaseAuth.signOut()}}>
                <img
                style={{paddingRight:20}}
                    width={20}
                    height={20}
                    src="https://www.iconpacks.net/icons/2/free-exit-logout-icon-2857-thumb.png"></img>
                Logout
            </button>
        </Menu>
    );
};
