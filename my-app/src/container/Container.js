import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

const styles = {
  content: {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
    marginBottom: 30,
    minHeight: '74vh'
  }
}
export default class Main extends React.Component {

    render() {
      return (
        <div className="App">
          <Header/>
          <div style={styles.content}>
            {this.props.children}
          </div>
          <Footer/>
        </div>
      );
    }
  }