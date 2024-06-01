import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const PostData = () => {
    const items = useLoaderData()
    console.log('all items' , items);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* <h1>{user?.email}</h1> */}

            {
                posts.map(post => <article key={post._id} className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                    <div className="flex justify-start  gap-4 mb-5">
                        <img className="rounded-full h-12" src={post.authorImage} alt="" />
                        <div>
                            {/* <h1 >{user?.email}</h1> */}
                            <p className="text-xl">{post?.authorName}</p>
                            <p className="text-xs font-medium">{post.time.slice(0, 10)}</p>

                        </div>
                    </div>

                    <div className="flex items-start sm:gap-8">

                        <div>
                            <strong
                                className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                            >
                                {post.tag}

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
                    <div className="flex gap-4 items-center  mt-6">
                        <div className="flex gap-4 items-center mt-6">
                            <button className="flex items-start justify-center"><AiFillLike className="size-7" />{post.upVote}</button>
                            <button className="flex items-start justify-center"><AiFillDislike className="size-7" />{post.downVote}</button>
                        </div>
                        <div>
                            <button className="flex items-start justify-center gap-2"><FaRegCommentDots className="size-7" />
                                Comment</button>
                        </div>
                    </div>
                </article>)
            }

            {/* {
                posts.map(post => <div key={post._id} className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex space-x-4">
                        <img alt="" src={user?.photoURL} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{user?.displayName}</a>
                            <span className="text-xs dark:text-gray-600">{post.time.slice(0, 10)}</span>
                        </div>
                    </div>
                    <div>
                        <img src="https://source.unsplash.com/random/100x100/?5" alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
                        <h2 className="mb-1 text-xl font-semibold">{post.title}</h2>
                        <p className="text-sm dark:text-gray-600">{post.tags}</p>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="space-x-2">
                            <button aria-label="Share this post" type="button" className="p-2 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current dark:text-violet-600">
                                    <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
                                </svg>
                            </button>
                            <button aria-label="Bookmark this post" type="button" className="p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current dark:text-violet-600">
                                    <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex space-x-2 text-sm dark:text-gray-600">
                            <button type="button" className="flex items-center p-1 space-x-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Number of comments" className="w-4 h-4 fill-current dark:text-violet-600">
                                    <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                                    <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                                </svg>
                                <span>{post.commentsCount}</span>
                            </button>
                            <button type="button" className="flex items-center p-1 space-x-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Number of likes" className="w-4 h-4 fill-current dark:text-violet-600">
                                    <path d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"></path>
                                    <path d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"></path>
                                </svg>
                                <span>{post.upVote}</span>
                            </button>
                            <button type="button" className="flex items-center p-1 space-x-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Number of likes" className="w-4 h-4 fill-current dark:text-violet-600">
                                    <path d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"></path>
                                    <path d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"></path>
                                </svg>
                                <span>{post.downVote}</span>
                            </button>
                        </div>
                    </div>
                </div>)
            } */}
        </div >
    );
};

export default PostData;