
import React from 'react';
import Container from './Container';
import CardCarousel from '../components/CardCarousel';
import ProjectSummary from '../components/ProjectSummary';
import { Icon } from 'semantic-ui-react';
import banner from '../images/banner.png';
import Input from '../components/Input';

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
    header:{
      textAlign: 'left',
      fontSize: 20,
      color: '#333D42',
      paddingLeft: '6.5%',
      marginBottom: 40,
      marginTop: 40,
    },
  };

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seeMore: false, category: "all"};
    this.toggleMore = this.toggleMore.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
  }

  toggleMore(event){
    this.setState({seeMore: !this.state.seeMore});
  }

  categoryChange(event){
    this.setState({category: event.target.value});
  }

    render() {
      return (
        <Container currentPage='categories' {...this.props}>
          <div style={styles.topBanner}><img src={banner}/></div>
          {this.state.seeMore === false ? <div>
            <section style={{display: 'flex', justifyContent: 'space-between', marginRight: '3.5%' }}>
              <p style={{ fontSize:30, paddingLeft: '8%' }}>Categorias</p>
              <Input type="select" title="Categoria" width="17%" eventChange={this.categoryChange}>
                <option value="all">Todas</option>
                <option value="AI">Inteligência Artificial</option>
                <option value="deepLearning">Deep Learning</option>
                <option value="graphs">Teoria de Grafos</option>
              </Input>
            </section>
            <CardCarousel title="Inteligência Artificial" seeMoreClick={this.toggleMore}>
                <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Inteligência Artificial" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Inteligência Artificial" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
            </CardCarousel>
            <CardCarousel title="Deep Learning" seeMoreClick={this.toggleMore}>
                <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Deep Learning" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                <ProjectSummary title="Análise de Mídias Sensíveis" category="Deep Learning" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Deep Learning" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
            </CardCarousel>
            <CardCarousel title="Teoria de Grafos" seeMoreClick={this.toggleMore}>
                <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Teoria de Grafos" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Teoria de Grafos" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                <ProjectSummary title="Análise de Mídias Sensíveis" category="Teoria de Grafos" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
            </CardCarousel>
          </div> : <div>
            <div style={styles.backLink} onClick={this.toggleMore}><Icon style={styles.arrowIcon} name="angle left" size='large'/> Todas as categorias</div>
            <p style={styles.header}>Inteligência Artificial</p>
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
