import React, { useEffect, useReducer } from 'react';
import Image from 'next/image';

const initialState = {
  carouselOrientation: 0,
  elementOrientation: 0,
  focusElement: 0,
};

const rotateRight = (prevCarousel, theta, noOfImages) => ({
  carouselOrientation: prevCarousel.carouselOrientation + theta,
  elementOrientation: prevCarousel.elementOrientation - theta,
  focusElement:
    prevCarousel.focusElement < noOfImages - 1
      ? prevCarousel.focusElement + 1
      : 0,
});

const rotateLeft = (prevCarousel, theta, noOfImages) => ({
  carouselOrientation: prevCarousel.carouselOrientation - theta,
  elementOrientation: prevCarousel.elementOrientation + theta,
  focusElement:
    prevCarousel.focusElement > 0 ? prevCarousel.focusElement - 1 : noOfImages - 1,
});

const FancyCarousel = ({
  images,
  setFocusElement = () => {},
  offsetAngle = 0,
  carouselRadius = 400,
  centralImageRadius = 125,
  centralImageBoxShadow = '5px 10px 18px #888888',
  peripheralImageRadius = 75,
  peripheralImageBoxShadow = '5px 10px 18px #888888',
  focusElementStyling = {},
  border = true,
  borderWidth = 5,
  borderHexColor = 'CB786C',
  autoRotateTime = 0,
  transitionTime = 1.5,
  navigationTextSize = 2,
  navigationButtonRadius = 32.5,
  navigationButtonBgColor = 'CB786C',
  navigationButtonColor = 'FFFFFF',
  navigationButtonStyling = {},
}) => {
  const noOfImages = images.length;
  const theta = 360 / noOfImages;

  const carouselReducer = (state, action) => {
    switch (action.type) {
      case 'rotateRight':
        return rotateRight(state, theta, action.noOfImages);
      case 'rotateLeft':
        return rotateLeft(state, theta, action.noOfImages);
      default:
        return state;
    }
  };

  const [carousel, dispatch] = useReducer(carouselReducer, initialState);

  useEffect(() => {
    setFocusElement(carousel.focusElement);

    if (autoRotateTime) {
      const timer = setTimeout(() => {
        dispatch({ type: 'rotateRight', noOfImages });
      }, autoRotateTime * 1000);

      return () => clearTimeout(timer);
    }
  }, [carousel.focusElement, autoRotateTime, noOfImages, setFocusElement]);

  const borderElement = border
    ? `url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'${carouselRadius * 2}\' ry=\'${carouselRadius * 2}\' stroke=\'%23${borderHexColor}FF\' stroke-width=\'${borderWidth}\' stroke-dasharray=\'6%2c 24\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")`
    : '';

  const newCoordinates = [];
  images.forEach((item, index) => {
    newCoordinates.push([
      carouselRadius - peripheralImageRadius + carouselRadius * Math.cos((2 * Math.PI * index) / noOfImages),
      carouselRadius - peripheralImageRadius + carouselRadius * Math.sin((2 * Math.PI * index) / noOfImages)
    ]);
  });

  const totalDeviation = (offsetAngle * Math.PI) / 180 + Math.PI / 2;
  const rotatedCoordinates = [];
  const centerCoordinate = carouselRadius - peripheralImageRadius;
  newCoordinates.forEach((item, index) => {
    rotatedCoordinates.push([
      centerCoordinate +
        (item[0] - centerCoordinate) * Math.cos(totalDeviation) -
        (item[1] - centerCoordinate) * Math.sin(totalDeviation),
      centerCoordinate +
        (item[0] - centerCoordinate) * Math.sin(totalDeviation) +
        (item[1] - centerCoordinate) * Math.cos(totalDeviation)
    ]);
  });

  const handleRotateRight = () => {
    dispatch({ type: 'rotateRight', noOfImages });
  };

  const handleRotateLeft = () => {
    dispatch({ type: 'rotateLeft', noOfImages });
  };

  return (
    <div className="fancy-carousel-wrapper-element">
      <div
        className="fancy-carousel-border"
        style={{
          backgroundImage: borderElement,
          height: `${carouselRadius * 2}px`,
          width: `${carouselRadius * 2}px`,
          transition: `${transitionTime}s`
        }}
      >
        <div
          className="fancy-carousel"
          style={{
            transform: `rotate(${carousel.carouselOrientation}deg)`,
            height: `${carouselRadius * 2}px`,
            width: `${carouselRadius * 2}px`
          }}
        >
          {images.map((item, index) => (
            <div
              className="fancy-carousel-element"
              key={index}
              style={{
                transform: `rotate(${carousel.elementOrientation}deg)`,
                width: `${peripheralImageRadius * 2}px`,
                height: `${peripheralImageRadius * 2}px`,
                left: `${rotatedCoordinates[index][0]}px`,
                bottom: `${rotatedCoordinates[index][1]}px`,
                boxShadow: peripheralImageBoxShadow,
                transition: `${transitionTime}s`
              }}
            >
              <Image
                className="fancy-carousel-image"
                src={item}
                alt={`Image ${index}`}
                height={40}
                width={40}
                style={{ width: `${peripheralImageRadius * 2}px`, height: `${peripheralImageRadius * 2}px` }}
              />
            </div>
          ))}

          <div
            className="fancy-carousel-element central-img"
            key={noOfImages}
            style={{
              transform: `rotate(${carousel.elementOrientation}deg)`,
              width: `${centralImageRadius * 2}px`,
              height: `${centralImageRadius * 2}px`,
              left: `${carouselRadius - centralImageRadius - 10}px`,
              bottom: `${carouselRadius - centralImageRadius - 10}px`,
              boxShadow: centralImageBoxShadow,
              transition: `${transitionTime}s`
            }}
          >
            <Image
              className="fancy-carousel-central-image"
              src={images[carousel.focusElement]}
              alt="Central Image"
              width={40}
              height={40}
              style={{ width: `${centralImageRadius * 2}px`, height: `${centralImageRadius * 2}px`, transition: `${transitionTime}s` }}
            />
          </div>
        </div>
      </div>

      <div className={`fancy-carousel-navigators ${autoRotateTime ? 'invisible' : ''}`} style={{ gap: `${carouselRadius * 2}px`, marginLeft: `-${navigationButtonRadius * 1.8}px` }}>
        <button
          className="fancy-carousel-navigation-button"
          onClick={handleRotateLeft}
          style={{
            width: `${navigationButtonRadius * 2}px`,
            height: `${navigationButtonRadius * 2}px`,
            backgroundColor: `#${navigationButtonBgColor}`,
            color: `#${navigationButtonColor}`,
            fontSize: `${navigationTextSize}rem`
          }}
        >
          ↓
        </button>
        <button
          className="fancy-carousel-navigation-button"
          onClick={handleRotateRight}
          style={{
            width: `${navigationButtonRadius * 2}px`,
            height: `${navigationButtonRadius * 2}px`,
            backgroundColor: `#${navigationButtonBgColor}`,
            color: `#${navigationButtonColor}`,
            fontSize: `${navigationTextSize}rem`
          }}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default FancyCarousel;
