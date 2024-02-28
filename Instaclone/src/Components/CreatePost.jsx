import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = () => {
    const [imageUrl, setImageUrl] = useState('');

    const loadFile = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    return (
        <div className='createPost'>
            {/* header */}
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create new Post</h4>
                <button id='post-btn'>Share</button>
            </div>
            {/* image preview */}
            <div className="main-div">
                {imageUrl && <img src={imageUrl} alt="preview" id='output' />}
                <input type="file" accept='image/*' onChange={loadFile} />
            </div>
            {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://media.istockphoto.com/id/1336512835/photo/volcanic-eruption-in-iceland.jpg?s=612x612&w=is&k=20&c=205Aw3G46MBotlwGLKOt5ZJG8mrPpRm2A6WnR23ty5Q=" alt="pic" />
                    </div>
                    <h5>Ramesh</h5>
                </div>
                <textarea type="text" placeholder='caption...'></textarea>
            </div>
        </div>
    );
};

export default CreatePost;
