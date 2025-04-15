import React, { useState } from 'react';
import { Heart } from "lucide-react";
import "./FeatureStyles.css";

const LikeButton = () => {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(!isAdded);
    };

    return (
        <button className="wishlist-button" onClick={handleClick}>
            {isAdded ? <Heart className="like-icon" /> : <Heart className="liked-icon" />}
        </button>
    );
};

export default LikeButton;