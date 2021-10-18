
import React from 'react';
import Container from './Container';
import ProjectSummary from '../components/ProjectSummary';
import SearchBar from '../components/SearchBar';
import { Player } from '@lottiefiles/react-lottie-player';

const styles = {
    cardsContainer: {
        display: 'grid',
        gridGap: '62px',
        gridTemplateColumns: '70.5vh 70.5vh',
        marginRight: '8.5%',
        width: '150vh',
        marginLeft: '8.5%',
    },
    pageTitle:{
      textAlign: 'left',
      fontSize: 30,
      color: '#333D42',
      paddingLeft: '8.5%',
      marginTop: '64px'
    },
    searchBarContainer:{
      marginRight: '8.5%',
      marginLeft: '8.5%',
      marginTop: '60px',
    }
}

export default class AboutUs extends React.Component {

    render() {
      return (
          <Container currentPage='explore'>
            <div style={styles.searchBarContainer}>
              <SearchBar/>
            </div>
            <p style={styles.pageTitle}>Trends</p>
            <div style={styles.cardsContainer}>
                <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </div>
          </Container>
      );
    }
  }
