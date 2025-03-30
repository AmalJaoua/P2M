import React, { useState } from 'react';
import { Plus, Check } from "lucide-react";
import "./FeatureStyles.css";

const WishlistButton = () => {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(!isAdded);
    };

    return (
        <button className="wishlist-button" onClick={handleClick}>
            {isAdded ? <Check className="check-icon" /> : <Plus className="plus-icon" />}
        </button>
    );
};

export default WishlistButton;