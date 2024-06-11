// // import { useContext, useEffect, useState } from "react";
// // import { AuthContext } from "../AuthProvider/AuthProvider";
// // import { AiFillDislike, AiFillLike } from "react-icons/ai";
// // import { FaRegCommentDots, FaShare } from "react-icons/fa";
// // import { useLoaderData } from "react-router-dom";



// // const PostData = () => {
// //     const [count, setCount] = useState(0)
// //     const items = useLoaderData()
// //     console.log('all items', items);
// //     const { user } = useContext(AuthContext)
// //     const [posts, setPosts] = useState([])
// //     useEffect(() => {
// //         fetch('https://forum-server-self.vercel.app/post')
// //             .then(res => res.json())
// //             .then(data => setPosts(data))
// //     }, [])
// //     return (

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* <h1>{user?.email}</h1> */}

// //             {
// //                 posts.slice().reverse().map(post => <article key={post._id} className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
// //                     <div className="flex justify-start  gap-4 mb-5">
// //                         <img className="rounded-full h-12" src={post.authorImage} alt="" />
// //                         <div>
// //                             {/* <h1 >{user?.email}</h1> */}
// //                             <p className="text-xl">{post?.authorName}</p>
// //                             <p className="text-xs font-medium">{post.time.slice(0, 10)}</p>

// //                         </div>
// //                     </div>

// //                     <div className="flex items-start sm:gap-8">

// //                         <div>
// //                             <strong
// //                                 className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
// //                             >
// //                                 {post.tag}

// //                             </strong>

// //                             <h3 className="mt-4 text-lg font-medium sm:text-xl">
// //                                 <a href="#" className="hover:underline"> {post.title} </a>
// //                             </h3>

// //                             <p className="mt-1 text-sm text-gray-700">
// //                                 {post.description}
// //                             </p>

// //                             <div className="mt-4 sm:flex sm:items-center sm:gap-2">
// //                                 <div className="flex items-center gap-1 text-gray-500">
// //                                     <svg
// //                                         className="h-4 w-4"
// //                                         fill="none"
// //                                         stroke="currentColor"
// //                                         viewBox="0 0 24 24"
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                     >
// //                                         <path
// //                                             strokeLinecap="round"
// //                                             strokeLinejoin="round"
// //                                             strokeWidth="2"
// //                                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
// //                                         ></path>
// //                                     </svg>

// //                                 </div>

// //                                 <span className="hidden sm:block" aria-hidden="true">&middot;</span>

// //                                 <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
// //                                     Featuring <a href="#" className="underline hover:text-gray-700">Barry</a>,
// //                                     <a href="#" className="underline hover:text-gray-700">Sandra</a> and
// //                                     <a href="#" className="underline hover:text-gray-700">August</a>
// //                                 </p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="flex gap-4 items-center  mt-6 justify-between">
// //                         <div className="flex gap-4 items-center mt-6">
// //                             <button onClick={() => setCount(count + 1)} className="flex items-start justify-center"><AiFillLike className="size-7" />{post.upVote}</button>
// //                             <button className="flex items-start justify-center"><AiFillDislike className="size-7" />{post.downVote}</button>
// //                         </div>
// //                         <div className="flex gap-4 items-center mt-6">
// //                             <button className="flex items-start justify-center gap-2"><FaRegCommentDots className="size-7" />
// //                                 </button>
// //                             <button><FaShare className='size-7'></FaShare></button>
// //                         </div>
// //                     </div>
// //                 </article>)
// //             }


// //         </div >
// //     );
// // };

// // export default PostData;

// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../AuthProvider/AuthProvider';
// import { FaRegCommentDots, FaSearch } from 'react-icons/fa';
// import { Link, useLoaderData } from 'react-router-dom';
// import { BiDownvote, BiUpvote } from 'react-icons/bi';
// import { SlShare } from 'react-icons/sl';

// const PostData = ({ postId }) => {
//   const items = useLoaderData();
//   // console.log('all items', items);
//   const { user } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 5;



//   useEffect(() => {
//     fetch('https://forum-server-self.vercel.app/post')
//       .then((res) => res.json())
//       .then((data) => setPosts(data));
//   }, []);

//   const calculatePopularity = (post) => post.upVote - post.downVote;

//   const sortByPopularity = () => {
//     const sortedPosts = [...posts].sort(
//       (a, b) => calculatePopularity(b) - calculatePopularity(a)
//     );
//     setPosts(sortedPosts);
//   };

//   // Get current posts for pagination
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <section className="w-full">
//         <div className="w-full h-[520px] bg-[url('https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2021/10/wallpaperflare.com_wallpaper-3.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
//           {/* <!-- Photo by '@insolitus' on Unsplash --> */}
//           <div>
//             <h1 className="text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Welcome to Our Forum</h1>
//             <h1 className="text-white text-center xl:text-xl lg:text-xl md:text-xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Search here to get answers to your questions</h1>
//           </div>
//           <div className="w-full mx-auto">
//             <form >
//               <div className="join flex flex-row justify-center items-center mt-5">
//                 <div>
//                   <div>
//                     <input className="input input-bordered join-item h-16 lg:w-96" placeholder="Search your topics...." />
//                   </div>
//                 </div>
//                 <div className="indicator">
//                   <button className="btn join-item h-16 bg-blue-500 w-16"><FaSearch className="size-6"></FaSearch></button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>


//       </section>

//       <div className="grid lg:grid-cols-3 grid-cols-1 lg:m-9 m-3 justify-center items-center gap-6 mt-6 text-white">
//         <div className="bg-black flex justify-center items-center gap-4 rounded-lg  p-4">
//           <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy/wp-content/uploads/2020/04/doc-1.svg" alt="" />
//           <div className="text-white">
//             <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
//             <p>Learn here how to install the theme and start your website.</p>
//           </div>

//         </div>
//         <div className="bg-black flex justify-center items-center   gap-4 rounded-lg  p-4">
//           <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2021/03/h-icon-1-1.png" alt="" />
//           <div>
//             <h1 className="text-3xl font-bold mb-4">Community Forums</h1>
//             <p>View here all the frequently asked questions about Docy.</p>
//           </div>

//         </div>
//         <div className="bg-black flex justify-center items-center   gap-4 rounded-lg  p-4">
//           <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2020/03/Duplicate-1.png" alt="" />
//           <div>
//             <h1 className="text-3xl font-bold mb-4">Documentation</h1>
//             <p>Check our knowledge base with all information you need.</p>
//           </div>

//         </div>
//       </div>
//       <div className="container mx-auto p-4">
//         <button onClick={sortByPopularity} className="mb-4 p-2 bg-blue-500 text-white rounded">
//           Sort by Popularity
//         </button>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {currentPosts.reverse().map((post) => (
//             <article
//               key={post._id}
//               className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8"
//             >
//               <div className="flex justify-start gap-4 mb-5">
//                 <img className="rounded-full h-12" src={post.authorImage} alt="" />
//                 <div>
//                   <p className="text-xl">{post?.authorName}</p>
//                   <p className="text-xs font-medium">{post.time.slice(0, 10)}</p>
//                 </div>
//               </div>
//               <div className="flex items-start sm:gap-8">
//                 <div>
//                   <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
//                     {post.tag}
//                   </strong>
//                   <h3 className="mt-4 text-lg font-medium sm:text-xl">
//                     <a href="#" className="hover:underline">
//                       {post.title}
//                     </a>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-700">{post.description}</p>
//                   <div className="mt-4 sm:flex sm:items-center sm:gap-2">
//                     <div className="flex items-center gap-1 text-gray-500">
//                       <svg
//                         className="h-4 w-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <span className="hidden sm:block" aria-hidden="true">
//                       &middot;
//                     </span>
//                     <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
//                       Featuring <a href="#" className="underline hover:text-gray-700">Barry</a>,{' '}
//                       <a href="#" className="underline hover:text-gray-700">Sandra</a> and{' '}
//                       <a href="#" className="underline hover:text-gray-700">August</a>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className='flex justify-between items-center mt-6'>
//                 <div className='flex gap-5'>
//                   <BiUpvote className="size-7"></BiUpvote>
//                   <BiDownvote className="size-7"></BiDownvote>
//                 </div>
//                 <div className='flex gap-5'>
//                   <FaRegCommentDots className="size-7"></FaRegCommentDots><h1>0</h1>
//                   <SlShare className="size-7"></SlShare>
//                 </div>
//               </div>

//               <Link to={`/card/${post._id}`} className='btn btn-outline w-full mt-4'>Post Details</Link>
//             </article>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-center">
//           {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={`p-2 m-1 ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostData;


import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaRegCommentDots, FaSearch } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { SlShare } from 'react-icons/sl';

const PostData = ({ postId }) => {
  
  const items = useLoaderData();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    fetch('https://forum-server-self.vercel.app/post')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const calculatePopularity = (post) => post.upVote - post.downVote;

  const sortByPopularity = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => calculatePopularity(b) - calculatePopularity(a)
    );
    setPosts(sortedPosts);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter posts based on search term
  const filteredPosts = searchTerm
    ? posts.filter((post) =>
      post.tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : currentPosts;

  return (
    <div>
      <section className="w-full">
        <div className="w-full h-[520px] bg-[url('https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2021/10/wallpaperflare.com_wallpaper-3.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">
          <div>
            <h1 className="text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-4xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Welcome to Our Forum</h1>
            <h1 className="text-white text-center xl:text-xl lg:text-xl md:text-xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Search here to get answers to your questions</h1>
          </div>
          <div className="w-full mx-auto">
            <form onSubmit={handleSearch}>
              <div className="join flex flex-row justify-center items-center mt-5">
                <div>
                  <div>
                    <input name="search" className="input input-bordered join-item h-16 lg:w-96" placeholder="Search your topics...." />
                  </div>
                </div>
                <div className="indicator">
                  <button type="submit" className="btn join-item h-16 bg-blue-500 w-16"><FaSearch className="size-6"></FaSearch></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 grid-cols-1 lg:m-9 m-3 justify-center items-center gap-6 mt-6 text-white">
        <div className="bg-black flex justify-center items-center gap-4 rounded-lg p-4">
          <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy/wp-content/uploads/2020/04/doc-1.svg" alt="" />
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
            <p>Learn here how to install the theme and start your website.</p>
          </div>
        </div>
        <div className="bg-black flex justify-center items-center gap-4 rounded-lg p-4">
          <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2021/03/h-icon-1-1.png" alt="" />
          <div>
            <h1 className="text-3xl font-bold mb-4">Community Forums</h1>
            <p>View here all the frequently asked questions about Docy.</p>
          </div>
        </div>
        <div className="bg-black flex justify-center items-center gap-4 rounded-lg p-4">
          <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2020/03/Duplicate-1.png" alt="" />
          <div>
            <h1 className="text-3xl font-bold mb-4">Documentation</h1>
            <p>Check our knowledge base with all information you need.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <button onClick={sortByPopularity} className="mb-4 p-2 bg-blue-500 text-white rounded">
          Sort by Popularity
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredPosts.reverse().map((post) => (
            <article
              key={post._id}
              className="rounded-xl bg-green-50 shadow-lgc p-4 ring ring-indigo-50 sm:p-6 lg:p-8"
            >
              <div className="flex justify-start gap-4 mb-5">
                <img className="rounded-full h-12" src={post.authorImage} alt="" />
                <div>
                  <p className="text-xl">{post?.authorName}</p>
                  <p className="text-xs font-medium">{post.time.slice(0, 10)}</p>
                </div>
              </div>
              <div className="flex items-start sm:gap-8">
                <div>

                  <h3 className="mt-4 text-lg font-medium sm:text-xl">
                    <a href="#" className="hover:underline">
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{post.description}</p>
                  <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                    {/* <div className="flex items-center gap-1 text-gray-500">
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
                    </div> */}
                    <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                      {post.tag}
                    </strong>
                    {/* <span className="hidden sm:block" aria-hidden="true">
                      &middot;
                    </span>
                    <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                      Featuring <a href="#" className="underline hover:text-gray-700">Barry</a>,{' '}
                      <a href="#" className="underline hover:text-gray-700">Sandra</a> and{' '}
                      <a href="#" className="underline hover:text-gray-700">August</a>
                    </p> */}
                  </div>
                </div>
              </div>

              <div className='flex justify-between items-center mt-6'>
                <div className='flex gap-5'>
                  <BiUpvote className="size-7"></BiUpvote>{post.upVote}
                  <BiDownvote className="size-7"></BiDownvote>{post.downVote}
                </div>
                <div className='flex gap-5'>
                  <FaRegCommentDots className="size-7"></FaRegCommentDots>
                  <SlShare className="size-7"></SlShare>
                </div>
              </div>

              <Link to={`/card/${post._id}`} className='btn btn-outline w-full mt-4'>Post Details</Link>
            </article>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`p-2 m-1 ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostData;
