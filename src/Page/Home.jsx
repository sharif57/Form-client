// import Banner from "../Components/Banner";
import { useEffect } from "react";
import Call from "./Call";
import Hero from "./Hero";
import PostData from "./PostData";

const Home = () => {
    useEffect(() => {
        document.title = 'Home'
    }, [])
    return (
        <div>
            {/* <Banner></Banner> */}
            <PostData></PostData>
            {/* <Shread></Shread> */}
            <Hero></Hero>
            <Call></Call>
        </div>
    );
};

export default Home;