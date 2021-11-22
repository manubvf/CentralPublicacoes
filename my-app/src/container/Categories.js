
import React from 'react';
import Container from './Container';

export default class Categories extends React.Component {
    constructor(props){
      super(props)
      this.state = {articles:[]}
    }

    render() {
      return (
        <Container currentPage='categories' {...this.props}>
            <p style={{ fontSize:30 }}> Categorias </p>
        </Container>
      );
    }
  }