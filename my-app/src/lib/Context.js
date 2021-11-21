import React from 'react';
import Report from '../components/Report';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import LoaderComponent from '../components/LoaderComponent';

const ApplicationContext = React.createContext();

export default class Context extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            showReport: false, 
            showLogin: false, 
            showSignup: false,
            loading: false,
        }
    }

    handleReport = (id) => this.setState({ showReport: !this.state.showReport, id });
    handleLogin = () => this.setState({ showLogin: !this.state.showLogin });
    handleSignup = () => this.setState({ showSignup: !this.state.showSignup });
    handleLoading = () => this.setState({ loading: !this.state.loading });

    render() {
        const { id, showReport, showLogin, showSignup, loading } = this.state;
        return (
            <ApplicationContext.Provider
                value={{
                    handleReport: this.handleReport,
                    handleLogin: this.handleLogin,
                    handleSignup: this.handleSignup,
                }}
            >
                {loading && <LoaderComponent/>}
                {showLogin && <Login handleClose={this.handleLogin} openSignUp={this.handleSignup} context={this}/>}
                {showSignup && <SignUp handleClose={this.handleSignup} openLogin={this.handleLogin}/>}
                {showReport && <Report handleClose={this.handleReport} projectId={id}/>}
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
  }
