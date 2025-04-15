import React, { useState } from 'react';
import { Heart } from "lucide-react"; // Assuming Lucide icons for heart icons
import "./FeatureStyles.css";
const HeartButton = () => {
    const [isFilled, setIsFilled] = useState(false);

    const handleClick = () => {
        setIsFilled(!isFilled);
    };

    return (
        <button
            className={`heart-button ${isFilled ? 'is-filled' : ''}`}
            onClick={handleClick}
        >
            <Heart
                className="heart-icon"
                fill={isFilled ? 'currentColor' : 'none'}
                stroke="currentColor"
            />
        </button>
    );
};

export default HeartButton;


