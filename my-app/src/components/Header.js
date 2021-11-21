import React from 'react';
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
        boxShadow: '0px 1px 6px 1px rgba(0, 0, 0, 0.2)',
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
        fontSize: '18px',
    },
    itemHeaderHover: {
      marginLeft: 51,
      marginRight: 51,
      color: '#5F5F5F',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingTop: '3.6vh',
      paddingBottom: '3.1vh',
      borderBottom: '4px solid #5F5F5F',
    },
    itemHeaderSelected: {
      marginLeft: 51,
      marginRight: 51,
      color: '#0070A8',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingTop: '3.6vh',
      paddingBottom: '3.1vh',
      borderBottom: '4px solid #0070A8',
    },
    icons: {
      marginRight: 5,
      marginTop: '-3px',
      borderBottom: 'none !important',
    },
    logo: {
        width: 120,
        height: 50,
        objectFit: 'contain',
    },
    user: {
        width: 20,
        marginRight: 10,
    },
    loginButton: {
        border: 0, 
        backgroundColor: 'transparent', 
        cursor:'pointer', 
        fontSize: '18px', 
        color: '#586973'
    },
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { hoverExplore: false, hoverCategories: false, hoverForYou: false, hoverAnalitics: false, showSubmenu: false };
    }

    changeHoverExplore = () => this.setState({hoverExplore: !this.state.hoverExplore});
    changeHoverCategories = () => this.setState({hoverCategories: !this.state.hoverCategories});
    changeHoverForYou = () => this.setState({hoverForYou: !this.state.hoverForYou});
    changeHoverAnalitics = () => this.setState({hoverAnalitics: !this.state.hoverAnalitics});
    handleSubmenu = () => this.setState({ showSubmenu: !this.state.showSubmenu });

    render() {
        const { currentPage, context } = this.props;
        const { hoverExplore, hoverCategories, hoverForYou, hoverAnalitics, showSubmenu } = this.state;
        const exploreStyle = currentPage === 'explore' ? styles.itemHeaderSelected : hoverExplore ? styles.itemHeaderHover : styles.itemHeader;
        const categoriesStyle = currentPage === 'categories' ? styles.itemHeaderSelected : hoverCategories ? styles.itemHeaderHover : styles.itemHeader;
        const forYouStyle = currentPage === 'foryou' ? styles.itemHeaderSelected : hoverForYou ? styles.itemHeaderHover : styles.itemHeader;
        const analiticsStyle = currentPage === 'analitics' ? styles.itemHeaderSelected : hoverAnalitics ? styles.itemHeaderHover : styles.itemHeader;
        const token = localStorage.getItem('token');

        return (
            <div style={styles.outside}>
                <Link to="/">
                    <img style={styles.logo} src={logo} alt="logo" />
                </Link>
                <div style={styles.items}>
                    <Link style={exploreStyle} to="/explore" onMouseEnter={this.changeHoverExplore} onMouseLeave={this.changeHoverExplore}>
                        <Icon style={styles.icons} name='compass outline' size='large'/>
                        Explorar
                    </Link>
                    <Link style={categoriesStyle} to="/categories" onMouseEnter={this.changeHoverCategories} onMouseLeave={this.changeHoverCategories}>
                        <Icon style={styles.icons} name='th large' size='large'/>
                        Categorias
                    </Link>
                    <Link style={forYouStyle}  to="/foryou" onMouseEnter={this.changeHoverForYou} onMouseLeave={this.changeHoverForYou}>
                        <Icon idstyle={styles.icons} name='lightbulb outline' size='large'/>
                        Para Você
                    </Link>
                    <Link style={analiticsStyle} to="/analitics" onMouseEnter={this.changeHoverAnalitics} onMouseLeave={this.changeHoverAnalitics}>
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
                            <a onClick={this.handleSubmenu} style={{ display: 'flex', color: '#5F5F5F', cursor:'pointer' }}>
                                <img alt="Imagem de perfil" style={{ width: 20, height: 20, borderRadius: 25, marginRight: 10 }} src={google}></img>
                                <p style={{ fontSize: '18px' }}> Professor </p>
                            </a>
                            { showSubmenu && <DropDownMenu onMouseLeave={this.handleSubmenu}/> }
                        </div>
                        : 
                        <button onClick={context().handleLogin} style={styles.loginButton}>
                            <Icon name='user circle' size='large' style={{ marginLeft:10, marginRight: 5, marginTop: '-3px'}}/>
                            Login
                        </button>
                    }
                </div>
            </div>
        );
    }
  }