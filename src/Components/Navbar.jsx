



import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";




const Navbar = () => {
    // const [theme, setTheme] = useState('light')
    const [announcements, setAnnouncements] = useState([])
    // console.log(comments);

    useEffect(() => {
        fetch('http://localhost:5000/announcement')
            .then((res) => res.json())
            .then((data) => setAnnouncements(data));
    }, []);

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('logout successfully'))
            .catch(error => console.error(error))

    }
    // useEffect(() => {
    // localStorage.setItem('theme', theme)
    //     const localTheme = localStorage.getItem('theme')
    //     document.querySelector('html').setAttribute('data-theme', localTheme)
    // }, [theme])


    // const handleToggle = (e) => {
    //     if (e.target.checked) {
    //         setTheme('dark')
    //     }
    //     else {
    //         setTheme('light')
    //     }
    // }
    return (
        // <div>
        //     <div className="navbar bg-base-100   fixed z-10 bg-opacity-30 max-w-screen-xl">
        //         <div className="flex-1">
        //             <Link to={'/'} className="btn btn-ghost lg:text-xl text-3xl font-bold text-primary"><img src="https://demo.egenslab.com/html/docbase/assets/images/logo-2.png" alt="" /></Link>
        //         </div>
        //         {/* <div className="flex flex-row justify-end items-end gap-2">

        //         </div> */}
        //         <div className="flex gap-3">
        //             <ul className="flex flex-row lg:gap-4 gap-1">
        //                 <li>
        //                     <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Home</NavLink>
        //                 </li>

        //                 <li>
        //                     <NavLink to='/membership' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Membership</NavLink>

        //                 </li>
        //                 <li>
        //                     <NavLink to='/announcement' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'} >
        //                         <div className="indicator">
        //                             <span className="indicator-item badge badge-secondary">{announcements.length}</span>
        //                             <IoMdNotifications className="size-8 text-yellow-500" />
        //                         </div>
        //                     </NavLink>
        //                 </li>
        //                 {
        //                     !user && (
        //                         <li>
        //                             <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Join US</NavLink>
        //                         </li>
        //                     )
        //                 }
        //             </ul>
        //             <div className="flex-none z-10">
        //                 {
        //                     user && (
        //                         <div className='dropdown dropdown-end z-50'>
        //                             <div
        //                                 tabIndex={0}
        //                                 role='button'
        //                                 className='btn btn-ghost btn-circle avatar'
        //                             >
        //                                 <div title={user?.displayName} className='w-10 rounded-full'>
        //                                     <img
        //                                         referrerPolicy='no-referrer'
        //                                         alt='User Profile Photo'
        //                                         src={user?.photoURL}
        //                                     />
        //                                 </div>
        //                             </div>
        //                             <ul
        //                                 tabIndex={0}
        //                                 className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
        //                             >

        //                                 <li>
        //                                     <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>{user?.displayName}</NavLink>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink to='dashboard' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Dashboard</NavLink>
        //                                 </li>



        //                                 <li className='mt-2'>
        //                                     <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>

        //                                 </li>

        //                             </ul>

        //                         </div>
        //                     )
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to='/membership' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Membership</NavLink>

                        </li>
                        <li>
                            <NavLink to='/announcement' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'} >
                                <div className="indicator">
                                    <span className="indicator-item badge badge-secondary">{announcements.length}</span>
                                    <IoMdNotifications className="size-8 text-yellow-500" />
                                </div>
                            </NavLink>
                        </li>
                        {
                            !user && (
                                <li>
                                    <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Join US</NavLink>
                                </li>
                            )
                        }

                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost lg:text-xl text-3xl font-bold text-primary"><img src="https://demo.egenslab.com/html/docbase/assets/images/logo-2.png" alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to='/membership' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Membership</NavLink>

                    </li>
                    <li>
                        <NavLink to='/announcement' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'} >
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">{announcements.length}</span>
                                <IoMdNotifications className="size-8 text-yellow-500" />
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <ul>
                    {
                        !user && (
                            <li>
                                <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Join US</NavLink>
                            </li>
                        )
                    }
                </ul>
                <div className="flex-none z-10">
                    {
                        user && (
                            <div className='dropdown dropdown-end z-50'>
                                <div
                                    tabIndex={0}
                                    role='button'
                                    className='btn btn-ghost btn-circle avatar'
                                >
                                    <div title={user?.displayName} className='w-10 rounded-full'>
                                        <img
                                            referrerPolicy='no-referrer'
                                            alt='User Profile Photo'
                                            src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                                >

                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>{user?.displayName}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='dashboard' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Dashboard</NavLink>
                                    </li>



                                    <li className='mt-2'>
                                        <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>

                                    </li>

                                </ul>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;

