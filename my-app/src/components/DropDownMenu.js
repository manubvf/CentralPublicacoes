import React from 'react';

const styles = {
    out: { 
        position: 'absolute', 
        top: '65px', 
        width: '200px', 
        right: '20px', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        background: '#FAFAFA',
        border: '1px solid #E5E5E5'
    },
    item: { 
        padding: 10, 
        textAlign:'center', 
        borderBottom: '1px solid #B5BBBF', 
        color: '#5F5F5F', 
        cursor:'pointer'
    }
}

export default class DropDownMenu extends React.Component {
    logOff = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    render() {
        return (
            <div style={styles.out} onMouseLeave={this.props.onMouseLeave}>
                <a href='/notification' style={styles.item}>Notificações</a>
                <a href='/newProject' style={styles.item}>Novo projeto de pesquisa</a>
                <a href='/myProfile' style={styles.item}>Meu perfil</a>
                <a href='/editProfile' style={styles.item}>Editar perfil</a>
                <a href='/' onClick={this.logOff} style={styles.item}>Deslogar</a>
            </div>
        )
    }
}
