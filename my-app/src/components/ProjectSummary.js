import React from 'react';
import categoryFlag from '../images/categoryFlag.png';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

var title = "Título";

var numInterested = "0";

const styles = {
    card: {
        width: '70.5vh',
        height: '230px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
    },
    category: {
      float: 'right',
      marginTop: '-20px',
      marginRight: '-10px',
    },
    categoryImage: {
        width: '199px',
        height: '55px',
        objectFit: 'contain',
    },
    categoryTitle: {
      position: 'absolute',
      width: '199px',
      height: '55px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '17px',
      paddingLeft: '22px',
      justifyContent: 'center',
      color: '#3B3B3B',
    },
    title:{
      paddingTop: '10px',
      marginLeft: '4.5vh',
      textAlign: 'left',
      width: '42vh',
      color: '#333D42',
    },
    interested:{
      color: '#586973',
      fontSize: '15px',
      textAlign: 'right',
      paddingRight: '24px',
      float: 'right',
      marginTop: '59px',
      marginRight: '-181px',
    },
    authorsContainer: {
      color: '#586973',
      fontSize: '17px',
      marginTop: '24px',
      textAlign: 'left',
      marginLeft: '4.5vh',
      marginBottom: '30px',
    },
    authorLink: {
      color: '#586973',
    },
    authorLinkHover:{
      color: '#586973',
      borderBottom: 'solid thin',
    },
    tagsContainer:{
      marginLeft: '37px',
      marginRight: '37px',
      display: 'flex',
      position: 'relative',
      bottom: '3px',
    },
    tagMediumBlue:{
      background: '#9FD8F9',
      position: 'relative',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '4px',
      paddingBottom: '4px',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#333D42',
      marginRight: '16px'
    },
    tagLightBlue:{
      background: '#C4F4FF',
      position: 'relative',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '4px',
      paddingBottom: '4px',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#333D42',
      marginRight: '16px'
    },
    tagDarkBlue:{
      background: '#7DCCDD',
      position: 'relative',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '4px',
      paddingBottom: '4px',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#333D42',
      marginRight: '16px'
    }
};

function createAuthorElement(element, index){
   if(index === 0){
     return (<Link to="/" style={styles.authorLink}>{element}</Link>);
   } else{
     return (<Link to="/" style={styles.authorLink}>, {element}</Link>);
   }
 };

 //handling list of authors
function AuthorLink(props) {
   let array = props.authors;
   let code;
   let size = array.length > 5 ? 5 : array.length;
   for (var i = 0; i < size; i++) {
     code = [code, createAuthorElement(array[i], i),];
   }
   if(array.length > 5){
     code = [code, "..."];
   }
   return(code);
 };

 function createTagElement(element, styleIndex){
   if(styleIndex === 1){
     return (<div style={styles.tagMediumBlue}>{element}</div>);
   }
   if(styleIndex === 2){
     return (<div style={styles.tagLightBlue}>{element}</div>);
   }
   if(styleIndex === 3){
     return (<div style={styles.tagDarkBlue}>{element}</div>);
   }
 };

//handling list of tags
 function TagsList(props){
    let array = props.tags;
    let code;
    let arrayStyles = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]; //all possible order of styles
    var styleIndex = Math.floor(Math.random() * 6) + 1;
    let style = arrayStyles[styleIndex-1];
    for (var i = 0;i < array.length; i++){
        code = [code, createTagElement(array[i], style[i]),];
    }
    return(code);
 };

export default class ProjectSummary extends React.Component {

    constructor(props) {
      super(props);

      //handling title's length
      title = props.title;
      if (props.title.length > 50) {
        let t = title.substr(0,50);
        title = t.concat("...");
      }

      //handling the format of number of interested string
      let value = this.props.interested;
      if(this.props.interested > 1000 && this.props.interested < 1000000){
        value = value / 1000;
        value = value + " mil";
      } else{
        if(this.props.interested > 1000000){
          value = value / 1000000;
          value = value + " M";
        }
      }
      numInterested = value + " interessados";
    }

    render() {
      return (
          <div style={styles.card}>
            <div style={styles.category}>
              <p style={styles.categoryTitle}>{this.props.category}</p>
              <img style={styles.categoryImage} src={categoryFlag} alt=""/>
            </div>
            <div style={styles.interested}>{numInterested}
              <Icon style={{paddingLeft: '7px'}} name='star outline' />
            </div>
            <h2 style={styles.title}>{title}</h2>
            <div style={styles.authorsContainer}>
              <AuthorLink authors={this.props.authors}/>
            </div>
            <div style={styles.tagsContainer}>
              <TagsList tags={this.props.tags}/>
            </div>
          </div>
      );
    }
  }
