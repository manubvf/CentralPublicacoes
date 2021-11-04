import React from 'react';
import google from '../images/google.png';

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
            <div style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute', 
                height: '100%', 
                width: '100%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 5,
                    padding: 50,
                    minHeight: '80%'
                }}>
                    <button onClick={this.props.handleClose} style={{alignSelf:'end', border: 0, backgroundColor: 'transparent', cursor:'pointer'}}> X </button>
                    <p style={{'border-bottom': '2px solid #0070A8','padding-bottom': '2.1vh', fontSize:25, width: '100%', textAlign: 'center'}}> Login </p>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Email:
                        <input onChange={e => this.setState({email: e.target.value})} value={email} type="text" name="email" style={{ borderRadius: 5, width:300, height:35 }} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Senha:
                        <input onChange={e => this.setState({password: e.target.value})} value={password} type="text" name="password" style={{ borderRadius: 5, width:300, height:35 }} />
                    </div>
                    <a style={{alignSelf:'start', cursor:'pointer'}}> Esqueceu a senha? </a>
                    <button onClick={this.handleSubmit} style={{ borderRadius: 5, width:300, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer' }}>
                        Entrar
                    </button>
                    ou
                    <button style={{ borderRadius: 5, width:300, height:40, backgroundColor: 'white', cursor:'pointer' }}>
                        <img src={google} alt="google"  style={{ width: 15, marginRight: 10 }} />
                        Entrar com o Google
                    </button>
                    <div>
                        É novo por aqui ? 
                        <button onClick={() => {this.props.handleClose(); this.props.openSignUp();}} style={{border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: '#0070A8', cursor:'pointer'}}> Faça seu cadastro </button>
                    </div>
                </div>
          </div>
      );
    }
  }