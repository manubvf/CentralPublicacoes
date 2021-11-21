import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

const styles = {
  out: { width: '100%', height: '100%', position: 'absolute', display: 'flex', flexDirection: 'column' },
  content: {
    marginBottom: 30,
    marginTop: 30,
    marginLeft: '10%', 
    marginRight: '10%',
    flex: 1,
  }
}

export default class Container extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div style={styles.out}>
          <Header {...this.props}/>

          <div style={styles.content}>
            {this.props.children}
          </div>
          
          <Footer/>
        </div>
      );
    }
  }