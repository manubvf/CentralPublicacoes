
import React from 'react';
import Container from './Container';

export default class ContactUs extends React.Component {
    render() {
      return (
        <Container {...this.props}>
            <p style={{ fontSize:30 }}>Contacte-nos</p>
        </Container>
      );
    }
  }