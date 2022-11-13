import React from "react";
import "./Carousel.scss";
import { useState, useEffect } from "react";
import Button from "../Button/Button";

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3500);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <Button
          className="hello"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          buttonStyle="btn--success--solid"
          text="previous"
        />

        {React.Children.map(children, (child, index) => {
          return (
            <Button
              onClick={() => {
                updateIndex(index);
              }}
              buttonStyle={`btn--warning--solid${
                index === activeIndex ? "btn--success--solid" : ""
              }`}
              text={index + 1}
            />
          );
        })}
        <Button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          buttonStyle="btn--success--solid"
          text="next"
        />
      </div>
    </div>
  );
};

export default Carousel;
