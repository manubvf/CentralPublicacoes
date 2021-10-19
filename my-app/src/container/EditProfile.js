import React from 'react';
import Container from './Container';
import { Icon, Checkbox } from 'semantic-ui-react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {information: [], infoText: '', fileSelected: null};
    }

    deleteInfo = (info) => {
        let { information } = this.state;
        information = information.filter(item => item !== info );
        this.setState({information});
    }

    infoExist = (info) => {
        let exists = false;
        this.state.information.map(item => { if (item === info) exists = true; })
        return exists;
    }

    addInfo = () => {
        if (!this.state.infoText) return null;
        if (this.infoExist(this.state.infoText)) return null;

        const { information } = this.state;
        information.push(this.state.infoText);
        this.setState({information, infoText: ''});
    }

    fileSelectedHandler = (e) => {
        this.setState({fileSelected: URL.createObjectURL(e.target.files[0])})
    }

    renderInfo = (info) => {
        return(
            <div style={{borderRadius: 15, fontSize:11, backgroundColor: '#F1F1F1', paddingLeft: 10, paddingRight: 5, border: '1px solid #586973', marginLeft:10}}>
                {info}
                <button onClick={() => this.deleteInfo(info)} style={{marginLeft:5, color: '#586973', border: 'none', cursor:'pointer'}}> x </button>
            </div>
        )
    }

    render() {
        return (
        <Container>
            <p style={{textAlign:'left', fontSize:30, paddingLeft: '8%' }}>Editar perfil</p>
            <div style={{display: 'flex', flexDirection:'column', alignItems: 'center' }}>
                <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width:150, height:150, marginRight: 10}}>
                        {this.state.fileSelected ? <img style={{width:100, height:100, borderRadius:5}} src={this.state.fileSelected}/> : <Icon name='user' size='huge' style={{margin:10}}/>}
                        <input ref={fileInput => this.fileInput = fileInput} style={{ display:'none' }} type="file" onChange={this.fileSelectedHandler}/>
                        <button onClick={() => this.fileInput.click()} style={{ background: 'white', border: 'none', color: '#0070A8', cursor:'pointer' }}> 
                            {this.state.fileSelected ? 'Mudar foto' : 'Adicionar uma foto'}
                        </button>
                    </div>
                    <div>
                        <div style={{display: 'flex', flexDirection:'column', textAlign: 'left'}}>
                            Nome:
                            <input type="text" name="name" style={{ borderRadius: 10, width:500, height:35, border: '1px solid #586973' }} />
                        </div>
                        <div style={{display: 'flex', flexDirection:'row', marginTop: 10}}>
                            <div style={{display: 'flex', flexDirection:'column', textAlign: 'left'}}>
                                Curso:
                                <input type="text" name="name" style={{ borderRadius: 10, width:240, height:35, border: '1px solid #586973' }} />
                            </div>
                            <div style={{display: 'flex', flexDirection:'column', textAlign: 'left', marginLeft: 20}}>
                                Link do currículo Lattes:
                                <input type="text" name="name" style={{ borderRadius: 10, width:240, height:35, border: '1px solid #586973' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'left', marginTop: 30, marginBottom: 30}}>
                    Informações para contato:
                    <div>
                        <input onChange={e => this.setState({infoText: e.target.value})} value={this.state.infoText} type="text" style={{ borderRadius: 10, width:300, height:35, border: '1px solid #586973' }} />
                        <button onClick={this.addInfo} style={{ borderRadius: 10, width:35, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF' }}>
                            +
                        </button>
                        <Checkbox checked label='Deixar as informações de contato públicas' style={{ fontSize: 12, marginLeft: 20 }} />
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', marginTop: 10}}>
                        {this.state.information.map((item) => this.renderInfo(item))}
                    </div>
                </div>
                <div style={{margin: 10}}>
                    <button style={{ borderRadius: 10, width:100, height:35, backgroundColor: '#FFFFFF', color:'#0070A8', cursor:'pointer', border: '1px solid #0070A8' }}>
                        Cancelar
                    </button>
                    <button style={{ borderRadius: 10, width:100, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF', marginLeft: 10 }}>
                        Salvar
                    </button>
                </div>
            </div>
          </Container>
      );
    }
  }