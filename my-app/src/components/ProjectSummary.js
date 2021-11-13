import React from 'react';
import categoryFlag from '../images/categoryFlag.png';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

const styles = {
    card: {
        width: '100%',
        minHeight: '230px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        minWidth: '300px',
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
      color: '#333D42',
      inlineSize: '49%',
      overflow: 'hidden',
      maxHeight: '70px',
      fontSize: '21px',
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
     return (<Link key={index} to="/" style={styles.authorLink}>{element}</Link>);
   } else{
     return (<Link key={index} to="/" style={styles.authorLink}>, {element}</Link>);
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

 function createTagElement(index, element, styleIndex){
   if(styleIndex === 1){
     return (<div key={index} style={styles.tagMediumBlue}>{element}</div>);
   }
   if(styleIndex === 2){
     return (<div key={index} style={styles.tagLightBlue}>{element}</div>);
   }
   if(styleIndex === 3){
     return (<div key={index} style={styles.tagDarkBlue}>{element}</div>);
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
        code = [code, createTagElement(i, array[i], style[i]),];
    }
    return(code);
 };

//handling the format of number of interested string
 function InterestedNumber(props){
   let value = props.interested;
   if(props.interested > 1000 && props.interested < 1000000){
     value = value / 1000;
     value = value + " mil";
   } else{
     if(props.interested > 1000000){
       value = value / 1000000;
       value = value + " M";
     }
   }
   const numInterested = value + " interessados";
   return (<div style={styles.interested}>{numInterested}<Icon style={{paddingLeft: '7px'}} name='star outline' /></div>);
 }

export default class ProjectSummary extends React.Component {
    render() {
      return (
          <div style={styles.card}>
            <div style={styles.category}>
              <p style={styles.categoryTitle}>{this.props.category}</p>
              <img style={styles.categoryImage} src={categoryFlag} alt=""/>
            </div>
            <InterestedNumber interested={this.props.interested}/>
            <h2 style={styles.title}>{this.props.title.length > 35 ? this.props.title.substr(0,35) : this.props.title}{this.props.title.length > 35 ? "..." : ""}</h2>
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
