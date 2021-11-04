
import React from 'react';
import Container from './Container';

export default class MyProfile extends React.Component {
    render() {
      return (
        <Container>
            <p style={{textAlign:'left', fontSize:30 }}> Meu perfil </p>
        </Container>
      );
    }
  }