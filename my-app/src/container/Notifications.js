
import React from 'react';
import Container from './Container';
import NotificationItem from '../components/NotificationItem';

export default class Notifications extends React.Component {
    constructor(props) {
      super(props);
      this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    handleConfirmation(event){
      console.log("EVENTO ", event.target.id);
    }

    render() {
      return (
        <Container>
          <p style={{ fontSize:30, paddingLeft: '4%' }}>Notificações</p>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4%', marginRight: '4%'}}>
            <NotificationItem type="like" userName="Hilda" projectTitle="Título do projeto" date="15 Fev 2021"/>
            <NotificationItem type="newFile" userName="Frida" projectTitle="Título da pesquisa" date="12 Fev 2021" needsConfirmation={true} confirmationEvent={this.handleConfirmation}/>
            <NotificationItem type="newProject" userName="David"  projectTitle="Título de qualquer coisa" date="3 Fev 2021" needsConfirmation={true} confirmationEvent={this.handleConfirmation}/>
          </div>
        </Container>
      );
    }
  }
