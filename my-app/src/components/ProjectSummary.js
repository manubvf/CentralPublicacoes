import React from 'react';
import categoryFlag from '../images/categoryFlag.png';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

const styles = {
    card: {
        width: '70.5vh',
        height: '225px',
        backgroundColor: '#ffffff',
        'box-shadow': '0px 1px 8px rgba(0, 0, 0, 0.25)',
        'border-radius': '5px',
    },
    category: {
      float: 'right',
      'margin-top': '-20px',
      'margin-right': '-10px',
    },
    categoryImage: {
        width: '199px',
        height: '55px',
        'object-fit': 'contain',
    },
    categoryTitle: {
      position: 'absolute',
      width: '199px',
      height: '55px',
      display: 'flex',
      'align-items': 'center',
      'font-size': '17px',
      'padding-left': '22px',
      'justify-content': 'center',
      color: '#3B3B3B',
    },
    title:{
      'padding-top': '35px',
      'margin-left': '4.5vh',
      'text-align': 'left',
      width: '42vh',
      color: '#333D42',
    },
    interested:{
      color: '#586973',
      'font-size': '15px',
      'text-align': 'right',
      'margin-top': '-20px',
      'padding-right': '24px',
    },
    authorsContainer: {
      color: '#586973',
      fontSize: '17px',
      'margin-top': '27px',
      'text-align': 'left',
      'margin-left': '4.5vh',
      'margin-bottom': '30px',
    },
    authorLink: {
      color: '#586973',
    },
    authorLinkHover:{
      color: '#586973',
      'border-bottom': 'solid thin',
    },
    tagsContainer:{
      'margin-left': '37px',
      'margin-right': '37px',
      display: 'flex',
      top: '358px',
    },
    tagMediumBlue:{
      background: '#9FD8F9',
      position: 'relative',
      'padding-left': '16px',
      'padding-right': '16px',
      'padding-top': '7px',
      'padding-bottom': '7px',
      'border-radius': '8px',
      'font-size': '14px',
      color: '#333D42',
      marginRight: '16px'
    },
    tagLightBlue:{
      background: '#C4F4FF',
      position: 'relative',
      'padding-left': '16px',
      'padding-right': '16px',
      'padding-top': '7px',
      'padding-bottom': '7px',
      'border-radius': '8px',
      'font-size': '14px',
      color: '#333D42',
      marginRight: '16px'
    },
    tagDarkBlue:{
      background: '#7DCCDD',
      position: 'relative',
      'padding-left': '16px',
      'padding-right': '16px',
      'padding-top': '7px',
      'padding-bottom': '7px',
      'border-radius': '8px',
      'font-size': '14px',
      color: '#333D42',
      marginRight: '16px'
    }
}

export default class ProjectSummary extends React.Component {

//verificacao tamanho do titulo e autores
//gerenciar o vetor que vai vir como autores
//radom cor das tags

    render() {
      return (
          <div style={styles.card}>
                <div style={styles.category}>
                  <p style={styles.categoryTitle}>{this.props.category}</p>
                  <img style={styles.categoryImage} src={categoryFlag}/>
                </div>
                <h2 style={styles.title}>{this.props.title}</h2>
                <div style={styles.interested}>
                  {this.props.interested} interessados
                  <Icon style={{'padding-left': '7px'}} name='star outline' />
                </div>
                <div style={styles.authorsContainer}>
                  <Link to="/" style={styles.authorLink}>{this.props.author}</Link>,
                  <Link to="/" style={styles.authorLink}> {this.props.author}</Link>
                </div>
                <div style={styles.tagsContainer}>
                  <div style={styles.tagMediumBlue}>{this.props.tag1}</div>
                    <div style={styles.tagLightBlue}>{this.props.tag1}</div>
                      <div style={styles.tagDarkBlue}>{this.props.tag1}</div>
                </div>
          </div>
      );
    }
  }
