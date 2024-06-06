// import { useContext } from "react";
// import { AiFillDislike, AiFillLike } from "react-icons/ai";
// import { FaLocationArrow, FaRegCommentDots, FaShare } from "react-icons/fa";
// import { useLoaderData, useParams } from "react-router-dom";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// import Swal from "sweetalert2";
// import Comment from "./Comment";

// const CardDetails = () => {
//     const params = useParams();
//     const { user } = useContext(AuthContext)



//     const handlePost = (e) => {
//         e.preventDefault()
//         const form = e.target;
//         const email = user.email;
//         const image = user.photoURL;
//         const name = user.displayName;
//         const comment = form.comment.value;

//         const newUser = { email, image, name,comment, postId: params.id }
//         console.log(newUser);

//         fetch('http://localhost:5000/comment', {
//             method: 'POST',
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })

//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 if (data.insertedId) {
//                     Swal.fire({
//                         title: 'Success!',
//                         text: 'User Added Successfully',
//                         icon: 'success',
//                         confirmButtonText: 'Cool'
//                     })
//                 }
//             })
//     }

//     const items = useLoaderData()
//     console.log('all data', items);


//     return (
//         <div className="pt-12">
//             <a
//                 href="#"
//                 className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
//             >
//                 <span
//                     className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
//                 ></span>

//                 <div className="sm:flex sm:justify-between sm:gap-4">
//                     <div>
//                         <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                             {items.title}
//                         </h3>

//                         <p className="mt-1 text-xs font-medium text-gray-600">{items.authorName}</p>
//                     </div>

//                     <div className="hidden sm:block sm:shrink-0">
//                         <img
//                             alt=""
//                             src={items.
//                                 authorImage}
//                             className="size-20 rounded-lg object-cover shadow-sm"
//                         />
//                     </div>
//                 </div>
//                 Tag: {items.tag}
//                 <div className="mt-4">
//                     <p className="text-pretty text-sm text-gray-500">
//                         {items.description}
//                     </p>
//                 </div>

//                 <dl className="mt-6 flex gap-4 sm:gap-6">
//                     <div className="flex flex-col-reverse">
//                         <dt className="text-sm font-medium text-gray-600">Published</dt>
//                         <dd className="text-xs text-gray-500">{items.time.slice(0, 10)}</dd>
//                     </div>

//                     <div className="flex flex-col-reverse">
//                         <dt className="text-sm font-medium text-gray-600">Reading time</dt>
//                         <dd className="text-xs text-gray-500">3 minute</dd>
//                     </div>
//                 </dl>
//                 <div className="flex gap-4 items-center mt-6 justify-around">
//                     <div className="flex gap-6 items-center mt-6">
//                         <button className="flex items-start justify-center">
//                             <AiFillLike className="size-7" />
//                             {items.upVote}
//                         </button>
//                         <button className="flex items-start justify-center">
//                             <AiFillDislike className="size-7" />
//                             {items.downVote}
//                         </button>
//                     </div>
//                     <div className="flex gap-6 items-center  mt-6">
//                         {/* <button className="flex items-start justify-center gap-2">

//                         </button> */}
//                         {/* Open the modal using document.getElementById('ID').showModal() method */}
//                         <button className="btn" type="button" onClick={() => document.getElementById('my_modal_1').showModal()}><FaRegCommentDots className="size-7" /></button>
//                         <dialog id="my_modal_1" className="modal">
//                             <div className="modal-box">
//                                 <h3 className="font-bold text-lg">Hello!</h3>
//                                 <p className="py-4">Press ESC key or click the button below to close</p>
//                                 <div>
//                                     <form onSubmit={handlePost}>

//                                         <div className="join flex flex-row justify-center items-center mt-5">
//                                             <div>
//                                                 <div>
//                                                     <input type="text" name="comment" className="input input-bordered join-item h-16 lg:w-96" placeholder="Search your topics...." />
//                                                 </div>
//                                             </div>
//                                             <div className="indicator">
//                                                 <button className="btn join-item h-16 bg-blue-500 w-16"><FaLocationArrow className="size-6" /></button>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                                 <div className="modal-action">
//                                     <form method="dialog">

//                                         {/* if there is a button in form, it will close the modal */}
//                                         <button className="btn">Close</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </dialog>
//                         <button>
//                             <FaShare className="size-7" />
//                         </button>
//                     </div>
//                 </div >
//             </a >
//             <Comment postId={items._id}></Comment>
//         </div >
//     );
// };

// export default CardDetails;

import { useContext, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaLocationArrow, FaRegCommentDots, FaShare } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Comment from "./Comment";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    LinkedinShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon,
    LinkedinIcon,
    EmailIcon,
} from "react-share";

const CardDetails = () => {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const items = useLoaderData();
    const url = window.location.href;
    const [shareVisible, setShareVisible] = useState(false);

    const handlePost = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = user.email;
        const image = user.photoURL;
        const name = user.displayName;
        const comment = form.comment.value;

        const newUser = { email, image, name, comment, postId: params.id };
        console.log(newUser);

        fetch('http://localhost:5000/comment', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                }
            });
    };

    const toggleShareButtons = () => {
        setShareVisible(!shareVisible);
    };

    return (
        <div className="pt-12">
            <a
                href="#"
                className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            >
                <span
                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>

                <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {items.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-600">{items.authorName}</p>
                    </div>
                    <div className="hidden sm:block sm:shrink-0">
                        <img
                            alt=""
                            src={items.authorImage}
                            className="size-20 rounded-lg object-cover shadow-sm"
                        />
                    </div>
                </div>
                Tag: {items.tag}
                <div className="mt-4">
                    <p className="text-pretty text-sm text-gray-500">
                        {items.description}
                    </p>
                </div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Published</dt>
                        <dd className="text-xs text-gray-500">{items.time.slice(0, 10)}</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                        <dd className="text-xs text-gray-500">3 minute</dd>
                    </div>
                </dl>
                <div className="flex gap-4 items-center mt-6 justify-around">
                    <div className="flex gap-6 items-center mt-6">
                        <button className="flex items-start justify-center">
                            <AiFillLike className="size-7" />
                            {items.upVote}
                        </button>
                        <button className="flex items-start justify-center">
                            <AiFillDislike className="size-7" />
                            {items.downVote}
                        </button>
                    </div>
                    <div className="flex gap-6 items-center mt-6">
                        <button className="btn" type="button" onClick={() => document.getElementById('my_modal_1').showModal()}><FaRegCommentDots className="size-7" />{items.length}</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div>
                                    <form onSubmit={handlePost}>
                                        <div className="join flex flex-row justify-center items-center mt-5">
                                            <div>
                                                <input type="text" name="comment" className="input input-bordered join-item h-16 lg:w-96" placeholder="Search your topics...." />
                                            </div>
                                            <div className="indicator">
                                                <button className="btn join-item h-16 bg-blue-500 w-16"><FaLocationArrow className="size-6" /></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <button onClick={toggleShareButtons}>
                            <FaShare className="size-7" />
                        </button>
                    </div>
                </div>
            </a>
            {shareVisible && (
                <div className="flex gap-4 justify-center mt-6">
                    <FacebookShareButton url={url} quote={items.title} className="mr-2">
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={url} title={items.title} className="mr-2">
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={url} title={items.title} className="mr-2">
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TelegramShareButton url={url} title={items.title} className="mr-2">
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <LinkedinShareButton url={url} title={items.title} summary={items.description} source={url} className="mr-2">
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <EmailShareButton url={url} subject={items.title} body={items.description} className="mr-2">
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </div>
            )}
            <Comment postId={items._id}></Comment>
        </div>
    );
};

export default CardDetails;
