import React, { Fragment } from 'react';
import Carousel from '../components/Carousel/Carousel';

import ServicesList from '../components/Services/ServicesList';

const Home = () => {
  return (
    <Fragment>
      <Carousel />
      <ServicesList />
    </Fragment>
  )
}

export default Home