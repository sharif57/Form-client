
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
    const { user } = useContext(AuthContext);
    const [postCount, setPostCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Fetch the user's current post count from the server
            fetch(`http://localhost:5000/post/count/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setPostCount(data.count);
                });
        }
    }, [user]);

    const handlePost = (e) => {
        e.preventDefault();
        const form = e.target;

        const authorImage = form.authorImage.value;
        const email = user.email;
        const authorName = form.authorName.value;
        const title = form.title.value;
        const description = form.description.value;
        const tag = form.tag.value;
        const time = form.time.value;
        const upVote = form.upVote.value;
        const downVote = form.downVote.value;
        const commentsCount = form.commentsCount.value;

        const newPost = {
            authorImage,
            authorName,
            title,
            description,
            tag,
            upVote,
            downVote,
            commentsCount,
            email,
            time
        };

        fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Post Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    setPostCount(prevCount => prevCount + 1);
                }
            });
    };

    const handleBecomeMember = () => {
        navigate('/membership');
    };

    const options = [
        { value: 'MERN', label: 'MERN' },
        { value: 'React', label: 'React' },
        { value: 'CSS', label: 'CSS' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'TypeScript', label: 'TypeScript' },
        { value: 'Docker', label: 'Docker' }
    ];

    return (
        <div className="font-Roboto mt-8 p-6 bg-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl text-center font-bold mb-4">Add Your Post</h2>
            {postCount < 5 ? (
                <form onSubmit={handlePost} className="space-y-4">
                    {/* Author Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Image</label>
                        <input
                            type="text"
                            name="authorImage"
                            className="mt-3 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            defaultValue={user?.photoURL}
                        />
                    </div>

                    {/* Author Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Name</label>
                        <input
                            type="text"
                            name="authorName"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            defaultValue={user?.displayName}
                        />
                    </div>

                    {/* Author Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Email</label>
                        <input
                            type="text"
                            name="email"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            defaultValue={user?.email}
                        />
                    </div>

                    {/* Post Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Title</label>
                        <input
                            type="text"
                            name="title"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Post Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    {/* Tag */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tag</label>
                        <Select name="tag" options={options} />
                    </div>

                    {/* Post Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Time</label>
                        <input
                            type="time"
                            name="time"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    {/* UpVote */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">UpVote</label>
                        <input
                            type="number"
                            name="upVote"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            defaultValue={0}
                            min={0}
                            disabled
                        />
                    </div>

                    {/* DownVote */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">DownVote</label>
                        <input
                            type="number"
                            name="downVote"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            defaultValue={0}
                            min={0} disabled
                        />
                    </div>

                    {/* Comments Count */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comments Count</label>
                        <input
                            type="number"
                            name="commentsCount"
                            className="mt-1 p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            defaultValue={0}
                            min={0}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Post
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center">
                    <p className="mb-4 text-red-500">You have reached the limit of 5 posts. Become a member to add more posts.</p>
                    <button
                        onClick={handleBecomeMember}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Become a Member
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddData;