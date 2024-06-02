

// import { useContext, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from "sweetalert2";

// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';


// const Register = () => {

//     useEffect(() => {
//         document.title = 'Register Page'
//     }, [])

//     const { registerUser, updateUserProfile } = useContext(AuthContext)
//     const [error, setError] = useState('')
//     const [showPassword, setShowPassword] = useState('')
//     const location = useLocation()
//     const navigate = useNavigate()
//     // const notify = () => toast("user register successfully!");



//     const handleRegister = (e) => {
//         e.preventDefault();
//         const name = e.target.name.value;
//         const email = e.target.email.value;
//         const photo = e.target.photo.value;
//         const password = e.target.password.value;


//         if (/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)) {
//             setError(
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'user login successfully',
//                     icon: 'success',
//                     confirmButtonText: 'Cool'
//                 })

//             );
//             registerUser(email, password)
//                 .then(() => {
//                     navigate(location?.state ? location.state : '/')
//                     updateUserProfile(name, photo)
//                 })
//         }

//         else {
//             setError(
//                 // alert('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.')
//                 setError(Swal.fire({
//                     title: 'Error!',
//                     text: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long',
//                     icon: 'error',
//                     confirmButtonText: 'Try aging'
//                 }))
//             );
//             return;

//         }
//         setError('')
//     }

//     return (
//         <div className="font-Roboto">
//             {
//                 error && <div>{error}</div>
//             }
//             <div className="mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
//                 <h2 data-aos="fade-up" data-aos-delay='300' className="mb-3 text-3xl font-bold text-center bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">Please Register Now</h2>
//                 <p data-aos="fade-up" data-aos-delay='600' className="text-sm text-center dark:text-gray-600">you have account?
//                     <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline text-blue-600 font-bold"><Link to={'/login'}>Login here</Link></a>
//                 </p>


//                 <form onSubmit={handleRegister} noValidate="" action="" className="space-y-8">
//                     <div className="space-y-4">
//                         <div data-aos="fade-up" data-aos-delay='900' className="space-y-2">
//                             <label htmlFor="email" className="block text-sm">Name</label>
//                             <input type="text" name="name" placeholder="Your name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
//                         </div>
//                         <div data-aos="fade-up" data-aos-delay='1200' className="space-y-2">
//                             <label htmlFor="email" className="block text-sm">Email address</label>
//                             <input type="text" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
//                         </div>
//                         <div data-aos="fade-up" data-aos-delay='1500' className="space-y-2">
//                             <label htmlFor="email" className="block text-sm">Photo URL</label>
//                             <input type="text" name="photo" id="" placeholder="photo url" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
//                         </div>

//                         <div data-aos="fade-up" data-aos-delay='1800' className="space-y-2 relative ">
//                             <label htmlFor="email" className="block text-sm">Password</label>
//                             <input type={showPassword ? 'text' : 'password'}
//                                 name="password"
//                                 id="password"
//                                 placeholder="*****"
//                                 className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />

//                             <span className="cursor-pointer absolute top-8 -ml-7" onClick={() => setShowPassword(!showPassword)}>
//                                 {
//                                     showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
//                                 }
//                             </span>

//                         </div>

//                     </div>
//                     <button className="btn btn-primary w-full">Register Now</button>
//                 </form>
//             </div>
//             {/* <ToastContainer /> */}


//         </div>
//     );
// };

// export default Register;

import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Register = () => {


    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,

        formState: { errors },
    } = useForm()

    const { registerUser, updateUserProfile, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        navigate(location?.state ? location.state : '/')
        googleLogin()
    }

    const onSubmit = (data) => {
        console.log(data)
        registerUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    reset();
                                    Swal.fire({
                                        position: "top-center",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue="test" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" defaultValue="test" {...register("photoURL", { required: true })} placeholder="photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">photoURL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" defaultValue="test" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" defaultValue="test" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]$/
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <span className="text-red-600">Password is required</span>}

                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be 6 character</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be less 20 character </p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must have one uppercase , one lower case and one number  </p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="sign up" />
                            </div>
                        </form>
                        <p className="text-center text-blue-700"><small>ALready have an account <Link to={'/login'} className="underline">LogIn</Link></small></p>

                        <div className='divider'>

                        </div>
                        <div className='p-4'>
                            {/* <SocialLogin></SocialLogin> */}
                            <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p>Login with Google</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;