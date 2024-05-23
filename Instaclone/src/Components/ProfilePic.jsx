// Import statements...

const ProfilePic = ({ changeProfile }) => {
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "pankajcloud420");
        fetch("http://api.cloudinary.com/v1_1/pankajcloud420/image/upload", {
            method: "post",
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            setUrl(data.url);
            console.log(data.url); // Move this line here
        })
        .catch((err) => console.log(err));
    };

    const postPic = () => {
        fetch("/uploadProfilePic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                pic: url,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            changeProfile();
            window.location.reload();
        })
        .catch((err) => console.log(err));
    };

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    useEffect(() => {
        if (image) {
            postDetails();
        }
    }, [image]); // Remove 'url' from dependency array

    useEffect(() => {
        if (url) {
            postPic();
        }
    }, [url]);

    return (
        <div className="profilePic darkBg">
            {/* Your JSX content */}
        </div>
    );
};

export default ProfilePic;
