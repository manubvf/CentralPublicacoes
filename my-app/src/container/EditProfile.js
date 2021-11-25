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

        this.state = {
            curso: null,
            email_institucional: "",
            email_pessoal: null,
            fullname: "",
            img_path: null,
            lattes: "",
            research_gate: null,
            telefone: null,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token)  {
            console.log('Nenhum usuário relacionado');
            window.location.href = '/404';
        }

        this.props.context.handleLoading();

        fetch(`http://127.0.0.1:5000/backend/getuser`, {
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                token
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                console.log(response.error); 
            } else {
                console.log(response); 
                this.setState(response, () => this.init = this.state);
            }
            this.props.context.handleLoading();
        })
        .catch(error => {
            console.log(error); 
            this.props.context.handleLoading();
        })
    }

    fileSelectedHandler = (e) => {
        if (!e || !e.target || !e.target.files || e.target.files.length === 0) return null;
        this.setState({img_path: URL.createObjectURL(e.target.files[0])})
    }

    handleFullnameChange = e => this.setState({fullname: e.target.value});
    handleCourseChange = e => this.setState({course: e.target.value});
    handleLattesChange = e => this.setState({lattes: e.target.value});
    handleEmailPessoalChange = e => this.setState({email_pessoal: e.target.value});
    handleTelefoneChange = e => this.setState({telefone: e.target.value});
    handleResearchGateChange = e => this.setState({research_gate: e.target.value});
    handleSubmit = () => {
        const { curso, email_institucional, email_pessoal, fullname, img_path,  lattes, 
            research_gate, telefone } = this.state;
        const token = localStorage.getItem('token');

        this.props.context.handleLoading();
        
        if (this.state !== this.init) {
            fetch(`http://127.0.0.1:5000/backend/edituser`, {
                'method':'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ 
                    token, curso, email_institucional, email_pessoal, fullname, img_path,
                    lattes, research_gate, telefone
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    console.log(response.error); 
                } else {
                    console.log(response); 
                }
                this.props.context.handleLoading();
            })
            .catch(error => { 
                console.log(error); 
                this.props.context.handleLoading();
            });
        }

        window.location.href = '/myProfile';
    }

    render() {
        const { curso, email_institucional, email_pessoal, fullname, img_path, lattes, research_gate, telefone } = this.state;

        return (
            <Container {...this.props}>
                <p style={{ fontSize:30, paddingLeft: '8%' }}>Editar perfil</p>
                <div style={styles.outside}>
                    <div style={styles.principalInfos}>
                        <div style={styles.photoDiv}>
                            {img_path
                                ? <img style={styles.photo} alt="sem imagem" src={img_path}/>
                                : <Icon name='user' size='huge' style={{ margin:10 }}/>}
                            <input ref={fileInput => this.fileInput = fileInput} style={{ display:'none' }} type="file" onChange={this.fileSelectedHandler}/>
                            <button onClick={() => this.fileInput.click()} style={styles.buttonLink}>
                                {img_path ? 'Mudar foto' : 'Adicionar uma foto'}
                            </button>
                        </div>
                        <div>
                            <Input title='Nome' value={fullname} type="text" width='700px' eventChange={this.handleFullnameChange}/>
                            <div style={styles.courseLattesDiv}>
                                <Input title='Curso' value={curso} width="320px"  type="text" eventChange={this.handleCourseChange}/>
                                <Input title='Link do currículo Lattes' value={lattes} width="360px" type="text" style={{marginLeft: 20}} eventChange={this.handleLattesChange}/>
                            </div>
                        </div>
                    </div>
                    <div style={{alignSelf:'flex-start', marginLeft: '20%'}}>
                        <Input title='Email Institucional' value={email_institucional} type="text" width='500px'/>
                        <Input title='Email Pessoal' value={email_pessoal} type="text" width='500px' eventChange={this.handleEmailPessoalChange}/>
                        <Input title='Telefone' value={telefone} type="text" width='500px' eventChange={this.handleTelefoneChange}/>
                        <Input title='Research Gate' value={research_gate} type="text" width='500px' eventChange={this.handleResearchGateChange}/>
                    </div>
                    <div style={{ alignSelf: 'flex-end' }}>
                        <button className="mediumBlueButton" style={{ width: 100, marginLeft: 20 }} onClick={this.handleSubmit}> Salvar </button>
                    </div>
                </div>
            </Container>
        );
    }
  }
