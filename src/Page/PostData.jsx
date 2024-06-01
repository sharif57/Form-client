import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PostData = () => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/post')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])
    return (
        // <div>
        //     <h2>{posts.length}</h2>
        //     <div className="flex flex-wrap items-center justify-between ">
        //         <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
        //             Continually Scale Results
        //         </h2>
        //         <a href="#"
        //             className="block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">
        //             Go to insights
        //         </a>
        //     </div>
        //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        //         {
        //             posts.map(post =>


        //                 <div key={post._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        //                     <a href="#">
        //                         <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
        //                     </a>
        //                     <div className="p-5">
        //                         <p className="text-white">#{post.tags}</p>
        //                         <a href="#">
        //                             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
        //                         </a>
        //                         {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
        //                         <div className="flex justify-between text-white mt-3">
        //                             <p className="mb-4">
        //                                 commentsCount: {post.commentsCount}
        //                             </p>
        //                             <p className="mb-4">
        //                                 Vote Count: {post.upVote - post.downVote}
        //                             </p>
        //                         </div>
        //                         <p className="text-white mb-3">
        //                             Time: {post.time.slice(0, 10)}
        //                         </p>

        //                         <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        //                             Read more
        //                             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        //                                 {/* <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /> */}
        //                             </svg>
        //                         </a>
        //                     </div>
        //                 </div>

        //             )
        //         }
        //     </div>
        // </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <h1>{user?.email}</h1> */}

            {
                posts.map(post => <article key={post._id} className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                    <div className="flex justify-start  gap-4 mb-5">
                        <img  className="rounded-full h-12" src={user?.photoURL} alt="" />
                        <div>
                            <h1 className="text-xl">{user?.email}</h1>
                            <p>{user?.displayName}</p>
                        </div>
                    </div>

                    <div className="flex items-start sm:gap-8">
                        
                        <div>
                            <strong
                                className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                            >
                                {post.tags}

                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                <a href="#" className="hover:underline"> {post.title} </a>
                            </h3>

                            <p className="mt-1 text-sm text-gray-700">
                                {post.description}
                            </p>

                            <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                                <div className="flex items-center gap-1 text-gray-500">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>

                                    <p className="text-xs font-medium">{post.time.slice(0, 10)}</p>
                                </div>

                                <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                                <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                                    Featuring <a href="#" className="underline hover:text-gray-700">Barry</a>,
                                    <a href="#" className="underline hover:text-gray-700">Sandra</a> and
                                    <a href="#" className="underline hover:text-gray-700">August</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>)
            }
        </div>
    );
};

export default PostData;