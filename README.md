# Fancy Carousel

A customizable and interactive carousel component built with React and Next.js. It allows you to display a rotating carousel of images with various styling options. The component supports server-side rendering (SSR) for improved performance and SEO.

## Server-Side Rendering (SSR)

The Fancy Carousel component supports server-side rendering (SSR) with Next.js, enabling improved performance and SEO benefits. Ensure that you configure your Next.js application to utilize SSR for rendering the Fancy Carousel component.

## Features

- Dynamic image rotation and focus element
- Customizable carousel styling and dimensions
- Configurable auto-rotate functionality
- Navigation buttons for manual rotation
- Supports both peripheral and central images

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fancy-carousel.git
2. Install the dependencies:
   npm install

3. Start the development server:
    npm run dev

4. Access the carousel component in your browser at http://localhost:3000.

## Usage
Import the FancyCarousel component and pass the required props:
```bash
import React from 'react';
import FancyCarousel from './components/FancyCarousel';

   const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg',
  // Add more image paths as needed
 ];

 const MyComponent = () => {
  return (
    <div>
      <h1>My Fancy Carousel</h1>
      <FancyCarousel images={images} />
    </div>
   );
 };
 export default MyComponent;
 


