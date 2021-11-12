
import React from 'react';
import Container from './Container';
import Input from '../components/Input';
import Modal from '../components/Modal';
import '../Theme.css';
import LoaderComponent from '../components/LoaderComponent';
import { Icon } from 'semantic-ui-react';

const MAX_AUTHORS = 10;
const MAX_TAGS = 3;
const MAX_ATTACHMENT = 20;
const TAGS_COLOR = ['#84BBDB', '#49B4F1', '#70CAFF']

const styles = {
  outside: { display: 'flex', flexDirection:'column', alignItems: 'center' },
  principalInfos: { display: 'flex', flexDirection:'row', alignItems: 'center' },
  photoDiv: { display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width:150, height:150, marginRight: 10 },
  photo: { width:150, height:150, borderRadius:5 },
  buttonLink: { background: 'white', border: 'none', color: '#0070A8', cursor:'pointer' },
  addInfoButton: { borderRadius: 10, width:35, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF' },
  courseLattesDiv: {display: 'flex', flexDirection:'row', marginTop: 10, justifyContent: 'space-between'},
  cancelButton: { borderRadius: 10, width:100, height:35, backgroundColor: '#FFFFFF', color:'#0070A8', cursor:'pointer', border: '1px solid #0070A8' },
  saveButton: { borderRadius: 10, width:100, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF', marginLeft: 10 },
  tags: {display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30, alignItems: 'left'},
  attachments: {display: 'flex', flexDirection:'column', marginBottom: 30, alignItems: 'left'},
  checkbox: { fontSize: 12, marginLeft: 20 },
  subMenu: { 
    position: 'absolute', 
    width: '110px', 
    overflow: 'hidden', 
    borderRadius: 5,
    marginTop: 30,
    display: 'flex', 
    flexDirection: 'column', 
    background: '#FAFAFA',
    border: '1px solid #E5E5E5'
  },
  subMenuItem: { 
    padding: 5, 
    textAlign:'left', 
    borderBottom: '1px solid #B5BBBF', 
    cursor:'pointer',
    color: 'black',
  },
  title: {
      borderBottom: '2px solid #0070A8',
      paddingBottom: '2.1vh',
      fontSize: 25,
      width: '100%',
      textAlign: 'center',
  },
}

export default class NewProject extends React.Component {
  constructor (props) {
    super(props);

    this.state = { 
      loading: false, 
      subMenuAttachment: false, 
      showNewLink: false,
      showNewFile: false,
      reason: '', 
      message: '', 
      email: '', 
      title: '', 
      category: '', 
      description: '', 
      beginDate: '', 
      endDate: '', 
      tagText: '',
      authorText: '', 
      linkText: '', 
      linkNameText: '', 
      docNameText: '',
      fileSelected: null,
      tags: [], 
      authors: ['Rebeca Stroh'],
      attachments: [],
    }
  }

  deleteTag = (tag) => {
      let { tags } = this.state;
      tags = tags.filter(item => item !== tag );
      this.setState({tags});
  }

  tagExist = (tag) => {
      let exists = false;
      this.state.tags.map(item => { if (item === tag) exists = true; return null; });
      return exists;
  }

  addTag = () => {
      const { tags, tagText } = this.state;
      if (!tagText) return null;
      if (this.tagExist(tagText)) return null;
      if (tags.length === MAX_TAGS) return null;

      tags.push(tagText);
      this.setState({ tags, tagText: '' });
  }

  deleteAuthor = (author) => {
    let { authors } = this.state;
    authors = authors.filter(item => item !== author );
    this.setState({authors});
  }

  authorExist = (author) => {
      let exists = false;
      this.state.authors.map(item => { if (item === author) exists = true; return null; });
      return exists;
  }

  addAuthor = () => {
      const { authors, authorText } = this.state;

      if (!authorText) return null;
      if (this.authorExist(authorText)) return null;
      if (authors.length === MAX_AUTHORS) return null;

      authors.push(authorText);
      this.setState({ authors, authorText: '' });
  }

  deleteAttachment = (attachment) => {
    let { attachments } = this.state;
    attachments = attachments.filter(item => item !== attachment );
    this.setState({attachments});
  }

  handleTagChange = (e) => this.setState({ tagText: e.target.value });
  handleDescriptionChange = (e) => this.setState({ description: e.target.value });
  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleCategoryChange = (e) => this.setState({ category: e.target.value });
  handleAuthorChange = (e) => this.setState({ authorText: e.target.value });
  handleBeginDateChange = (e) => this.setState({ beginDate: e.target.value });
  handleEndDateChange = (e) => this.setState({ endDate: e.target.value });
  handleLinkChange = (e) => this.setState({ linkText: e.target.value });
  handleLinkNameChange = (e) => this.setState({ linkNameText: e.target.value });
  handleDocNameChange = (e) => this.setState({ docNameText: e.target.value });
  handleNewAttachment = () => this.setState({ subMenuAttachment: !this.state.subMenuAttachment });
  handleNewLink = () => this.setState({ subMenuAttachment: false, showNewLink: true });
  handleNewFile = () => this.setState({ subMenuAttachment: false, showNewFile: true });
  handleSubmit = async () => {
    const { title, category, description, beginDate, endDate, tags, authors, attachments } = this.state;
    if (title === '' || category === '' || description === '') {
      console.log('Faltam dados!')
      return null;
    }

    this.setState({ loading: true });

    let json = {};
    json.title = title;
    json.category = category;
    json.description = description;
    json.authors = authors;

    if (beginDate) json.beginDate = beginDate;
    if (endDate) json.endDate = endDate;
    if (tags.length > 0) json.tags = tags;
    if (attachments.length > 0) json.attachments = attachments;

    console.log(json)

    fetch(`http://127.0.0.1:5000/backend`, {
      'method':'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ 
        function: 'newProject', json
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        console.log(response.error)
      }
    })
    .catch(error => {
      console.log(error); 
    })
    this.setState({ loading: false });
  }

  handleDocSubmit = () => {
    const { docNameText, fileSelected, attachments } = this.state;

    if (!docNameText || !fileSelected) return;
    if (attachments.length === MAX_ATTACHMENT) return;

    const doc = { type: 'doc', text: docNameText, file: fileSelected };
    attachments.push(doc);

    this.setState({ showNewFile: false, docNameText: '', fileSelected: null });
  }

  handleLinkSubmit = () => {
    const { linkText, linkNameText, attachments } = this.state;

    if (!linkText || !linkNameText) return;
    if (attachments.length === MAX_ATTACHMENT) return;

    const link = { type: 'link', url: linkText, text: linkNameText };
    attachments.push(link);

    this.setState({ showNewLink: false, linkText: '', linkNameText: '' });
  }

  handleFileSelected = (e) => {
      if (!e || !e.target || !e.target.files || e.target.files.length === 0) return null;
      this.setState({fileSelected: e.target.files[0]})
  }

  renderTag = (tag, index) => {
    return(
      <div key={index} style={{ borderRadius: 5, fontSize:15, backgroundColor: TAGS_COLOR[index], marginBottom: 10, padding: 5, paddingLeft: 10, border: '1px solid #586973', marginLeft:10 }}>
        {tag}
        <button onClick={() => this.deleteTag(tag)} style={{ marginLeft:5, backgroundColor: TAGS_COLOR[index], border: 'none', cursor:'pointer' }}> x </button>
      </div>
    )
  }

  renderAuthor = (author, index) => {
    return(
      index === 0
      ? <div key={index} style={{ borderRadius: 15, fontSize:12, marginBottom: 10, paddingLeft: 10, paddingRight: 10, border: '1px solid #049DBF', marginLeft:10, color: '#049DBF'}}>
        VOCÊ
      </div>
      : <div key={index} style={{ borderRadius: 15, fontSize:12, backgroundColor: '#F1F1F1', marginBottom: 10, paddingLeft: 10, paddingRight: 10, border: '1px solid #586973', marginLeft:10}}>
        {author}
        <button onClick={() => this.deleteAuthor(author)} style={{ color: '#586973', border: 'none', cursor:'pointer'}}> x </button>
      </div>
    )
  }

  renderAttachment = (attachment, index) => {
    return(
      <div key={index} style={{ fontSize:15, borderBottom: '1px solid #586973', width: '100%', padding:5, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {attachment.type === 'link' ? <Icon name='linkify' color='blue' size='small' style={{ margin:10 }}/> : <Icon name='file outline' color='blue' size='small' style={{ margin:10 }}/>}
          {attachment.text}
        </div>
        <button onClick={() => this.deleteAttachment(attachment)} style={{ marginLeft:5, background: 'white', border: 'none', cursor:'pointer' }}> x </button>
      </div>
    )
  }

  renderLinkModal = () => {
    const { linkText, linkNameText } = this.state;
    return (
      <Modal closeButtonLeft handleClose={() => this.setState({ showNewLink: false })}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '400px' }}>
          <p style={styles.title} > Novo Link </p>
          <div style={{ flex: 1, width: '100%', padding: 20, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <Input title='URL:' type="input" name="linkText" width="100%" value={linkText} eventChange={this.handleLinkChange}/>
            <Input title='Nome:' type="input" name="linkNameText" width="100%" value={linkNameText} eventChange={this.handleLinkNameChange}/>
          </div>
          <button className="mediumBlueButton" style={{ width: 100, marginLeft: 5, alignSelf: 'end' }} onClick={this.handleLinkSubmit} > Adicionar </button>
        </div>
      </Modal>
    );
  }

  renderDocModal = () => {
    const { docNameText, fileSelected } = this.state;
    return (
      <Modal closeButtonLeft handleClose={() => this.setState({ showNewFile: false })}>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column', width: '400px' }}>
          <p style={styles.title} > Novo Documento </p>
          <Input title='Nome:' type="input" name="docNameText" width="100%" value={docNameText} eventChange={this.handleDocNameChange}/>
          <div style={{ color: 'rgba(0,0,0,0.6)', borderRadius: 10, border: '1px solid', flex: 1, width: '100%', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <button className="mediumBlueButton" style={{ width: 100, marginBottom: 20 }} onClick={() => this.fileInputRef.click()}> Procurar </button>
            {fileSelected ? fileSelected.name : 'Selecione o arquivo do seu documento'}
            <input ref={e => this.fileInputRef = e} type="file" hidden onChange={this.handleFileSelected}/>
          </div>
          <button className="mediumBlueButton" style={{ width: 100, marginLeft: 5, alignSelf: 'end' }} onClick={this.handleDocSubmit} > Adicionar </button>
        </div>
      </Modal>
    );
  }

  render() {
    const { loading, title, category, description, tagText, authorText, beginDate, endDate,
            subMenuAttachment, showNewLink, showNewFile, tags, authors, attachments } = this.state;

    return (<>
      {loading && <LoaderComponent/>}
      {showNewLink && this.renderLinkModal()}
      {showNewFile && this.renderDocModal()}
      <Container>
        <div style={{ marginLeft: '10%', marginRight: '10%', flexDirection: 'column', display: 'flex' }}>
          <p style={{ fontSize:30 }}> Novo projeto de pesquisa </p>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Input title='Título *:' type="input" name="title" value={title} width="70%" eventChange={this.handleTitleChange}/>
            <div style={{ marginLeft: 40, width:'30%' }}>
              <Input title='Categoria *:' type="select" name="category" value={category} eventChange={this.handleCategoryChange}>
                <option value="">-</option>
                <option value="reclamacao">Reclamação</option>
                <option value="conselho">Conselho</option>
              </Input>
            </div>
            <div style={{ marginLeft: 40, fontSize: 12, marginTop: 10 }}>
              <p> Não achou a categoria que deseja? <a href='/contactus' style={{ marginLeft: 5 }}> Entre em contato com a gente </a></p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Input title='Descrição *:' type="textArea" name="description" width="60%" value={description} eventChange={this.handleDescriptionChange}/>
            <div style={{ marginLeft: 40, width: 350 }}>
              <Input title='Tags:' type="input" name="tagText" value={tagText} eventChange={this.handleTagChange} buttonIcon="plus" buttonClick={this.addTag}/>
              <div style={styles.tags}> {tags.map((item, index) => this.renderTag(item, index))} </div>
            </div>
          </div>

          <div style={{ width:'100%', alignItems: 'center', display: 'flex', flexDirection: 'row', marginTop: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column', width:'60%' }}>
              <Input title='Autores:' type="input" name="authorText" value={authorText} width={440} eventChange={this.handleAuthorChange} buttonIcon="plus" buttonClick={this.addAuthor}/>
              <div style={styles.tags}> {authors.map((item, index) => this.renderAuthor(item, index))} </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Input title='Ano de início:' type="number" name="beginDate" value={beginDate} width={200} eventChange={this.handleBeginDateChange}/>
                <div style={{ marginLeft: 40, width: 200 }}>
                  <Input title='Estimativa de fim:' type="number" name="endDate" value={endDate} eventChange={this.handleEndDateChange}/>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'start', marginLeft: '5%' }}>
              <button className="mediumBlueButton" style={{ width: 300, marginBottom: 10 }} onClick={this.handleNewAttachment} > + Adicionar novo anexo </button>
              {subMenuAttachment && 
                <div style={styles.subMenu} onMouseLeave={this.handleNewAttachment}>
                  <a href='#' onClick={this.handleNewLink} style={styles.subMenuItem}> <Icon name='linkify' color='blue' size='small' style={{ margin:10 }}/> Link </a>
                  <a href='#' onClick={this.handleNewFile} style={styles.subMenuItem}> <Icon name='file outline' color='blue' size='small' style={{ margin:10 }}/> Arquivo </a>
                </div>
              }
              <div style={styles.attachments}> {attachments.map((item, index) => this.renderAttachment(item, index))} </div>
            </div>
          </div>
          <div style={{ alignSelf: 'flex-end', marginRight: 40 }}>
            <button className="mediumBlueButton" style={{ width: 100, marginLeft: 5 }} onClick={this.handleSubmit} > Salvar </button>
          </div>
        </div>
      </Container>
    </>);
  }
}