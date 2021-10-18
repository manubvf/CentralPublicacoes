
import React from 'react';
import Container from './Container';

export default class Categories extends React.Component {
    render() {
      return (
        <Container currentPage='categories'>
            <p style={{textAlign:'left', fontSize:30 }}>Categorias</p>
        </Container>
      );
    }
  }