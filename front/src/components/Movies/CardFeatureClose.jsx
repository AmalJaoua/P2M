import React from "react";
import {CircleX} from 'lucide-react';
import "./MoviesStyles.css";

function CardFeatureClose({ children, ...restProps }) {
  return (
    <button className="card-feature-close" type="button" {...restProps}>
      {children}
      <CircleX />
    </button>
  );
}

export default CardFeatureClose;
