import React from 'react';
import Container from './Container';
import CardCarousel from '../components/CardCarousel';
import ProjectSummary from '../components/ProjectSummary';
import { Icon } from 'semantic-ui-react';
import banner from '../images/banner.png';

const styles = {
    section: {
      marginBottom: 30,
    },
    topBanner: {
      width: '96%',
      height: '120px',
      marginBottom: '56px',
      marginLeft: '2%',
      borderRadius: '7px',
      overflow: 'hidden',
    },
    backLink:{
      cursor: 'pointer',
      color: '#586973',
      borderBottom: '1px solid #586973',
      width: '149px',
    },
    cardsContainer: {
      display: 'grid',
      gridGap: '70px',
      gridTemplateColumns: '46% 46%',
      marginRight: '6%',
      width: '88%',
      marginLeft: '6%',
      marginTop: 40,
    },
  };

export default class ForYou extends React.Component {
    constructor(props) {
      super(props);
      this.state = {seeMore: false}
      this.toggleMore = this.toggleMore.bind(this);
    }

    toggleMore(event){
      this.setState({seeMore: !this.state.seeMore});
    }

    render() {
      return (
        <Container currentPage='foryou'>
            <div style={styles.topBanner}><img src={banner}/></div>
            {this.state.seeMore === false ? <div>
              <CardCarousel title="Baseados em projetos que você desmonstrou interesse" numberVisible={2} seeMoreClick={this.toggleMore}>
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
              <CardCarousel title="Baseados nos seus projetos de pesquisa" numberVisible={2} seeMoreClick={this.toggleMore}>
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
              <CardCarousel title="Baseados no que você visualizou" numberVisible={2} seeMoreClick={this.toggleMore}>
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
              <CardCarousel title="Populares dos ultimos tempos" numberVisible={2} seeMoreClick={this.toggleMore}>
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </CardCarousel>
            </div> : <div>
              <div style={styles.backLink} onClick={this.toggleMore}><Icon style={styles.arrowIcon} name="angle left" size='large'/> Todos os projetos</div>
              <div style={styles.cardsContainer}>
                  <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                  <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                  <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                  <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
              </div>
            </div>
            }
        </Container>
      );
    }
  }
