import React from 'react';
import {
  Link,
} from 'react-router-dom'

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
    link: {
        color: 'gray',
        marginLeft: 20,
        marginRight: 20,
        textDecoration: 'underline',
    },
    authors: {
        color: 'gray',
        fontSize: 10,
    }
}

export default class Footer extends React.Component {

    render() {
      return (
        <div style={styles.outside}>
            <div>
                <Link style={styles.link} to="/terms">Termos e Privacidade</Link>
                <Link style={styles.link} to="/aboutus">Sobre nós</Link>
            </div>
            <div>
            <p style={styles.authors}>Developed by students at Unicamp</p>

            </div>
        </div>
      );
    }
  }