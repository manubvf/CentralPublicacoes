
import React from 'react';
import Container from './Container';
import ProjectSummary from '../components/ProjectSummary';
import SearchBar from '../components/SearchBar';
import axios from "axios";

const styles = {
    cardsContainer: {
        display: 'grid',
        gridGap: '70px',
        gridTemplateColumns: '46% 46%',
        marginRight: '6%',
        width: '88%',
        marginLeft: '6%',
    },
    pageTitle:{
      textAlign: 'left',
      fontSize: 28,
      color: '#333D42',
      paddingLeft: '8.5%',
      marginTop: '64px'
    },
    searchBarContainer:{
      marginRight: '8.5%',
      marginLeft: '8.5%',
      marginTop: '60px',
    }
};

const gitHubUrl = "https://api.github.com/users/deekshasharma";


/*const getGitHubUserWithFetch = async () => {
/*  const response = await fetch(gitHubUrl);
  const jsonData = await response.json();
  return jsonData;
  const response = await axios.get(gitHubUrl);
  return (response.data);
};*/

const jesusCristo = async () => {
    const { email, password } = this.state;

    if (email === '' || password === '') {
        console.log(this.state)
        console.log('Faltam dados!')
        return null;
    }
    this.props.context.handleLoading()

    return fetch(`http://143.106.73.33:5000/`, {
        'method':'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            function: 'view_project',
            email, password
        })
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            console.log(response.error)
            this.props.context.handleLoading()
        } else {
            localStorage.setItem('token', response.token);
            this.props.context.handleLoading()
            this.props.handleClose();
            window.location.reload();
        }
    })
    .catch(error => {
        console.log(error);
        this.props.context.handleLoading()
    })
}


export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}}
    this.toggleMore = this.toggleMore.bind(this);
    //this.getGitHubUserWithFetch = this.getGitHubUserWithFetch.bind(this);
  }

  componentDidMount() {
    const teste = jesusCristo();
    this.setState({data: teste});
    console.log('Você clicou  vezes', teste);
  }
  /*componentDidUpdate() {
  //  getGitHubUserWithFetch();
    const teste = getGitHubUserWithFetch();
    this.setState({data: teste});
    console.log('Você clicou vezes', teste);
  }*/

//  async getGitHubUserWithFetch(){
//    console.log("teste");
  //}

  toggleMore(event){
    console.log(this.state.data);
  }

    render() {
      return (
          <Container currentPage='explore' {...this.props}>
            <div style={styles.searchBarContainer} onClick={this.toggleMore}>
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
