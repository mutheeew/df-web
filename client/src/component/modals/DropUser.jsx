import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user'
import {Dropdown} from "react-bootstrap";
import { CgProfile} from "react-icons/cg";
import { MdPayment, MdLogout } from "react-icons/md";
import Profile from '../../image/profile.jpg';

const DropUser = (props) => {
    const [userState, userDispatch] = useContext(UserContext);
    return (
        <Dropdown>
            <Dropdown.Toggle className="btn-dark" >
                <img src={Profile} className="rounded-50" style={{width:"45px", height:"45px", borderRadius:"100%"}} ></img> 
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark mt-4 ms-4">
                <Dropdown.Item className="d-flex align-items-center">
                <Link
                    to="/profile"
                    className="text-white fw-semibold text-decoration-none">
                    <CgProfile
                    color="red"
                    style={{ fontSize: "20px" }}
                    className="me-2"
                    />
                    Profile
                </Link>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-white fw-semibold fs-6 pb-2 border-bottom border-white">
                <Link
                    to="/payment"
                    className="text-white fw-semibold text-decoration-none">
                    <MdPayment
                    color="red"
                    style={{ fontSize: "20px" }}
                    className="me-2"
                    />
                    Pay
                </Link>
                </Dropdown.Item>
                <Dropdown.Item
                className="d-flex align-items-center gap-2 text-white fw-semibold"
                onClick={() => userDispatch({ type: 'LOGOUT' })}>
                <MdLogout color="red" style={{ fontSize: "20px" }} />
                Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropUser;