import React from 'react';
import google from '../images/google.png';
import '../Theme.css';
import Modal from './Modal';
import Input from '../components/Input';

const styles = {
    input: {
        borderRadius: 5,
        width:300,
        height: 35
    },
    terms: {
        cursor:'pointer',
    },
    link: {
        cursor:'pointer',
        textDecoration: 'underline',
        marginLeft: 5,
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
    constructor(props) {
        super(props);

        this.state = { fullname: '', email: '', password: '', passwordConfirmation: '' }
    }

    handleSubmit = async () => {
        const { fullname, email, password, passwordConfirmation } = this.state;

        return fetch(`http://127.0.0.1:5000/backend/signup`, {
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                fullname, email, password 
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.token)
            if (response.error) console.log(response.error)
            else {
                localStorage.setItem('token', response.token)
                window.location = '/editProfile';
                this.props.handleClose();
            }
        })
        .catch(error => console.log(error))
    }

    handleNameChange = (e) => this.setState({ fullname: e.target.value })
    handleEmailChange = (e) => this.setState({ email: e.target.value })
    handlePasswordChange = (e) => this.setState({ password: e.target.value })
    handlePasswordConfChange = (e) => this.setState({ passwordConfirmation: e.target.value })
  
    render() {
        const { fullname, email, password, passwordConfirmation } = this.state;

        return (
            <Modal closeButtonRight handleClose={this.props.handleClose}>
                <p style={styles.title}> Cadastro </p>
                <Input title="Nome completo *" type="text" name="fullname" value={fullname} width="100%" eventChange={this.handleNameChange} />
                <Input title="Email institucional *" type="text" name="email" value={email} width="100%" eventChange={this.handleEmailChange} />
                <Input title="Senha *" type="password" name="password" value={password} width="100%" eventChange={this.handlePasswordChange} />
                <Input title="Confirmação da senha *" type="password" name="passwordConfirmation" value={passwordConfirmation} width="100%" eventChange={this.handlePasswordConfChange} />
                <button onClick={this.handleSubmit} className="bigBlueButton" style={{ marginTop: 10, marginBottom: 10 }}>
                    Cadastrar
                </button>
                ou
                <button className="bigWhiteButton" style={{ marginTop: 10, marginBottom: 10 }}>
                    <img src={google} alt="google"  style={{ width: 15, marginRight: 15 }} />
                    Cadastrar com o Google
                </button>
                <div style={{ fontSize:10, textAlign:'center', marginBottom: 10 }}>
                    Ao continuar você concorda com os nossos <br/>
                    <a href="/terms" onClick={this.props.handleClose} style={styles.terms}>
                        Termos e Politica de Privacidade
                    </a>
                </div>
                <div>
                    Já tem uma conta ?
                    <a onClick={() => {this.props.handleClose(); this.props.openLogin();}} style={styles.link}> Faça seu login </a>
                </div>
            </Modal>
      );
    }
  }
