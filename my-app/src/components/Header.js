import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import google from '../images/google.png';
import DropDownMenu from './DropDownMenu';

const styles = {
    outside: {
        height: '10vh',
        backgroundColor: '#FAFAFA',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 70,
        paddingRight: 70,
        'box-shadow': '0px 1px 6px 1px rgba(0, 0, 0, 0.2)',
    },
    items: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemHeader: {
        marginRight: 52,
        marginLeft: 52,
        color: '#5F5F5F',
        'font-size': '18px',
    },
    itemHeaderHover: {
      marginLeft: 51,
      marginRight: 51,
      color: '#5F5F5F',
      'font-size': '18px',
      'font-weight': 'bold',
      'padding-top': '3.6vh',
      'padding-bottom': '3.1vh',
      'border-bottom': '4px solid #5F5F5F',
    },
    itemHeaderSelected: {
      marginLeft: 51,
      marginRight: 51,
      color: '#0070A8',
      'font-size': '18px',
      'font-weight': 'bold',
      'padding-top': '3.6vh',
      'padding-bottom': '3.1vh',
      'border-bottom': '4px solid #0070A8',
    },
    icons: {
      marginRight: 5,
      'margin-top': '-3px',
      'border-bottom': 'none !important',
    },
    logo: {
        width: 120,
        height: 50,
        'object-fit': 'contain',
    },
    user: {
        width: 20,
        marginRight: 10,
    }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hoverExplore: false};
    this.state = {hoverCategories: false};
    this.state = {hoverForYou: false};
    this.state = {hoverAnalitics: false};
    this.state = {showSubmenu:false};
  }

    render() {
        const { currentPage, onLogin } = this.props;
        const { hoverExplore, hoverCategories, hoverForYou, hoverAnalitics, showSubmenu } = this.state;
        const token = localStorage.getItem('token');

      return (
          <div style={styles.outside}>
                <Link to="/">
                    <img style={styles.logo} src={logo} alt="logo" />
                </Link>
                <div style={styles.items}>
                    <Link style={currentPage === 'explore' ? styles.itemHeaderSelected : hoverExplore ? styles.itemHeaderHover : styles.itemHeader} to="/explore" onMouseEnter={() => this.setState({hoverExplore: true})} onMouseLeave={() => this.setState({hoverExplore: false})}>
                        <Icon style={styles.icons} name='compass outline' size='large'/>
                        Explorar
                    </Link>
                    <Link style={currentPage === 'categories' ? styles.itemHeaderSelected : hoverCategories ? styles.itemHeaderHover : styles.itemHeader} to="/categories" onMouseEnter={() => this.setState({hoverCategories: true})} onMouseLeave={() => this.setState({hoverCategories: false})}>
                        <Icon style={styles.icons} name='th large' size='large'/>
                        Categorias
                    </Link>
                    <Link style={currentPage === 'foryou' ? styles.itemHeaderSelected : hoverForYou ? styles.itemHeaderHover : styles.itemHeader}  to="/foryou" onMouseEnter={() => this.setState({hoverForYou: true})} onMouseLeave={() => this.setState({hoverForYou: false})}>
                        <Icon idstyle={styles.icons} name='lightbulb outline' size='large'/>
                        Para Você
                    </Link>
                    <Link style={currentPage === 'analitics' ? styles.itemHeaderSelected : hoverAnalitics ? styles.itemHeaderHover : styles.itemHeader} to="/analitics" onMouseEnter={() => this.setState({hoverAnalitics: true})} onMouseLeave={() => this.setState({hoverAnalitics: false})}>
                        <Icon style={styles.icons} name='chart line' size='large'/>
                        Análises
                    </Link>
                </div>
                <div style={{ display: 'flex', flexDirection:'row' }}>
                    <Link to="/notification">
                        <Icon name='bell outline' size='large'/>
                    </Link>
                    {
                        token ?
                        <div>
                            <a onClick={() => this.setState({ showSubmenu: !showSubmenu })} style={{ display: 'flex', color: '#5F5F5F', cursor:'pointer' }}>
                                <img style={{ width: 20, height: 20, borderRadius: 25, marginRight: 10 }} src={google}></img>
                                <p style={{ fontSize: '18px' }}> Professor </p>
                            </a>
                            { showSubmenu && <DropDownMenu/> }
                        </div>
                        : 
                        <button onClick={onLogin} style={{ border: 0, backgroundColor: 'transparent', cursor:'pointer', 'font-size': '18px', color: '#586973' }}>
                            <Icon name='user circle' size='large' style={{ marginLeft:10, marginRight: 5, 'margin-top': '-3px'}}/>
                            Login
                        </button>
                    }
                </div>
          </div>
      );
    }
  }