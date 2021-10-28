
import React from 'react';
import Container from './Container';

export default class Categories extends React.Component {
    constructor(props){
      super(props)
      this.state = {articles:[]}
    }

    componentDidMount(){
      fetch('http://127.0.0.1:5000/articles',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => this.setState({articles:response}))
    .catch(error => console.log(error))
    }
    render() {
      const ArticleList = (props) => {

        return (
            <div className="mt-2">
            {/* Display the article details if article is not None */} 
            {props.articles && props.articles.map(article =>{
                return (
    
                  <div key= {article.id}>
                    <h2 className="text-primary"> { article.title} </h2>
                    <p> { article.body } </p>
                    <p> { article.date } </p>
                    <hr/>
                  </div>
                )
    
                })}
            </div>
            )
    }
    console.log(this.state.articles)
      return (
        <div className="App container m-4">
     <div className="row">
      <div className="text-center">
      <h1>Connecting a React Frontend to a Flask Backend.</h1>
      </div>
    </div>

     <a>{this.state.articles}</a> 

    </div>
      );
    }
  }