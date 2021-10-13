
import React from 'react';
import Container from './Container';
import ProjectSummary from '../components/ProjectSummary';
import { Player } from '@lottiefiles/react-lottie-player';

export default class AboutUs extends React.Component {
    render() {
      return (
          <Container>
              <p style={{textAlign:'left', fontSize:30 }}>Explorar</p>
              <ProjectSummary title="Título" category="Categoria" author="Manoela Brandão Ferreira" interested="400" tag1="Tag 1"/>
              <Player ref={this.player} autoplay={true} loop={true} controls={false} src="https://assets7.lottiefiles.com/packages/lf20_bpqri9y8.json" style={{ height: '616px', width: '616px' }}></Player>
          </Container>
      );
    }
  }
