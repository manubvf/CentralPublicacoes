
import React from 'react';
import Container from './Container';
import ProjectSummary from '../components/ProjectSummary';
import { Player } from '@lottiefiles/react-lottie-player';

const styles = {
    cardsContainer: {
        display: 'grid',
        gridGap: '62px',
        gridTemplateColumns: '70.5vh 70.5vh',
        marginRight: '8.5%',
        width: '150vh',
        marginLeft: '8.5%',
    }
}

export default class AboutUs extends React.Component {

    render() {
      return (
          <Container>
            <p style={{textAlign:'left', fontSize:30 }}>Explorar</p>
            <div style={styles.cardsContainer}>
                <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Análise de Algoritmos" authors={["Manoela Brandão Ferreira","Megan Draper","Peter Campbell"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Big Data" authors={["Manoela Brandão Ferreira"]} interested={150000} tags={["Tag 1"]}/>
                <ProjectSummary title="Título" category="Inteligência Artificial" authors={["Manoela Brandão Ferreira"]} interested={150} tags={["Tag 1","Tag2"]}/>
                <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Manoela Brandão Ferreira","Megan Draper","Peter Campbell","Bert Copper","Joan Harrys","Don Draper"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </div>
          </Container>
      );
    }
  }
