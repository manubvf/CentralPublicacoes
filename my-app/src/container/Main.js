import '../App.css';
import logo from '../logo.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

export default class Main extends React.Component {

    render() {
      return (
        <div className="App">
            <Header/>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
          <Footer/>
        </div>
      );
    }
  }