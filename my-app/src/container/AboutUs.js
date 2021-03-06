
import React from 'react';
import Container from './Container';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';

const styles = {
    div1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40,
        marginRight:40
    },
    div2: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    div3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    orangeBox: {
      marginLeft: '72px',
      border: '3px solid #FFB255',
      padding: '39px 30px 63px 30px',
      borderRadius: '15px',
    },
    blueBox: {
      marginLeft: '81px',
      border: '3px solid #6EC6DA',
      padding: '5% 27.5%',
      borderRadius: '15px',
      position: 'absolute',
      marginTop: '-11%',
    },
    brackets: {
      fontSize: 70, 
      color: '#049DBF', 
      height: 35,
    },
    img: { 
      height: '356px', 
      width: '516px',
    },
}

export default class AboutUs extends React.Component {
    render() {
      return (
        <Container>
            <p style={{ fontSize:30 }}>Sobre nós</p>
            <div style={styles.div1}>
                <Player autoplay={true} loop={true} controls={false} src="https://assets7.lottiefiles.com/packages/lf20_bpqri9y8.json" style={styles.img}/>
                <div>
                  <div style={styles.orangeBox}>
                    <p style={{textAlign:'left'}}>Somos um grupo de estudantes da disciplina MC855 da Universidade Estadual de Campinas. </p>

                    <p style={{textAlign:'left'}}>Este projeto tem como objetivo facilitar o acesso as informações de projetos de pesquisa em andamento, assim como aproximar ainda mais os pesquisadores e  os interessados nas pesquisas. Melhorando assim,a comunicação de todo o meio acadêmico.</p>
                  </div>
                  <div style={styles.blueBox}></div>
                </div>
            </div>
            <div style={styles.div2}>
                <p style={styles.brackets}> {"{"} </p>
                <div style={styles.div3}>
                    <p style={{textAlign:'left'}}>À principio, o alcance deste projeto está somente para o Instituto de Computação.  </p>
                    <p style={{textAlign:'left'}}> Caso tenha interesse, <Link to="/contactus"> entre em contato conosco!</Link> </p>
                </div>
                <p style={styles.brackets}> {"}"} </p>
            </div>
        </Container>
      );
    }
  }
