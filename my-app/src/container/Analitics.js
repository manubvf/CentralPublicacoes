
import React from 'react';
import Container from './Container';

export default class Analitics extends React.Component {
    render() {
      return (
        <Container currentPage='analitics' {...this.props}>
            <p style={{ fontSize:30 }}>Análises</p>
        </Container>
      );
    }
  }