import { FaSearch } from "react-icons/fa";

const Banner = () => {
    return (
        <div>
            <section className="w-full">
                <div className="w-full h-[520px] bg-[url('https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2021/10/wallpaperflare.com_wallpaper-3.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
                    {/* <!-- Photo by '@insolitus' on Unsplash --> */}
                    <div>
                        <h1 className="text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Hello, what can we help you find?</h1>
                        <h1 className="text-white text-center xl:text-xl lg:text-xl md:text-xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">Search here to get answers to your questions</h1>
                    </div>
                    <div className="w-full mx-auto">
                        <form>
                            <div className="join flex flex-row justify-center items-center mt-5">
                                <div>
                                    <div>
                                        <input className="input input-bordered join-item h-16 lg:w-96" placeholder="Search your topics...." />
                                    </div>
                                </div>
                                <div className="indicator">
                                    <button className="btn join-item h-16 bg-blue-500 w-16"><FaSearch className="size-6"></FaSearch></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


            </section>

            <div className="grid lg:grid-cols-3 grid-cols-1 lg:m-9 m-3 justify-center items-center gap-6 mt-6 text-white">
                <div className="bg-black flex justify-center items-center gap-4 rounded-lg  p-4">
                    <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy/wp-content/uploads/2020/04/doc-1.svg" alt="" />
                    <div className="text-white">
                        <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
                        <p>Learn here how to install the theme and start your website.</p>
                    </div>

                </div>
                <div className="bg-black flex justify-center items-center   gap-4 rounded-lg  p-4">
                    <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2021/03/h-icon-1-1.png" alt="" />
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Community Forums</h1>
                        <p>View here all the frequently asked questions about Docy.</p>
                    </div>

                </div>
                <div className="bg-black flex justify-center items-center   gap-4 rounded-lg  p-4">
                    <img className="size-14" src="https://wordpress-theme.spider-themes.net/docy2/wp-content/uploads/2020/03/Duplicate-1.png" alt="" />
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
                        <p>Check our knowledge base with all information you need.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;