import React from "react";
import { Carousel as BCarousel } from "react-bootstrap";

const Carousel = () => {
  return (
<BCarousel className='mb-5' style={{
  overflow: 'hidden'
}}>
  <BCarousel.Item style={{
    height: '100%'
  }}>
    <img
      className="d-block w-100"
      src="/assets/images/pet_1.jpg"
      alt="First slide"
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />
  </BCarousel.Item>
  <BCarousel.Item style={{
    height: '100%'
  }}>
    <img
      className="d-block w-100"
      src="/assets/images/dog_4.jpg"
      alt="Second slide"
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />
  </BCarousel.Item>
  <BCarousel.Item style={{
    height: '100%'
  }}>
    <img
      className="d-block w-100"
      src="/assets/images/dog_3.jpg"
      alt="Third slide"
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />
  </BCarousel.Item>
</BCarousel>
  );
};

export default Carousel;
