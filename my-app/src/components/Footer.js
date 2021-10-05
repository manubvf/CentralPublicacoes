import React from 'react';

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
                <a style={styles.link}>Termos e Privacidade</a>
                <a style={styles.link}>Sobre nós</a>
            </div>
            <div>
            <p style={styles.authors}>Developed by students at Unicamp</p>

            </div>
        </div>
      );
    }
  }