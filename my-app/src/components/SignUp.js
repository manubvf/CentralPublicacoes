import React from 'react';
import google from '../images/google.png';
import { Link } from 'react-router-dom'
import Modal from './Modal';

const styles = {
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
}

export default class SignUp extends React.Component {
    render() {
        return (
            <Modal closeButtonRight title="Cadastro" handleClose={this.props.handleClose}>
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
            </Modal>
      );
    }
  }