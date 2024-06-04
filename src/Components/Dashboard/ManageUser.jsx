import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaManatSign } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";

const ManageUser = () => {
    const [users, setUsers] = useState([])
    const [names, setNames] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const foodName = e.target.search.value.toLowerCase();
        const result = names.filter(food => food.name.toLowerCase() === foodName);
        setNames(result);
    }

    return (
        <div>
            <div className="flex justify-around items-center mb-8">
                <div>
                    <h1 className="text-center text-2xl font-bold mt-8 mb-7">Show All Users {users.length}</h1>

                </div>
                <div className="">
                    <form  onSubmit={handleSearch}>
                        <div className="join flex flex-row justify-center items-center mt-5">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item h-16 border-2 lg:w-96" placeholder="Search Your User Name...." />
                                </div>
                            </div>
                            <div className="indicator">
                                <button className="btn join-item h-16 bg-blue-500 w-16"><FaSearch className="size-6"></FaSearch></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Admin</th>
                                <th>Subscription Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><RiAdminFill className="size-8" /></td>
                                    <td>status</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default ManageUser;