import React from 'react';
import logo from '../images/logo.png';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

const styles = {
    outside: {
        height: '10vh',
        backgroundColor: '#F1F1F1',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    items: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 90,
    },
    user: {
        width: 20,
        marginRight: 10,
    },
    itemHeader: {
        marginRight: 50,
        marginLeft: 50,
        color: 'black',
    }
}

export default class Header extends React.Component {

    render() {
      return (
          <div style={styles.outside}>
                <Link to="/">
                    <img style={styles.logo} src={logo} alt="logo" />
                </Link>
                <div style={styles.items}>
                    <Link style={styles.itemHeader} to="/explore">
                        <Icon name='compass' />
                        Explorar
                    </Link>
                    <Link style={styles.itemHeader} to="/categories">
                        <Icon name='th' />
                        Categorias
                    </Link>
                    <Link style={styles.itemHeader} to="/foryou">
                        <Icon name='lightbulb outline' />
                        Pra Você
                    </Link>
                    <Link style={styles.itemHeader} to="/analitics">
                        <Icon name='chart line' />
                        Análises
                    </Link>
                </div>
                <div>
                    <Link to="/notification">
                        <Icon name='bell outline'/>
                    </Link>
                    <button onClick={this.props.onLogin} style={{border: 0, backgroundColor: 'transparent', cursor:'pointer'}}>
                        <Icon name='user circle outline' size='large' style={{ marginLeft:10 }}/>
                        Login
                    </button>
                </div>
          </div>
      );
    }
  }