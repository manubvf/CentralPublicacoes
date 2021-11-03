import React from 'react';
import google from '../images/google.png';
import '../Theme.css';
import Modal from './Modal';

const styles = {
    input: { 
        borderRadius: 5, 
        width:300, 
        height:35 
    },
    divColumn: {
        display: 'flex', 
        flexDirection:'column'
    },
    linkButton: {
        border: 0, 
        backgroundColor: 'transparent', 
        textDecoration: 'underline', 
        color: '#0070A8', 
        cursor:'pointer'
    },
    linkButtonLeft: {
        border: 0, 
        backgroundColor: 'transparent', 
        textDecoration: 'underline', 
        color: '#0070A8', 
        cursor:'pointer',
        alignSelf:'start',
    },
    title: {
        borderBottom: '2px solid #0070A8',
        paddingBottom: '2.1vh', 
        fontSize: 25, 
        width: '100%', 
        textAlign: 'center',
    },
}

export default class Login extends React.Component {
    render() {
        return (
            <Modal closeButtonRight handleClose={this.props.handleClose}>
                <p style={styles.title}> Login </p>
                <div style={styles.divColumn}>
                    Email:
                    <input type="text" name="name" style={styles.input} />
                </div>
                <div style={styles.divColumn}>
                    Senha:
                    <input type="text" name="name" style={styles.input} />
                </div>
                <button style={styles.linkButtonLeft}> Esqueceu a senha? </button> 
                <button className="bigBlueButton">
                    Entrar
                </button>
                ou
                <button className="bigWhiteButton">
                    <img src={google} alt="google"  style={{ width: 15, marginRight: 10 }} />
                    Entrar com o Google
                </button>
                <div>
                    É novo por aqui ? 
                    <button onClick={() => {this.props.handleClose(); this.props.openSignUp();}} style={styles.linkButton}> Faça seu cadastro </button>
                </div>
            </Modal>
      );
    }
  }