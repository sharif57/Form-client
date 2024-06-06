import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";

const ReportedComment = () => {
    const axiosSecure = useAxiosSecure()

    const { data: reported = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported')
            return res.data
        }
    })

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
                    fetch(`http://localhost:5000/reported/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "user commit deleted deleted.",
                                    icon: "success"
                                });
                                console.log('delete');
                                // const remaining = items.filter(i => i._id !== id);
                                // setDelete(remaining)
                                // setItems(remaining)

                            }
                        })
                }
            })

    }

    return (
        <div>
            <div>
                <h1 className="text-center text-3xl font-bold pt-11">Reported Activities/Comments</h1>
                <div className="divider"></div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Feedback</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reported.map((report, index) => <tr key={report._id}>
                                <th>{index + 1}</th>
                                <td>{report.email}</td>
                                <td>{report.feedback}</td>
                                <td > <button onClick={() => handleDelete(report._id)}><FaBan className="size-6 text-red-500"></FaBan></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedComment;