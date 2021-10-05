import React from 'react';
import logo from '../images/CPP2.png';
import user from '../images/noUser.png';

const styles = {
    outside: {
        height: '7vh',
        backgroundColor: '#F1F1F1',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {
        width: 90,
    },
    user: {
        width: 20,
        marginRight: 10,
    },
    itemHeader: {
        marginRight: 10
    }
}

export default class Header extends React.Component {

    render() {
      return (
          <div style={styles.outside}>
                <img style={styles.logo} src={logo} alt="logo" />
                <div>
                    <a style={styles.itemHeader}>Explorar</a>
                    <a style={styles.itemHeader}>Categorias</a>
                    <a style={styles.itemHeader}>Pra Você</a>
                    <a style={styles.itemHeader}>Análises</a>
                </div>
                <div>
                    <img style={styles.user} src={user} alt="user" />
                    Login
                </div>
          </div>
      );
    }
  }