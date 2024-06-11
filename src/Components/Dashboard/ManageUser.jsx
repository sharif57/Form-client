import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
    useEffect(() => {
        document.title = 'Manage User'
    }, [])
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    });
    

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value.toLowerCase();
        setSearchTerm(searchValue);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm) || user.email?.toLowerCase().includes(searchTerm)
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="lg:flex justify-around items-center mb-8">
                <div>
                    <h1 className="text-center text-2xl font-bold mt-8 mb-7">Show All Users {filteredUsers.length}</h1>
                </div>
                <div>
                    <form onSubmit={handleSearch}>
                        <div className="join flex flex-row justify-center items-center mt-5">
                            <div>
                                <input name="search" className="input input-bordered join-item h-16 border-2 lg:w-96" placeholder="Search Your Name and Email...." />
                            </div>
                            <div className="indicator">
                                <button type="submit" className="btn join-item h-16 bg-blue-500 w-16"><FaSearch className="size-6" /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
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
                        {currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{indexOfFirstUser + index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : (
                                        <button onClick={() => handleMakeAdmin(user)}>
                                            <RiAdminFill className="size-8" />
                                        </button>
                                    )}
                                </td>
                                <td className={`${user.status ? 'text-green-500' : 'text-red-500'} font-bold`}>
                                    {user.status || 'no payment'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-5">
                <nav>
                    <ul className="pagination flex">
                        <li className="page-item">
                            <button
                                onClick={prevPage}
                                className={`page-link btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'btn-active' : ''}`}>
                                <button onClick={() => setCurrentPage(i + 1)} className="page-link btn">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button
                                onClick={nextPage}
                                className={`page-link btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ManageUser;
