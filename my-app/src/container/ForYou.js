
import React from 'react';
import Container from './Container';

export default class AboutUs extends React.Component {
    render() {
      return (
        <Container currentPage='foryou'>
            <p style={{textAlign:'left', fontSize:30 }}>Pra você</p>
        </Container>
      );
    }
  }