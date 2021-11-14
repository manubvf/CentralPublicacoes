
import React from 'react';
import Container from './Container';
import banner from '../images/banner.png';
import lattes from '../images/lattes.png';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CardCarousel from '../components/CardCarousel';
import ProjectSummary from '../components/ProjectSummary';

const styles = {
    profileColumn: {
        height: '100%',
        width: '27%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileImage: {
        height: 145,
        width: '66%',
        objectFit: 'cover',
        borderRadius: 15,

    },
    profileName: {
        color: '#333D42',
        fontSize: '21px',
    },
    lattes: {
        color: '#0070A8',
        fontSize: '17px',
        textDecoration: 'underline',
    },
    lattesIcon: {
        width: 24,
        height: 28,
        objectFit: 'contain',
        marginRight: 8,
    },
    section: {
        marginTop: 20,
        color: '#022B59',
        width: '70%',
    },
    secTitle: {
        marginTop: 20,
        width: '100%',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#022B59',
        textAlign: 'left',
        marginLeft: '-6px',
    },
    secItem: {
        marginTop: 10,
        width: '100%',
        textAlign: 'left',
        color: '#586973',
        fontSize: '16px',
    },
    backLink:{
      cursor: 'pointer',
      color: '#586973',
      borderBottom: '1px solid #586973',
      width: '149px',
    },
    cardsContainer: {
      marginRight: '6%',
      width: '88%',
      marginLeft: '6%',
      marginTop: 40,
      display: 'grid',
      gridRowGap: 56,
      alignItems: 'center',
    },
  };

export default class MyProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {seeMore: false}
      //arrumar a qtd de pontinhos da section e o height da foto
      this.toggleMore = this.toggleMore.bind(this);
    }

    toggleMore(event){
      this.setState({seeMore: !this.state.seeMore});
    }

    render() {
      return (
        <Container>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={styles.profileColumn}>
                <img style={styles.profileImage} src={banner}/>
                <h3 style={styles.profileName}>Lucas Silva e Silva</h3>
                <Link to="/" style={{display: 'flex'}}><img style={styles.lattesIcon} src={lattes}/><p style={styles.lattes}>Currículo Lattes</p></Link>
                <section style={styles.section}>
                  <p style={styles.secTitle}><Icon style={styles.icons} name='file outline' size='large'/> Projeto de pesquisa</p>
                  <div style={styles.secItem}>Desatualizados ...................... 1</div>
                  <div style={styles.secItem}>Em andamento ....................... 2</div>
                  <div style={styles.secItem}>Concluídos ............................... 1</div>
                </section>
                <section style={styles.section}>
                  <p style={styles.secTitle}><Icon style={styles.icons} name='graduation cap' size='large'/> Curso</p>
                  <div style={styles.secItem}>Ciência da Computação</div>
                </section>
                <section style={styles.section}>
                  <p style={styles.secTitle}><Icon style={styles.icons} name='envelope outline' size='large'/> Contato</p>
                  <div style={styles.secItem}>l202020@dac.unicamp.com</div>
                  <div style={styles.secItem}>lucasss@email.com</div>
                  <div style={styles.secItem}>(19) 99999-9999</div>
                </section>
            </div>
            <div style={{position: 'relative', width: '71%', paddingLeft:'2%', borderLeft: '1px solid #B5BBBF'}}>
              {this.state.seeMore === false ? <div>
                <CardCarousel title="Projetos de pesquisa desatualizados" numberVisible={1} seeMoreClick={this.toggleMore}>
                    <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                    <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                    <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                    <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
                </CardCarousel>
                <CardCarousel title="Projetos de pesquisa em andamento" numberVisible={1} seeMoreClick={this.toggleMore}>
                    <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
                    <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
                    <ProjectSummary title="Análise de Mídias Sensíveis" category="Inteligência Artificial" authors={["Sandra Avila","Eduardo Valle","Anderson Rocha"]} interested={150} tags={["Tag 1","Tag2"]}/>
                    <ProjectSummary title="Medical Image Classification for Computer-Aided Diagnosis with Deep Learning and Jumbo Vectors" category="Teoria de Grafos" authors={["Michel Fornaciali","Micael Carvalho","Sandra Avila","Zanoni Dias","Mauricio Perez","Daniel Moraes"]} interested={1500} tags={["Tag 1","Tag2","Tag3"]}/>
                </CardCarousel>
                <CardCarousel title="Projetos de pesquisa concluídos" numberVisible={1} seeMoreClick={this.toggleMore}>
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
            </div>
            </div>
        </Container>
      );
    }
  }
