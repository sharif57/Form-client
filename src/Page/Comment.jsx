import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Comment = () => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    console.log(comments);

    useEffect(() => {
        fetch(`http://localhost:5000/comment/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
            })
    }, [user])
    return (
        <div>
            {
                comments.map(comment =><div className="flex w-1/2 mx-auto shadow-lg gap-4 mb-4 mt-8" key={comment._id}>
                    <div className=" size-14">
                        <img src={user?.photoURL} alt="" />
                    </div>
                    <div className="">
                        <p>{user?.displayName}</p>
                        <h1 className="text-xl font-bold">{comment.comment}</h1>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Comment;