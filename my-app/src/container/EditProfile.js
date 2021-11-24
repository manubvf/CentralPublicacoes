import React from 'react';
import Container from './Container';
import { Icon, Checkbox } from 'semantic-ui-react';
import Input from '../components/Input';
import '../Theme.css';

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
    infos: {display: 'flex', flexDirection:'row', marginTop: 10, marginBottom: 30, alignItems: 'left'},
    checkbox: { fontSize: 12, marginLeft: 20 },
}

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {information: [], infoText: '', fileSelected: null, fullname: '', course: '', lattes: ''};
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token)  {
            console.log('Nenhum usuário relacionado');
            window.location.href = '/404';
        }

        fetch('http://127.0.0.1:5000/backend/getuser',{
            'methods':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                token
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) console.log(response.error)
            else  {
                this.setState({
                    fullname: response.fullname,
                    information: [
                        response.email_pessoal,
                        response.email_institucional,
                        response.telefone,
                    ],
                    course: response.curso,
                    lattes: response.lattes,
                })
            }
            // { research_gate, git}
        })
        .catch(error => console.log(error))
    }

    deleteInfo = (info) => {
        let { information } = this.state;
        information = information.filter(item => item !== info );
        this.setState({information});
    }

    infoExist = (info) => {
        let exists = false;
        this.state.information.map(item => { if (item === info) exists = true; return null; });
        return exists;
    }

    addInfo = () => {
        if (!this.state.infoText) return null;
        if (this.infoExist(this.state.infoText)) return null;

        const { information } = this.state;
        information.push(this.state.infoText);
        this.setState({ information, infoText: '' });
    }

    fileSelectedHandler = (e) => {
        if (!e || !e.target || !e.target.files || e.target.files.length === 0) return null;
        this.setState({fileSelected: URL.createObjectURL(e.target.files[0])})
    }

    renderInfo = (info, index) => {
        return(
            <div key={index} style={{borderRadius: 15, fontSize:11, backgroundColor: '#F1F1F1', paddingLeft: 10, paddingRight: 5, border: '1px solid #586973', marginLeft:10}}>
                {info}
                <button onClick={() => this.deleteInfo(info)} style={{marginLeft:5, color: '#586973', border: 'none', cursor:'pointer'}}> x </button>
            </div>
        )
    }

    handleInfosChange = e => this.setState({infoText: e.target.value})
    handleFullnameChange = e => this.setState({fullname: e.target.value})
    handleCourseChange = e => this.setState({course: e.target.value})
    handleLattesChange = e => this.setState({lattes: e.target.value})

    render() {
        const { fullname, course, lattes } = this.state;

        return (
            <Container {...this.props}>
                <p style={{ fontSize:30, paddingLeft: '8%' }}>Editar perfil</p>
                <div style={styles.outside}>
                    <div style={styles.principalInfos}>
                        <div style={styles.photoDiv}>
                            {this.state.fileSelected
                                ? <img style={styles.photo} alt="sem imagem" src={this.state.fileSelected}/>
                                : <Icon name='user' size='huge' style={{ margin:10 }}/>}
                            <input ref={fileInput => this.fileInput = fileInput} style={{ display:'none' }} type="file" onChange={this.fileSelectedHandler}/>
                            <button onClick={() => this.fileInput.click()} style={styles.buttonLink}>
                                {this.state.fileSelected ? 'Mudar foto' : 'Adicionar uma foto'}
                            </button>
                        </div>
                        <div>
                            <Input title='Nome' value={fullname} type="text" width='500px' eventChange={this.handleFullnameChange}/>
                            <div style={styles.courseLattesDiv}>
                                <Input title='Curso' value={course} width="240px"  type="text" eventChange={this.handleCourseChange}/>
                                <Input title='Link do currículo Lattes' value={lattes} width="240px" type="text" style={{marginLeft: 20}} eventChange={this.handleLattesChange}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{marginTop: 20, display: 'flex', alignItems: 'center'}}>
                            <Input title='Informações para contato' value={this.state.infoText} type="text" width="350px" eventChange={this.handleInfosChange} buttonIcon="plus" buttonClick={this.addInfo}/>
                            <Checkbox label='Deixar as informações de contato públicas' style={styles.checkbox} />
                        </div>
                        <div style={styles.infos}>
                            {this.state.information.map((item, index) => this.renderInfo(item, index))}
                        </div>
                    </div>
                    <div style={{margin: 10}}>
                        <button className="mediumWhiteButton" style={{ width: 100 }}> Cancelar </button>
                        <button className="mediumBlueButton" style={{ width: 100, marginLeft: 20 }}> Salvar </button>
                    </div>
                </div>
            </Container>
        );
    }
  }
