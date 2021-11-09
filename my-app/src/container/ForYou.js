
import React from 'react';
import Container from './Container';
import CardCarousel from '../components/CardCarousel';

export default class ForYou extends React.Component {
    render() {
      return (
        <Container currentPage='foryou'>
            <p style={{ fontSize:30 }}> Pra você </p>
            <CardCarousel/>
        </Container>
      );
    }
  }
