import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const styles = {
  content: {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
    marginBottom: 30,
    minHeight: '74vh'
  }
}

export default class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {login: false, signup: false}
    }

    handleLogin = () => this.setState({login: !this.state.login})
    handleSignUp = () => this.setState({signup: !this.state.signup})

    render() {
      const {login, signup} = this.state;
      const {currentPage} = this.props;

      return (
        <div>
          {login && <Login handleClose={this.handleLogin} openSignUp={this.handleSignUp}/>}
          {signup && <SignUp handleClose={this.handleSignUp} openLogin={this.handleLogin}/>}
          <Header currentPage={currentPage} onLogin={() => this.setState({login: true})}/>
          <div style={styles.content}>
            {this.props.children}
          </div>
          <Footer/>
        </div>
      );
    }
  }