import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdDelete } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyPost = () => {
    const { user } = useContext(AuthContext)
    const [items, setItems] = useState([])

    const [detele, setDelete] = useState([])

    console.log(items.length);

    useEffect(() => {
        fetch(`http://localhost:5000/post/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
    }, [user])

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
                    fetch(`http://localhost:5000/post/${id}`, {
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
                                console.log('delete');
                                const remaining = items.filter(i => i._id !== id);
                                setDelete(remaining)
                                setItems(remaining)

                            }
                        })
                }
            })

    }

    return (
        <div>
            {/* <h1>Y</h1> */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
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
                        {
                            items.map((item, index) => <tr key={item._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{item.title}</td>
                                <td>Quality Control Specialist</td>
                                <td><Link to={`/dashboard/allComments/${item.postId}`}><FaComment className="size-8"></FaComment></Link></td>
                                <button onClick={() => handleDelete(item._id)}><MdDelete className="size-8" /></button>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPost;