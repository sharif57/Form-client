import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Announcement = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <div className="mx-auto px-4 w-1/2 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto ">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Make Announcement</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
                        inventore quaerat mollitia?
                    </p>

                        <div className="flex flex-col p-4 shadow-lg justify-center items-center border-4 rounded-full mt-6">
                        <img className="rounded-full text-center " src={user?.photoURL} alt="" />
                        <h1>{user?.displayName}</h1>
                        <h1>{user?.email}</h1>
                        </div>
                    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <div>
                            <h1>Author Name</h1>
                            <label htmlFor="email" className="sr-only">Author Name</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full rounded-lg border-2 border-blue-600 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email" defaultValue={user?.displayName}
                                />


                            </div>
                        </div>
                        <div>
                            <h1>Author Image</h1>
                            <label htmlFor="email" className="sr-only">Author Image</label>

                            <div className="relative">
                                <input
                                    type="photo"
                                    name="image"
                                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm border-2 border-blue-600"
                                    placeholder="Enter email" defaultValue={user?.photoURL}
                                />


                            </div>
                        </div>
                        <div>
                            <h1>Title</h1>
                            <label htmlFor="email" className="sr-only">Title</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm border-2 border-blue-600"
                                    placeholder="Post Title "
                                />
                            </div>
                        </div>

                        <div>
                            <h1>Description</h1>
                            <label htmlFor="password" className="sr-only">Description</label>

                            <div className="relative">
                                <textarea name="description" className="w-full border-2 rounded-lg  p-4 pe-12 text-sm shadow-sm border-blue-600" id=""></textarea>


                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?
                            <a className="underline" href="#">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Announcement;