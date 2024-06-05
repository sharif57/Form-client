import { useContext } from 'react';
import Select from 'react-select'
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
const AddData = () => {

    const handlePost = (e) => {
        e.preventDefault();
        const form = e.target;

        const authorImage = form.authorImage.value;
        const email = user.email;
        const authorName = form.authorName.value;
        // const authorEmail = form.authorEmail.value;
        const title = form.title.value;
        const description = form.description.value;
        const tag = form.tag.value;
        const time = form.time.value;
        const upVote = form.upVote.value;
        const downVote = form.downVote.value;
        const commentsCount = form.commentsCount.value;

        const newUsers = { authorImage, authorName,  title, description, tag, upVote, downVote, commentsCount, email , time}
        console.log(newUsers);

        fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUsers)
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
                    })
                }
            })


    }

    const { user } = useContext(AuthContext)
    const options = [
        { value: 'MERN', label: 'MERN' },
        { value: 'React', label: 'React' },
        { value: 'CSS', label: 'CSS' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'TypeScript', label: 'TypeScript' },
        { value: 'Docker', label: 'Docker' }
    ]
    return (
        <div>
            {/* <h1>add data</h1> */}

            <div className="font-Roboto mt-8 p-6 bg-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl text-center font-bold mb-4">Add Your Post</h2>

                <form onSubmit={handlePost} action="#" method="post" className="space-y-4">
                    {/* Image*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Image</label>
                        <input type="text" name="authorImage" className="mt-3  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={user?.
                            photoURL} />
                    </div>

                    {/* Item Name  */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Name</label>
                        <input type="text" name="authorName" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={user?.displayName} defaultChecked />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Email</label>
                        <input type="text" name="email" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={user?.email} defaultChecked />
                    </div>

                    {/* Subcategory Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Title</label>
                        <input type="text" id="category" name="title" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    {/* Short Description  */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Description</label>
                        <textarea name="description" rows="3" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ></textarea>
                    </div>

                    {/*  tag  */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tag</label>
                        {/* <input type="text" id="price" name="price" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> */}
                        <Select name='tag' options={options} />
                    </div>

                    {/* time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Time</label>
                        <input type="time"  name="time" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>


                    {/* Processing Time  */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">UpVote</label>
                        <input type="number" name="upVote" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={0} min={0} max={0} />
                    </div>
                    {/* DownVote */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">UpVote</label>
                        <input type="number" name="downVote" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={0} min={0} max={0} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">commentsCount</label>
                        <input type="number" name="commentsCount" className="mt-1  p-2.5 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={0} min={0} max={0} />
                    </div>


                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddData;