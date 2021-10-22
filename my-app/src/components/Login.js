import React from 'react';
import google from '../images/google.png';

const styles = {
    out: { 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    in: { 
        backgroundColor: 'rgba(255, 255, 255)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        padding: 50,
        minHeight: '80%'
    },
    closeButton: {
        alignSelf:'end', 
        border: 0, 
        backgroundColor: 'transparent', 
        cursor:'pointer'
    },
    title: {
        borderBottom: '2px solid #0070A8',
        paddingBottom: '2.1vh', 
        fontSize: 25, 
        width: '100%', 
        textAlign: 'center'
    },
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
    componentDidMount() {
        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.body.style.overflow = "auto";
    }

    render() {
        return (
            <div style={styles.out}>
                <div style={styles.in}>
                    <button onClick={this.props.handleClose} style={styles.closeButton}> X </button>
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
                </div>
          </div>
      );
    }
  }