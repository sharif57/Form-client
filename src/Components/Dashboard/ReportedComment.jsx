import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReportedComment = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    const { data: reported = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reported/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User comment deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reported.slice(indexOfFirstReport, indexOfLastReport);

    const totalPages = Math.ceil(reported.length / reportsPerPage);

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
            <div>
                <h1 className="text-center text-3xl font-bold pt-11">Reported Activities/Comments</h1>
                <div className="divider"></div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Feedback</th>
                            <th>Ban</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReports.map((report, index) => (
                            <tr key={report._id}>
                                <th>{indexOfFirstReport + index + 1}</th>
                                <td>{report.email}</td>
                                <td>{report.feedback}</td>
                                <td>
                                    <button onClick={() => handleDelete(report._id)}>
                                        <FaBan className="size-6 text-red-500" />
                                    </button>
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

export default ReportedComment;
