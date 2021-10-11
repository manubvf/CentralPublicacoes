
import React from 'react';
import Container from './Container';
import ProjectSummary from '../components/ProjectSummary';

export default class AboutUs extends React.Component {
    render() {
      return (
          <Container>
              <p style={{textAlign:'left', fontSize:30 }}>Explorar</p>
              <ProjectSummary title="Título" category="Categoria" author="Manoela Brandão Ferreira" interested="400" tag1="Tag 1"/>
          </Container>
      );
    }
  }
