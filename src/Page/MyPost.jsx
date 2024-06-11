
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdDelete } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyPost = () => {
    useEffect(() => {
        document.title = 'My Post'
    }, [])
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch(`https://forum-server-self.vercel.app/post/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
            });
    }, [user]);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://forum-server-self.vercel.app/post/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your item has been deleted.",
                                    icon: "success"
                                });
                                const remaining = items.filter(i => i._id !== id);
                                setItems(remaining);
                            }
                        });
                }
            });
    };

    // Calculate the displayed items based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Number of votes</th>
                            <th>Comment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedItems.map((item, index) => (
                            <tr key={item._id} className="bg-base-200">
                                <th>{startIndex + index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.upVote + item.downVote}</td>
                                <td>
                                    <Link to={`/dashboard/allComments/${item._id}`}>
                                        <FaComment className="size-8" />
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)}>
                                        <MdDelete className="size-8" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination mt-4 flex justify-center items-center">
                <button
                    className="btn"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyPost;
