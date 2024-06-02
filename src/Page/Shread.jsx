import React from 'react';
import { render } from 'react-dom';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';
import './App.css';

// ShareButton Component
const ShareButton = ({ url, title, description }) => {
    return (
        <div className="share-buttons">
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} summary={description}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    );
};
const Shread = () => {
    const postUrl = 'https://example.com/post/123';
    const postTitle = 'Check out this amazing post!';
    const postDescription = 'This post is about...';

    return (
        <div>
            <div className="App">
                <h1>My Blog Post</h1>
                <p>This is an awesome blog post that you should read and share!</p>
                <ShareButton url={postUrl} title={postTitle} description={postDescription} />
            </div>
        </div>
    );
};

export default Shread;