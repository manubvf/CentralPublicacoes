
import React from 'react';
import Container from './Container';
import categoryFlag from '../images/categoryFlag.png';
import { Icon } from 'semantic-ui-react';
import lattes from '../images/lattes.png';

const TAGS_COLOR = ['#84BBDB', '#49B4F1', '#70CAFF'];

const styles = {
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
      marginLeft: 20,
      width: '179px',
      height: '55px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 15,
      paddingLeft: '22px',
      justifyContent: 'center',
      color: '#3B3B3B',
    },
};

export default class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            category: '',
            authors: [],
            tags: [],
            startDate: '',
            endDate: '',
            interested: 0,
            description: '',
            attachments: [],
            lastUpdate: '',
            finished: false,
            isInterested: false,
            isAuthor: false,
            outdated: false,
            showInfoHover: false,
            showAuthorMenu: false,
            showAuthor: null,
        }
    }

    componentDidMount(){
        // www.loc/project/3
        if (window.location.pathname.split('/').length < 3 || window.location.pathname.split('/')[2] === '') {
            console.log('Necessário indicar o identificador do projeto de pesquisa')
            window.location.href = '/404';
        }
        const id = window.location.pathname.split('/')[2];
        const token = localStorage.getItem('token');
        
        this.setState({
            id: id,
            title: 'Titulo do projeto de pesquisa',
            category: 'Big data',
            authors: [
                { fullname: 'Nome autor 1', email: 'autor1.contato@gmail.com', lattes: 'http://lattes1.com' },
                { fullname: 'Nome autor 2', email: 'autor2.contato@gmail.com', lattes: 'http://lattes2.com' },
                { fullname: 'Nome autor 3', email: 'autor3.contato@gmail.com', lattes: 'http://lattes3.com' }
            ],
            tags: [
                'TAG 1',
                'TAG 2',
                'TAG 3',
            ],
            startDate: '2019',
            endDate: '2021',
            interested: 400,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit pharetra facilisis. Maecenas vulputate turpis nec mauris iaculis, efficitur pellentesque lectus semper. Sed aliquet lorem vitae pharetra mollis. In cursus nibh neque, a porttitor elit commodo a. Aliquam convallis cursus leo, at interdum massa sodales nec. Quisque consectetur leo non sapien pharetra iaculis. ',
            attachments: [
                { type: 'file', name: 'Documento qualquer', file: 'definir como vai ser salvo file' },
                { type: 'link', name: 'Link qualquer', link: 'http://google.com' },
            ],
            lastUpdate: '2019-03-11',
            finished: false,
            isInterested: false,
            isAuthor: true,
            outdated: false,
        });
        // TODO: GET INFOS FROM BACK
    //   fetch('http://127.0.0.1:5000/project',{
    //     'methods':'GET',
    //     headers : {
    //       'Content-Type':'application/json'
    //       },
    //       body: JSON.stringify({ 
    //           token, idProject: id
    //       })
    //   })
    //   .then(response => response.json())
    //   .then(response => {
    //     if (response.error) console.log(response.error)
    //     else  this.setState(response)
    //   })
    //   .catch(error => console.log(error))
    }

    handleInfoHover = () => this.setState({showInfoHover: !this.state.showInfoHover});
    handleAuthorMenu = () => this.setState({showAuthorMenu: !this.state.showAuthorMenu});

    showInterest = () => {
        // TODO: mostrar interesse
        const token = localStorage.getItem('token');
        const { id } = this.state;
        this.setState({ isInterested: !this.state.isInterested });
        // fetch('http://127.0.0.1:5000/interest' , {
        //     'methods':'POST',
        //     headers : {
        //     'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({ 
        //         token, idProject: id, interested: !this.state.isInterested
        //     })
        // })
        // .then(response => response.json())
        // .then(response => {
        //     if (response.error) console.log(response.error)
        //     else  {
        //         this.setState({ isInterested: !this.state.isInterested });
        //     }
        // })
        // .catch(error => console.log(error))
    }

    markAsDone = () => {
        const token = localStorage.getItem('token');
        const { id } = this.state;
        // TODO: MARK PROJECT AS DONE
        // fetch('http://127.0.0.1:5000/markAsDone' , {
        //     'methods':'POST',
        //     headers : {
        //     'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({ 
        //         token, idProject: id
        //     })
        // })
        // .then(response => response.json())
        // .then(response => {
        //     if (response.error) console.log(response.error)
        //     else  {
        //         window.location.reload();
        //     }
        // })
        // .catch(error => console.log(error))
    }

    deleteProject = () => {
        const token = localStorage.getItem('token');
        const { id } = this.state;
        // TODO: MARK PROJECT AS DONE
        // fetch('http://127.0.0.1:5000/deleteProject' , {
        //     'methods':'POST',
        //     headers : {
        //     'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({ 
        //         token, idProject: id
        //     })
        // })
        // .then(response => response.json())
        // .then(response => {
        //     if (response.error) console.log(response.error)
        //     else  {
        //         window.location.href = '/myProfile';
        //     }
        // })
        // .catch(error => console.log(error))
    }

    renderAuthor = (item, index) => {
        return (
            <div key={index} onMouseOver={() => this.setState({showAuthor: index})} onMouseLeave={() => this.setState({showAuthor: null})}>
                {index !== 0 && ','}
                <a style={{ marginLeft: index !== 0 ? 10 : 0, color: '#586973', cursor: 'pointer' }}>{item.fullname} </a>
                {this.state.showAuthor === index && <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', padding: 10, background: '#FAFAFA', borderRadius: 10, border: '1px solid #B5BBBF' }}>
                    { item.email && <a href={'mailto:'+item.email} style={{ borderBottom: '1px solid #B5BBBF', marginBottom: 10, paddingBottom: 10 }}>
                        <Icon name='mail' style={{ marginRight: 10 }}/> 
                        {item.email} 
                    </a> }
                    { item.lattes && <a href={item.lattes}>
                        <img src={lattes} alt="lattes" style={{ width: 15, height: 15, marginRight: 10 }} />
                        {item.lattes} 
                    </a> }
                </div>}
            </div>
        );
    }

    renderTag = (item, index) => {
        return (
            <div key={index} style={{ marginLeft: index !== 0 ? 10 : 0, borderRadius: 5, fontSize: 12, backgroundColor: TAGS_COLOR[index], marginBottom: 10, padding: 5, paddingLeft: 15, paddingRight: 15 }}>
                {item}
            </div>
        );
    }

    renderAttachments = (item, index) => {
        const token = localStorage.getItem('token');
        return (
            <div key={index} style={{ fontSize:15, marginLeft: 30, marginRight: 30, marginBottom: 10, padding: 5, paddingLeft: 10, paddingRight: 10, borderBottom: '1px solid #B5BBBF', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                    {item.type === 'link'? <Icon name='linkify' color="blue" /> : <Icon name='file outline' color="blue" />}
                    <p style={{ marginLeft: 10 }}> {token ? item.name : 'Anexo de pesquisa'} </p>
                </div>
                {item.type === 'link'
                ? <button className="mediumBlueButton" style={{ width: 100 }} onClick={token ? () => window.open(item.link, "_blank") : null}> Abrir </button>
                : <button className="mediumBlueButton" style={{ width: 100 }}> Download </button>} 
                {/* TODO : ADD FUNCTION TO DOWNLOAD BUTTON */}
            </div>
        );
    }

    render() {
        const { id, title, category, authors, tags, startDate, endDate, interested, description, attachments, lastUpdate, finished, outdated, isInterested, isAuthor,
            showInfoHover, showAuthorMenu } = this.state;
        const token = localStorage.getItem('token');
        
        return (
            <Container currentPage='analitics' {...this.props}>
                <div style={{ marginLeft: '15%', marginRight: '15%', marginTop: 30 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h1> {title} </h1>
                            {isAuthor && <div style={{ background: '#F1F1F1', marginLeft: 15, borderRadius: 10, padding: 5, paddingLeft: 10, paddingRight: 10, cursor: 'pointer' }}>
                                <Icon name='cog'/> {showAuthorMenu ? <Icon name='chevron up' onClick={this.handleAuthorMenu}/> : <Icon name='chevron down' onClick={this.handleAuthorMenu}/>}
                                {showAuthorMenu && <div style={{ position: 'absolute', background: '#F1F1F1', marginTop: 5, marginLeft: -5, padding: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
                                    <a href={'/newProject/'+id} style={{ borderBottom: '1px solid #B5BBBF', marginBottom: 10, paddingBottom: 10, color: '#333D42', textAlign: 'center' }}>
                                        Adicionar/Editar informações
                                    </a>
                                    <a onClick={this.markAsDone} style={{ borderBottom: '1px solid #B5BBBF', marginBottom: 10, paddingBottom: 10, color: '#333D42', textAlign: 'center' }}>
                                        Marcar como concluído
                                    </a>
                                    <a onClick={this.deleteProject} style={{ color: '#333D42', textAlign: 'center' }}>
                                        Excluir projeto
                                    </a>
                                </div>}
                            </div>}
                            {finished
                            ? <div style={{ borderRadius: 15, border: '2px solid #008550', marginLeft: 15, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, height: 35, color: '#008550', fontSize: 12 }}> Concluído </div>
                            : outdated && <div style={{ borderRadius: 15, border: '2px solid #E46117', marginLeft: 15, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, height: 35, color: '#E46117', fontSize: 12 }}> Desatualizado </div>
                            }
                        </div>
                        <div style={styles.category}>
                            <p style={styles.categoryTitle}>{category}</p>
                            <img style={styles.categoryImage} src={categoryFlag} alt=""/>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {authors.map((item, index) => this.renderAuthor(item, index))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ marginRight: 5, color: finished ? '#008550' : outdated && '#E46117' }}> {startDate} </p>
                            <p style={{ color: finished ? '#008550' : outdated && '#E46117' }}> - </p>
                            {endDate ? <p style={{ marginLeft: 5, color: finished ? '#008550' : outdated && '#E46117' }}> {endDate} </p> : '?'}
                            <div>
                            { finished 
                                ? <Icon name='check circle outline' style={{ marginLeft: 10, cursor: 'pointer' }} color="green" onMouseOver={this.handleInfoHover} onMouseLeave={this.handleInfoHover}/>
                                : <Icon name='info circle' style={{ marginLeft: 10, cursor: 'pointer' }} onMouseOver={this.handleInfoHover} onMouseLeave={this.handleInfoHover}/>
                            }
                            {showInfoHover && <div style={{ position: 'absolute', background: '#F1F1F1', padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 10, marginLeft: -120 }}>
                                { finished ? 'Tempo em que o projeto ficou em curso' : 'Ano estimado para a conclusão' }
                            </div>}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {tags.map((item, index) => this.renderTag(item, index))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ marginRight: 5 }}> {interested} </p>
                            interessados
                            {token && <a onClick={this.showInterest} style={{ marginLeft: 10, cursor: 'pointer', color: 'black' }}>
                                {isInterested ? <Icon name='star'/> : <Icon name='star outline'/>}
                            </a>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #B5BBBF', marginTop: 15 }}>
                        <p style={{ margin: 15, color: '#5F5F5F' }}> {description} </p>
                        <a onClick={() => {this.props.context().handleReport(id)}} style={{ alignSelf: 'end', color: '#B70000', textDecoration: 'underline', cursor: 'pointer' }}> 
                            <Icon name='warning sign' style={{ marginRight: 10 }}/>
                            Denunciar projeto 
                        </a>
                    </div>
                    {!token ?
                        <div style={{ position: 'relative', marginTop: 40, marginBottom: 40, height: 300}}>
                            <div style={{ filter:'blur(15px)', background: 'rgba(212, 212, 212)', width: '100%', height: '100%', position: 'absolute' }}> </div>
                            <div style={{ display: 'flex', padding: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}>
                                <Icon name='lock' style={{ marginBottom: 20 }} size='massive' color='blue'/>
                                <p style={{ color: '#022B59', fontSize: 20}}>Esta informação esta disponível apenas para usuários cadastrados</p>
                                <a onClick={() => this.props.context().handleLogin()} style={{ fontSize: 18, cursor: 'pointer', textDecoration: 'underline' }}>Faça seu login</a>
                            </div>
                        </div>
                    :
                        <div style={{marginTop: 40, marginBottom: 40}}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: 20 }}> Documentos </p>
                                <p style={{ fontSize: 13, color: '#022B59' }}> Última atualização: {lastUpdate} </p>
                            </div>
                            <div>
                                {attachments.map((item, index) => this.renderAttachments(item, index))}
                            </div>
                        </div>
                    }
                </div>
            </Container>
        );
    }
  }