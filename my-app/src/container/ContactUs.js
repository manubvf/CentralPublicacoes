
import React from 'react';
import Container from './Container';
import Input from '../components/Input';
import '../Theme.css';
import LoaderComponent from '../components/LoaderComponent';

export default class ContactUs extends React.Component {
  constructor (props) {
    super(props);

    this.state = { loading: false, reason: '', message: '', email: '' }
  }

  handleReasonChange = (e) => this.setState({ reason: e.target.value });
  handleMessageChange = (e) => this.setState({ message: e.target.value });
  handleEmailChange = (e) => this.setState({ email: e.target.value });
  handleSubmit = async () => {
    const { reason, message, email } = this.state;
    if (reason === '' || message === '' || email === '') {
      console.log('Faltam dados!')
      return null;
    }

    this.setState({ loading: true });

    return fetch(`http://127.0.0.1:5000/backend`, {
      'method':'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ 
        function: 'contact',
        reason, message, email
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        console.log(response.error)
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        this.props.handleClose();
      }
    })
    .catch(error => {
      console.log(error); 
      this.setState({ loading: false });
    })
  }

  render() {
    const { reason, message, email, loading } = this.state;

    return (<>
        {loading && <LoaderComponent/>}
        <Container>
        <div style={{ marginLeft:250, marginRight:250, flexDirection: 'column', display: 'flex' }}>
          <p style={{ fontSize:30 }}> Contacte-nos </p>
          <p style={{ fontSize:14 }}> Os campos assinalados com (*) são obrigatórios </p>
          <p style={{ fontSize:16 }}> O que você tem a dizer é muito importante para nós. Para que possamos melhor atendê-lo, selecione abaixo o tipo de atendimento desejado e preencha corretamente o formulário adequado à sua solicitação. </p>
          <div style={{ marginTop: 40 }}>
            <Input title='Você deseja enviar um(a) *:' type="select" name="reason" value={reason} width="100%" eventChange={this.handleReasonChange}>
              <option value="">-</option>
              <option value="reclamacao">Reclamação</option>
              <option value="conselho">Conselho</option>
            </Input>
          </div>
          <Input title='E-mail pra contato *:' type="input" name="email" value={email} width="100%" eventChange={this.handleEmailChange}/>
          <Input title='Mensagem ou observação *:' type="textArea" name="message" value={message} width="100%" eventChange={this.handleMessageChange}/>
          <button className="mediumBlueButton" style={{ width: 100, marginTop: 40, alignSelf: 'flex-end' }} onClick={this.handleSubmit} > Salvar </button>
        </div>
      </Container>
    </>);
  }
}