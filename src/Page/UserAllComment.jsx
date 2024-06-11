

import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const UserAllComment = () => {
    const { user } = useContext(AuthContext);
    const items = useLoaderData();

    const [reportStates, setReportStates] = useState(items.map(() => ({
        feedback: '',
        isReported: false,
    })));
    const [selectedComment, setSelectedComment] = useState(null);

    const handleFeedbackChange = (index, event) => {
        const newReportStates = [...reportStates];
        newReportStates[index].feedback = event.target.value;
        setReportStates(newReportStates);
    };

    const handleReport = (index, e) => {
        e.preventDefault();
        const { feedback } = reportStates[index];
        const email = user.email;
        const ReportPost = { feedback, email };
        console.log(ReportPost);

        fetch('https://forum-server-self.vercel.app/reported', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(ReportPost)
        })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Reported Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })

        const newReportStates = [...reportStates];
        newReportStates[index].isReported = true;
        setReportStates(newReportStates);
    };

    const openModal = (comment) => {
        setSelectedComment(comment);
    };

    const closeModal = () => {
        setSelectedComment(null);
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.comment.slice(0, 20)}....
                                    <button className="btn" onClick={() => openModal(item.comment)}>Read More</button>
                                </td>
                                <td>
                                    <form onSubmit={(e) => handleReport(index, e)}>
                                        <td>
                                            <select
                                                name="select"
                                                value={reportStates[index].feedback}
                                                onChange={(e) => handleFeedbackChange(index, e)}
                                                disabled={reportStates[index].isReported}
                                            >
                                                <option value="">Select feedback</option>
                                                <option value="good">Good</option>
                                                <option value="offensive">Offensive Content</option>
                                                <option value="irrelevant">Irrelevant</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-error"
                                                type="submit"
                                                disabled={!reportStates[index].feedback || reportStates[index].isReported}
                                            >
                                                {reportStates[index].isReported ? 'Reported' : 'Report'}
                                            </button>
                                        </td>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedComment && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <p className="py-4 font-bold text-lg">{selectedComment}</p>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default UserAllComment;
