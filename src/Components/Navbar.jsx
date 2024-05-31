
const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-blue-200 ">
                <div className="flex-1">
                    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                    {/* <img className="bg-slate-700 size-2/12" src="https://themes.thememasters.club/tessera/wp-content/uploads/sites/19/2019/03/logo.png" alt="" /> */}
                    <img className=" size-2/12" src="https://demo.egenslab.com/html/docbase/assets/images/logo-2.png" alt="" />
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="#" className="text-white"><i className="notification-icon">🔔</i></a></li>
                            <li><a href="">Join US</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;