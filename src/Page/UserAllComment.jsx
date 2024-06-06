// import { useContext, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// const UserAllComment = () => {
//     const {user} = useContext(AuthContext)
//     const items = useLoaderData()
//     // console.log(items.length);

//     const [feedback, setFeedback] = useState('');
//     const [isReported, setIsReported] = useState(false);

//     const handleFeedbackChange = (event) => {
//         setFeedback(event.target.value);
//     };

//     const handleReportClick = () => {
//         setIsReported(true);
//     };

//     const handleReport = (e) => {
//         e.preventDefault();
//         const form = e.target;
//         const select = form.select.value;
//         const email = user.email;

//         const ReportPost = {select, email}
//         console.log(ReportPost);
//     }

//     return (
//         <div>
//             <h1>hello bangladesh {items.length}</h1>

//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Email</th>
//                             <th>Comment</th>
//                             <th>feedback</th>
//                             <th>Report</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             items.map((item, index) => <tr key={item._id}>
//                                 <th>{index + 1}</th>
//                                 <th>{item.email}</th>
//                                 <td>{item.comment.slice(0, 20)}....</td>

//                                 <td>
//                                     <form onSubmit={handleReport}>
//                                         <td >
//                                             <select 
//                                             name="select"
//                                                 value={feedback}
//                                                 onChange={handleFeedbackChange}
//                                                 disabled={isReported}
//                                             >
//                                                 <option value="">Select feedback</option>
//                                                 <option value="spam">Good</option>
//                                                 <option value="offensive">Offensive Content</option>
//                                                 <option value="irrelevant">Irrelevant</option>
//                                             </select>
//                                         </td>
//                                         <td>
//                                             <button
//                                                 onClick={handleReportClick}
//                                                 disabled={!feedback || isReported}
//                                             >
//                                                 {isReported ? 'Reported' : 'Report'}
//                                             </button>
//                                         </td>
//                                     </form>
//                                 </td>
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserAllComment;

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

        fetch('http://localhost:5000/reported', {
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
                            {/* <th>Report</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.comment.slice(0, 20)}....</td>
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
        </div>
    );
};

export default UserAllComment;
