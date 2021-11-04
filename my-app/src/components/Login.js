import React from 'react';
import google from '../images/google.png';
import '../Theme.css';
import Modal from './Modal';
import Input from '../components/Input';

const styles = {
    input: {
        borderRadius: 5,
        width:300,
        height:35
    },
    divColumn: {
        display: 'flex',
        flexDirection:'column',
        width: '99%',
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
    constructor(props) {
        super(props);

        this.state = {email: '', password: ''}
    }

    handleSubmit = async () => {
        const {email, password} = this.state;

        if (email === '' || password === '') {
            console.log('Faltam dados!')
            return null;
        }

        return fetch(`http://127.0.0.1:5000/backend`, {
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                function: 'login',
                email, password
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.token)
            if (response.error) console.log(response.error)
            else {
                localStorage.setItem('token', response.token);
                this.props.handleClose();
            }
        })
        .catch(error => console.log(error))
    }
  
    render() {
        const {email, password} = this.state;

        return (
            <Modal closeButtonRight handleClose={this.props.handleClose}>
                <p style={styles.title}> Login </p>
                <div style={styles.divColumn}>
                  <Input title="Email" type="text" name="name"/>
                </div>
                <div style={styles.divColumn}>
                  <Input title="Senha" type="password" name="name"/>
                </div>
                <button style={styles.linkButtonLeft}> Esqueceu a senha? </button>
                <button onClick={this.handleSubmit} className="bigBlueButton">
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
