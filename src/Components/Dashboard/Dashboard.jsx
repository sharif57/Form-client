

import { FaAd, FaCalendar, FaHome,  FaPhone, FaShoppingCart, FaSignOutAlt, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../hooks/UseAdmin";
// import UseCart from "../Hooks/UseCart";
// import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    // const [cart] = UseCart()

    const isAdmin = true;
    // const [isAdmin] = UseAdmin();
    console.log(isAdmin);

    return (
        <div className="flex ">
            <div className="w-64 min-h-screen bg-gray-400 pt-6">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>

                                <NavLink to={'/dashboard/adminProfile'}><FaHome></FaHome>Admin Profile</NavLink>
                            </li>
                            <li>

                                <NavLink to={'/dashboard/manageUsers'}><FaCalendar></FaCalendar>Manage Users</NavLink>
                            </li>
                            <li>

                                <NavLink to={'/dashboard/reported'}><FaShoppingCart></FaShoppingCart> Reported Comments </NavLink>
                            </li>
                            <li>

                                <NavLink to={'/dashboard/announcementPost'}><FaAd></FaAd> Announcement</NavLink>
                            </li>

                        </>

                            :

                            <>
                                <li>

                                    <NavLink to={'/dashboard/myProfile'}><FaHome></FaHome>My Profile</NavLink>
                                </li>
                                <li>

                                    <NavLink to={'/dashboard/addData'}><FaCalendar></FaCalendar>Add Post</NavLink>
                                </li>
                                <li>

                                    <NavLink to={'/dashboard/myPost'}><FaShoppingCart></FaShoppingCart> My Posts </NavLink>
                                </li>
                            </>
                    }

                    {/* shared nav links */}

                    <div className="divider">OR</div>
                    <li>

                        <NavLink to={'/'}><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>

                        <NavLink to={'/'}><FaSignOutAlt></FaSignOutAlt>Log Out</NavLink>
                    </li>
                    <li>

                        <NavLink to={'/order/contact'}><FaPhone></FaPhone>Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;