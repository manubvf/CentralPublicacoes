import React from 'react';
import google from '../images/google.png';
import { Link } from 'react-router-dom'

const styles = {
    out: { 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    in: { 
        backgroundColor: 'rgba(255, 255, 255)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        padding: 50,
        minHeight: '90%'
    },
    divColumn: {
        display: 'flex', 
        flexDirection:'column'
    },
    input: { 
        borderRadius: 5, 
        width:300,
        height: 35 
    },
    bigButtonBlue: { 
        borderRadius: 5, 
        width:300, 
        height: 35, 
        backgroundColor: '#0070A8', 
        color:'white', 
        cursor:'pointer',
        border: 1
    },
    bigButtonWhite: { 
        borderRadius: 5, 
        width:300, 
        height:40, 
        backgroundColor: 'white', 
        cursor:'pointer' 
    },
    link: {
        border: 0, 
        backgroundColor: 'transparent', 
        cursor:'pointer', 
        textDecoration: 'underline', 
        color: '#0070A8'
    },
    closeButton: {
        alignSelf:'end', 
        border: 0, 
        backgroundColor: 'transparent', 
        cursor:'pointer'
    },
    title: {
        borderBottom: '2px solid #0070A8',
        paddingBottom: '2.1vh', 
        fontSize:25, 
        width: '100%', 
        textAlign: 'center'
    }
}

export default class SignUp extends React.Component {
    componentDidMount() {
        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.body.style.overflow = "auto";
    }

    render() {
        return (
            <div style={styles.out}>
                <div style={styles.in}>
                    <button onClick={this.props.handleClose} style={styles.closeButton}> X </button>
                    <p style={styles.title}> Cadastro </p>
                    <div style={styles.divColumn}>
                        Nome completo*
                        <input type="text" name="name" style={styles.input} />
                    </div>
                    <div style={styles.divColumn}>
                        Email institucional*
                        <input type="text" name="name" style={styles.input} />
                    </div>
                    <div style={styles.divColumn}>
                        Senha*
                        <input type="text" name="name" style={styles.input} />
                    </div>
                    <div style={styles.divColumn}>
                        Confirmação da senha*
                        <input type="text" name="name" style={styles.input} />
                    </div>
                    <button style={styles.bigButtonBlue}>
                        Cadastrar
                    </button>
                    ou
                    <button style={styles.bigButtonWhite}>
                        <img src={google} alt="google"  style={{ width: 15, marginRight: 15 }} />
                        Cadastrar com o Google
                    </button>
                    <div style={{fontSize:10, textAlign:'center'}}>
                        Ao continuar você concorda com os nossos <br/>
                        <button onClick={this.props.handleClose} style={styles.link}>
                            <Link to="/terms"> Termos e Politica de Privacidade </Link>
                        </button>
                    </div>
                    <div>
                        Já tem uma conta ? 
                        <button onClick={() => {this.props.handleClose(); this.props.openLogin();}} style={styles.link}> Faça seu login </button>
                    </div>
                </div>
          </div>
      );
    }
  }