import React from 'react';
import google from '../images/google.png';

export default class Login extends React.Component {

    render() {
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
                        <input type="text" name="name" style={{ borderRadius: 5, width:300, height:30 }} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        Senha:
                        <input type="text" name="name" style={{ borderRadius: 5, width:300, height:30 }} />
                    </div>
                    <a style={{alignSelf:'start', cursor:'pointer'}}> Esqueceu a senha? </a>
                    <button style={{ borderRadius: 5, width:300, height:30, backgroundColor: '#0070A8', color:'white', cursor:'pointer' }}>
                        Entrar
                    </button>
                    ou
                    <button style={{ borderRadius: 5, width:300, height:30, backgroundColor: 'white', cursor:'pointer' }}>
                        <img src={google} alt="google"  style={{ width: 14, marginRight: 10 }} />
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