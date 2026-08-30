import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

// Import your images
import image1 from '../../asserts/VAGAI.jpg';
import image2 from '../../asserts/MALALA YOUSAFZAI.png';
import image3 from '../../asserts/1.jpg';
import image4 from '../../asserts/slidee.jpg';
import image5 from '../../asserts/slideee.jpg';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />  
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image3} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image4} alt="Fourth slide" /> 
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image5} alt="Fifth slide" />  
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
