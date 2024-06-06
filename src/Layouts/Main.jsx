import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Page/Footer";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-360px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;