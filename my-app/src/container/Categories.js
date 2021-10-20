
import React from 'react';
import Container from './Container';

export default class Categories extends React.Component {
    render() {
      return (
        <Container currentPage='categories'>
            <p style={{ fontSize:30 }}>Categorias</p>
        </Container>
      );
    }
  }