import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';


function CarouselMui() {
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
    {
      name: 'Random Name #3',
      description: 'Another random thing!',
    },
  ];
  return (
    <Carousel
      autoPlay={true}
      interval={5000}
    //   timeout={1000}
      indicatorIconButtonProps={{
        style: {
          padding: '10px',
          color: 'white',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: 'black',
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: '50px',
          textAlign: 'right',
        },
      }}
    >
      {items.map((item, i) => (
        <Paper key={i}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <Button className="CheckButton">Check it out!</Button>
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselMui;