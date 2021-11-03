import React from 'react';
import google from '../images/google.png';
import { Link } from 'react-router-dom';
import '../Theme.css';
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
    link: {
        border: 0, 
        backgroundColor: 'transparent', 
        cursor:'pointer', 
        textDecoration: 'underline', 
        color: '#0070A8'
    },
    title: {
        borderBottom: '2px solid #0070A8',
        paddingBottom: '2.1vh', 
        fontSize: 25, 
        width: '100%', 
        textAlign: 'center',
    },
}

export default class SignUp extends React.Component {
    render() {
        return (
            <Modal closeButtonRight handleClose={this.props.handleClose}>
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
                <button className="bigBlueButton">
                    Cadastrar
                </button>
                ou
                <button className="bigWhiteButton">
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