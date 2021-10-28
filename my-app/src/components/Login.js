import React from 'react';
import google from '../images/google.png';
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
    bigButtonWhite: { 
        borderRadius: 5, 
        width:300, 
        height:40, 
        backgroundColor: 'white', 
        cursor:'pointer',
        backgroundColor: 'white'
    },
    bigButtonBlue: { 
        borderRadius: 5, 
        width:300, 
        height:40, 
        backgroundColor: 'white', 
        cursor:'pointer',
        backgroundColor: '#0070A8', 
        color:'white',
        border: 0,
    },
}

export default class Login extends React.Component {
    render() {
        return (
            <Modal closeButtonRight title="Login" handleClose={this.props.handleClose}>
                <div style={styles.divColumn}>
                    Email:
                    <input type="text" name="name" style={styles.input} />
                </div>
                <div style={styles.divColumn}>
                    Senha:
                    <input type="text" name="name" style={styles.input} />
                </div>
                <button style={styles.linkButtonLeft}> Esqueceu a senha? </button> 
                <button style={styles.bigButtonBlue}>
                    Entrar
                </button>
                ou
                <button style={styles.bigButtonWhite}>
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