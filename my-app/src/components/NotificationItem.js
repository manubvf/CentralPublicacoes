import React from 'react';
import star from '../images/starNotification.png';
import addFile from '../images/addFileNotification.png';
import addProject from '../images/addProjectNotification.png';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

const styles = {
    itemContainer: {
        display: 'flex',
        borderBottom: '1px solid #B5BBBF',
        width: '100%',
        marginBottom: 14,
    },
    icon:{
      width: 29,
      height: 29,
      objectFit: 'contain',
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#333D42',
      marginLeft: 15,
      marginTop: 3,
    },
    link: {
      color: "#0070A8",
      textDecoration: 'underline',
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: 5,
      marginLeft: 3,
    },
    subtitle:{
      fontSize: 15,
      color: '#586973',
      marginTop: 4,
      marginLeft: 6,
      marginRight: 7,
    },
    date:{
      fontSize: 15,
      color: '#586973',
      marginTop: 4,
      position: 'absolute',
      right: '10%',
    },
    button:{
      cursor: 'pointer',
      color: '#0070A8',
      fontSize: 26,
      marginLeft: 3,
      marginTop: 2,
    },
  };

  export default class NotificationItem extends React.Component {

    constructor(props) {
      super(props);

      let iconImg = this.props.type === "like" ? star : addFile;
      if (this.props.type === "newProject"){
        iconImg = addProject;
      }

      let titleText = this.props.type === "like" ? " demonstrou interesse em seu projeto " : " adicionou um novo documento ao projeto ";
      if (this.props.type === "newProject"){
        titleText = " te definiu como um dos autores do projeto ";
      }

      let subtitleText = this.props.type === "newProject" ? " - Você é autor desse projeto? " : " - Você concorda com a mudança? ";

      this.state = {icon: iconImg, text: titleText, subtitle: subtitleText};
    }

    render() {
      return (
          <div style={styles.itemContainer}>
            <img style={styles.icon} src={this.state.icon}/>
            <p style={styles.title}>{this.props.userName}{this.state.text}</p>
            <Link style={styles.link} to="/">“{this.props.projectTitle}”</Link>
            { this.props.needsConfirmation === true ? <p style={styles.subtitle}>{this.state.subtitle}</p>:null}
            { this.props.needsConfirmation === true ? <Icon style={styles.button} name="check circle" size='large' id="ok" onClick={this.props.confirmationEvent}/>:null}
            { this.props.needsConfirmation === true ? <Icon style={styles.button} name="times circle outline" size='large' id="no" onClick={this.props.confirmationEvent}/>:null}
            <p style={styles.date}>{this.props.date}</p>
          </div>
      );
    }
  }


  /*************************************************
  NotificationItem Component Documentation:

  - Props:
    - type: "like", "newFile", "newProject"
    - userName: user who "sent" the notification
    - projectTitle
    - projectLink
    - date

  - Optional Props:
    - needsConfirmation
    - confirmationEvent: icon onClick event

  ************************************************/
