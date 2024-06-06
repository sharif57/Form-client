

import { FaCalendar, FaHome,   FaShoppingCart, FaSignOutAlt, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../../hooks/UseAdmin";
import { BiUser } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { BsPostcard } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";


const Dashboard = () => {
    const {  logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('logout successfully'))
            .catch(error => console.error(error))

    }

    // const isAdmin = true;
    const [isAdmin] = UseAdmin();
    console.log(isAdmin);

    return (
        <div className="flex ">
            <div className="w-64 min-h-screen bg-gray-400 pt-6">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>

                                <NavLink to={'/dashboard/adminProfile'}><FaHome className="size-8 "></FaHome>Admin Profile</NavLink>
                            </li>
                            <li>

                                <NavLink to={'/dashboard/manageUsers'}><BiUser className="size-8 "></BiUser>Manage Users</NavLink>
                            </li>
                            <li>

                                <NavLink to={'/dashboard/reported'}><GoReport className="size-8 "></GoReport> Reported Comments </NavLink>
                            </li>
                            <li>

                                <NavLink to={'/dashboard/announcementPost'}><IoMdNotifications className="size-8 text-yellow-500" /> Announcement</NavLink>
                            </li>

                        </>

                            :

                            <>
                                <li>

                                    <NavLink to={'/dashboard/myProfile'}><CgProfile className="size-8"></CgProfile>My Profile</NavLink>
                                </li>
                                <li>

                                    <NavLink to={'/dashboard/addData'}> <MdPostAdd className="size-8"></MdPostAdd>Add Post</NavLink>
                                </li>
                                <li>

                                    <NavLink to={'/dashboard/myPost'}><BsPostcard className="size-8"></BsPostcard> My Posts </NavLink>
                                </li>
                            </>
                    }

                    {/* shared nav links */}

                    <div className="divider">OR</div>
                    <li>

                        <NavLink to={'/'}><FaHome className="size-8 "></FaHome>Home</NavLink>
                    </li>
                    <li>

                        <NavLink to={'/'}><FaSignOutAlt className="size-8 "></FaSignOutAlt> <button onClick={handleLogOut}>Log Out</button></NavLink>
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