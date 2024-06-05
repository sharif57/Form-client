import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Comment = ({postId}) => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    // console.log(comments);

    useEffect(() => {
        fetch(`http://localhost:5000/comments/${postId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setComments(data);
            }) 
    }, [postId])

    
    return (
        <div>
            {
                comments.map(comment =><div className="flex w-1/2 mx-auto shadow-lg gap-4 mb-4 mt-8" key={comment._id}>
                    <div className=" size-14">
                        <img src={comment.image} alt="" />
                    </div>
                    <div className="">
                        <p>{comment.name}</p>
                        <h1 className="text-xl font-bold">{comment.comment}</h1>
                    </div>
                    <Link to={`/dashboard/allComments/${comment.postId}`} className="btn btn-outline">details</Link>
                </div>)
            }
        </div>
    );
};

export default Comment;