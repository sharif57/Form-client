
const Hero = () => {
    return (
        <div>
            <div className="hero lg:h-[700px] bg-fixed " style={{ backgroundImage: 'url(https://i.ibb.co/CMP5Z5Q/finger-touching-mobile-screen-with-world-map-background.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="hero-content   lg:p-20 text-center text-neutral-content">
                        <div className="lg:w-2/3 text-white">
                            <h1 className="mb-5 lg:text-7xl text-4xl font-bold to">DOCBASE</h1>
                            <p className="mb-5">Docbase helps organizations and their employees thrive in a world where information is a seamless part of their workflow, rather than an obstacle to overcome.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;