import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";

const ReportedComment = () => {
    const axiosSecure = useAxiosSecure()

    const { data: reported = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported')
            return res.data
        }
    })

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
                            reported.map((report , index) =>  <tr key={report._id}>
                                <th>{index + 1}</th>
                                <td>{report.email}</td>
                                <td>{report.feedback}</td>
                                <td><FaBan className="size-6 text-red-500"></FaBan></td>
                            </tr>)
                        }
                       
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedComment;