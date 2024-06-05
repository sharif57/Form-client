import {  useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
    // const { user } = useContext(AuthContext)
    // const [users, setUsers] = useState([])
    // const [names, setNames] = useState([]);
    // const [name, setName] = useState([]);
    const axiosSecure = useAxiosSecure()
    // useEffect(() => {
    //     fetch('http://localhost:5000/users')
    //         .then((res) => res.json())
    //         .then((data) => setUsers(data));
    // }, []);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     const userName = e.target.search.value.toLowerCase();
    //     const result = name.filter(food => food.name.toLowerCase() === userName);
    //     setUsers(result);
    //     console.log(userName);
    // }

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className="flex justify-around items-center mb-8">
                <div>
                    <h1 className="text-center text-2xl font-bold mt-8 mb-7">Show All Users {users.length}</h1>

                </div>
                <div className="">
                    <form  >
                        <div className="join flex flex-row justify-center items-center mt-5">
                            <div>
                                <div>
                                    <input name="search" className="input input-bordered join-item h-16 border-2 lg:w-96" placeholder="Search Your User Name...." />
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
                                    <td >
                                       {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)}><RiAdminFill className="size-8" />
                                        </button>}
                                    </td>
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