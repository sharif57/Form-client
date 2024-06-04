
// const Navbar = () => {
//     return (
//         <div>
//             <div className="navbar bg-blue-200 ">
//                 <div className="flex-1">
//                     {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
//                     {/* <img className="bg-slate-700 size-2/12" src="https://themes.thememasters.club/tessera/wp-content/uploads/sites/19/2019/03/logo.png" alt="" /> */}
//                     <img className=" size-2/12" src="https://demo.egenslab.com/html/docbase/assets/images/logo-2.png" alt="" />
//                 </div>
//                 <div className="flex-none gap-2">
//                     <div className="form-control">
//                         {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
//                         <ul>
//                             <li><a href="">Home</a></li>
//                             <li><a href="#" className="text-white"><i className="notification-icon">🔔</i></a></li>
//                             <li><a href="">Join US</a></li>
//                         </ul>
//                     </div>
//                     <div className="dropdown dropdown-end">
//                         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                             <div className="w-10 rounded-full">
//                                 <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                             </div>
//                         </div>
//                         <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//                             <li>
//                                 <a className="justify-between">
//                                     Profile
//                                     <span className="badge">New</span>
//                                 </a>
//                             </li>
//                             <li><a>Settings</a></li>
//                             <li><a>Logout</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;



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
        <div>
            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <Link to={'/'} className="btn btn-ghost lg:text-xl text-3xl font-bold text-primary"><img src="https://demo.egenslab.com/html/docbase/assets/images/logo-2.png" alt="" /></Link>
                </div>
                {/* <div className="flex flex-row justify-end items-end gap-2">
                
                </div> */}
                <div className="flex gap-3">
                    <ul className="flex flex-row lg:gap-4 gap-1">
                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to='/allVolunteer' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>Membership</NavLink>

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

                                        {/* <label className=" cursor-pointer grid place-items-center ">
                                            <input onChange={handleToggle} type="checkbox" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                        </label> */}

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
        </div>
    );
};

export default Navbar;