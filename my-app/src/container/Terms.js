
import React from 'react';
import Container from './Container';

export default class Terms extends React.Component {
    render() {
      return (
        <Container>
            <p style={{textAlign:'left', fontSize:30 }}> Termos </p>
            <p style={{textAlign:'left', fontSize:30 }}> Política de privacidade </p>
        </Container>
      );
    }
  }