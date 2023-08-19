import React from 'react';
import './Skeleton.css'; // Make sure to create this CSS file

const Skeleton = ({ width=150, height=40, duration='1.5s', color='#f0f0f0', backgroundColor='#ccc' }) => {
  const skeletonStyle = {
    width: width,
    height: height,
    backgroundColor: backgroundColor,
  };

  const animationStyle = {
    animationDuration: duration,
    backgroundColor: color,
  };

  return (
    <div className="skeleton" style={skeletonStyle}>
      <div className="animation" style={animationStyle}></div>
    </div>
  );
};

export default Skeleton;
