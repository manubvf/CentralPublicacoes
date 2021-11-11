import React from 'react';
import Container from './Container';
import CardCarousel from '../components/CardCarousel';
import ProjectSummary from '../components/ProjectSummary';
import banner from '../images/banner.png';

const styles = {
    section: {
      marginBottom: 30,
    },
    topBanner: {
      width: '97%',
      height: '120px',
      marginBottom: '56px',
      marginLeft: '4%',
      borderRadius: '7px',
      overflow: 'hidden',
    },
  };

export default class ForYou extends React.Component {
    render() {
      return (
        <Container currentPage='foryou'>
            <div style={styles.topBanner}><img src={banner}/></div>
              <CardCarousel title="Baseados em projetos que você desmonstrou interesse">
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
              <CardCarousel title="Baseados nos seus projetos de pesquisa">
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
              <CardCarousel title="Baseados no que você visualizou">
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
              <CardCarousel title="Populares dos ultimos tempos">
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
        </Container>
      );
    }
  }
