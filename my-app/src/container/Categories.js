
import React from 'react';
import Container from './Container';

export default class Categories extends React.Component {
    constructor(props){
      super(props)
      this.state = {articles:[]}
    }

    componentDidMount(){
      fetch('http://127.0.0.1:5000/',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => this.setState({articles: response.batata}))
    .catch(error => console.log(error))
    }

    render() {
      return (
        <div className="App container m-4">
          <h1>Connecting a React Frontend to a Flask Backend.</h1>
          <p>{this.state.articles}</p>
        </div>
      );
    }
  }