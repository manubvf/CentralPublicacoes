import React from 'react';
import google from '../images/google.png';
import {
  Link,
} from 'react-router-dom'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = { fullname: '', email: '', password: '', passwordConfirmation: '' }
    }

    handleSubmit = async () => {
        const { fullname, email, password, passwordConfirmation } = this.state;

        return fetch(`http://127.0.0.1:5000/backend`, {
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                function: 'signup',
                fullname, email, password, passwordConfirmation 
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.token)
            if (response.error) console.log(response.error)
            else {
                localStorage.setItem('token', response.token)
                window.location = '/editProfile';
            }
        })
        .catch(error => console.log(error))
    }

    render() {
        const { fullname, email, password, passwordConfirmation } = this.state;

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
                    minHeight: '90%'
                }}>
                    <button onClick={this.props.handleClose} style={{alignSelf:'end', border: 0, backgroundColor: 'transparent', cursor:'pointer'}}> X </button>
                    <p style={{'border-bottom': '2px solid #0070A8','padding-bottom': '2.1vh', fontSize:25, width: '100%', textAlign: 'center'}}> Cadastro </p>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Nome completo*
                        <input onChange={e => this.setState({fullname: e.target.value})} value={fullname} type="text" name="name" style={{ borderRadius: 5, width:300, height:35 }} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Email institucional*
                        <input onChange={e => this.setState({email: e.target.value})} value={email} type="text" name="email" style={{ borderRadius: 5, width:300, height: 35 }} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Senha*
                        <input onChange={e => this.setState({password: e.target.value})} value={password} type="password" name="password" style={{ borderRadius: 5, width:300, height: 35 }} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Confirmação da senha*
                        <input onChange={e => this.setState({passwordConfirmation: e.target.value})} value={passwordConfirmation} type="password" name="passwordConfirmation" style={{ borderRadius: 5, width:300, height: 35 }} />
                    </div>
                    <button onClick={this.handleSubmit} style={{ borderRadius: 5, width:300, height: 35, backgroundColor: '#0070A8', color:'white', cursor:'pointer' }}>
                        Cadastrar
                    </button>
                    ou
                    <button style={{ borderRadius: 5, width:300, height:40, backgroundColor: 'white', cursor:'pointer' }}>
                        <img src={google} alt="google"  style={{ width: 15, marginRight: 15 }} />
                        Cadastrar com o Google
                    </button>
                    <div style={{fontSize:10, textAlign:'center'}}>
                        Ao continuar você concorda com os nossos <br/>
                        <button onClick={this.props.handleClose} style={{border: 0, backgroundColor: 'transparent', cursor:'pointer'}}>
                            <Link to="/terms" style={{border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: '#0070A8'}}> Termos e Politica de Privacidade </Link>
                        </button>
                    </div>
                    <div>
                        Já tem uma conta ? 
                        <button onClick={() => {this.props.handleClose(); this.props.openLogin();}} style={{border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: '#0070A8', cursor:'pointer'}}> Faça seu login </button>
                    </div>
                </div>
          </div>
      );
    }
  }