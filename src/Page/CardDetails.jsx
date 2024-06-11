

import { useContext, useEffect, useState } from "react";
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
    useEffect(() => {
        document.title = 'Card Details'
    }, [])
    const params = useParams();
    const { user } = useContext(AuthContext);
    const items = useLoaderData();
    const url = window.location.href;
    const [shareVisible, setShareVisible] = useState(false);
    const [itemVotes, setItemVotes] = useState({ upVote: Number(items.upVote), downVote: Number(items.downVote) });
    const [userVote, setUserVote] = useState(null);

    const handlePost = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = user.email;
        const image = user.photoURL;
        const name = user.displayName; 
        const comment = form.comment.value;

        const newUser = { email, image, name, comment, postId: params.id };
        console.log(newUser);

        fetch('https://forum-server-self.vercel.app/comment', {
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
                        text: 'User Comment Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                }
            });
    };

    const toggleShareButtons = () => {
        setShareVisible(!shareVisible);
    };

    const handleVote = (voteType) => {
        let updatedVotes;

        if (voteType === 'like') {
            if (userVote === 'up') {
                updatedVotes = { ...itemVotes, upVote: itemVotes.upVote - 1 };
                setUserVote(null);
            } else {
                updatedVotes = { ...itemVotes, upVote: itemVotes.upVote + 1 };
                if (userVote === 'down') {
                    updatedVotes.downVote -= 1;
                }
                setUserVote('up');
            }
        } else if (voteType === 'dislike') {
            if (userVote === 'down') {
                updatedVotes = { ...itemVotes, downVote: itemVotes.downVote - 1 };
                setUserVote(null);
            } else {
                updatedVotes = { ...itemVotes, downVote: itemVotes.downVote + 1 };
                if (userVote === 'up') {
                    updatedVotes.upVote -= 1;
                }
                setUserVote('down');
            }
        }

        setItemVotes(updatedVotes);

        fetch(`https://forum-server-self.vercel.app/post/${items._id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedVotes)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Vote updated', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div className="lg:pt-36 pt-10">
            <a
                href="#"
                className="relative block overflow-hidden rounded-lg border border-gray-100 bg-fuchsia-50 p-4 sm:p-6 lg:p-8"
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
                    <button
                        type="button"
                        onClick={() => handleVote('like')}
                        className={`flex items-start justify-center ${userVote === 'up' ? 'text-blue-500' : ''}`}
                        disabled={userVote === 'down'}
                    >
                        <AiFillLike className="size-7" />
                        {itemVotes.upVote}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleVote('dislike')}
                        className={`flex items-start justify-center ${userVote === 'down' ? 'text-red-500' : ''}`}
                        disabled={userVote === 'up'}
                    >
                        <AiFillDislike className="size-7" />
                        {itemVotes.downVote}
                    </button>
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
