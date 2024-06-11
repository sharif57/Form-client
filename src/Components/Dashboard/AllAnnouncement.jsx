import { useEffect, useState } from "react";

const AllAnnouncement = () => {
    useEffect(() => {
        document.title = 'AllAnnouncement'
    }, [])
    const [announcements, setAnnouncements] = useState([])
    // console.log(comments);

    useEffect(() => {
        fetch('http://localhost:5000/announcement')
            .then((res) => res.json())
            .then((data) => setAnnouncements(data));
    }, []);
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 pt-14">
            {
                announcements.map(announcement => <div key={announcement._id} className="relative  rounded-lg border border-gray-200 ">


                    <div className=" p-4">
                        <div className="flex gap-4 mb-6">
                            <img
                                alt=""
                                src={announcement.image}
                                className="size-12 rounded-lg object-cover"
                            />

                            <p className="font-medium text-gray-900">{announcement.name}</p>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold mb-4">{announcement.title}</h1>

                            <p className=" text-x text-gray-500">
                                {announcement.description}
                            </p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AllAnnouncement;