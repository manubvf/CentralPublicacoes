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
    link: {
        textDecoration: 'underline',
        cursor:'pointer',
        marginLeft: 5,
    },
    linkButtonLeft: {
        textDecoration: 'underline',
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

        this.state = { email: '', password: '' }
    }

    handleSubmit = async () => {
        const { email, password } = this.state;

        if (email === '' || password === '') {
            console.log(this.state)
            console.log('Faltam dados!')
            return null;
        }
        this.props.context.handleLoading()

        return fetch(`http://127.0.0.1:5000/backend/login`, {
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
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
                localStorage.setItem('fullname', response.fullname);
                this.props.context.handleLoading();
                this.props.handleClose();
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error); 
            this.props.context.handleLoading()
        })
    }

    handleEmailChange = (e) => this.setState({ email: e.target.value })
    handlePasswordChange = (e) => this.setState({ password: e.target.value })
  
    render() {
        const { email, password } = this.state;
        
        return (<>
            <Modal closeButtonRight handleClose={this.props.handleClose}>
                <p style={styles.title}> Login </p>
                <Input title="Email" type="text" name="email" value={email} width="100%" eventChange={this.handleEmailChange}/>
                <Input title="Senha" type="password" name="password" value={password} width="100%" eventChange={this.handlePasswordChange}/>
                <a href="/#" style={styles.linkButtonLeft}> Esqueceu a senha? </a>
                <button onClick={this.handleSubmit} className="bigBlueButton" style={{ marginTop: 10, marginBottom: 10 }}>
                    Entrar
                </button>
                ou
                <button className="bigWhiteButton" style={{ marginTop: 10, marginBottom: 10 }}>
                    <img src={google} alt="google"  style={{ width: 15, marginRight: 10 }} />
                    Entrar com o Google
                </button>
                <div>
                    É novo por aqui ?
                    <a onClick={() => {this.props.handleClose(); this.props.openSignUp();}} style={styles.link}> Faça seu cadastro </a>
                </div>
            </Modal>
        </>);
    }
  }