
import React from 'react';
import Container from './Container';

export default class NewProject extends React.Component {
    render() {
      return (
        <Container {...this.props}>
            <p style={{textAlign:'left', fontSize:30 }}> Novo projeto </p>
        </Container>
      );
    }
  }