import React from 'react';
import Container from './Container';
import { Icon, Checkbox, Input } from 'semantic-ui-react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {information: [], infoText: ''};
    }

    deleteInfo = (info) => {
        let { information } = this.state;
        information = information.filter(item => item != info );
        this.setState({information})
    }

    addInfo = () => {
        if (!this.state.infoText) return null;

        const { information } = this.state;
        information.push(this.state.infoText)
        this.setState({information, infoText: ''})
    }

    renderInfo = (info, index) => {
        return(
            <div style={{borderRadius: 15, fontSize:11, backgroundColor: '#F1F1F1', paddingLeft: 10, paddingRight: 5, border: '1px solid #586973', marginLeft:10}}>
                {info}
                <button onClick={() => this.deleteInfo(info)} style={{marginLeft:5, color: '#586973', border: 'none'}}> x </button>
            </div>
        )
    }

    render() {
        return (
        <Container>
            <p style={{textAlign:'left', fontSize:30 }}>Editar perfil</p>
            <div style={{ margin: 50 }}>
                <div style={{display: 'flex', flexDirection:'row', width: '100%', justifyContent: 'start', alignItems: 'center', margin:10}}>
                    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width:100, height:100, marginRight: 10}}>
                        <Icon name='user' size='huge' style={{margin:10}}/>
                        <a> Mudar foto </a>
                    </div>
                    <div>
                        <div style={{display: 'flex', flexDirection:'column', textAlign: 'left'}}>
                            Nome:
                            <input type="text" name="name" style={{ borderRadius: 10, width:400, height:35, border: '1px solid #586973' }} />
                            {/* <Input style={{ width:400, height:35 }} /> */}
                        </div>
                        <div style={{display: 'flex', flexDirection:'row', marginTop: 10}}>
                            <div style={{display: 'flex', flexDirection:'column', textAlign: 'left'}}>
                                Curso:
                                <input type="text" name="name" style={{ borderRadius: 10, width:190, height:35, border: '1px solid #586973' }} />
                                {/* <Input style={{ width:190, height:35 }} /> */}
                            </div>
                            <div style={{display: 'flex', flexDirection:'column', textAlign: 'left', marginLeft: 20}}>
                                Link do currículo Lattes:
                                <input type="text" name="name" style={{ borderRadius: 10, width:190, height:35, border: '1px solid #586973' }} />
                                {/* <Input style={{ width:190, height:35 }} /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'left', marginTop: 30, marginBottom: 30}}>
                    Informações para contato:
                    <div>
                        <input onChange={e => this.setState({infoText: e.target.value})} value={this.state.infoText} type="text" style={{ borderRadius: 10, width:300, height:35, border: '1px solid #586973' }} />
                        <button onClick={this.addInfo} style={{ borderRadius: 10, width:35, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF', marginRight: 10 }}>
                            +
                        </button>
                        {/* <Input label={{ basic: true, content: '+', color: 'blue' }} labelPosition='right' style={{ width:300, height:35, marginRight: 10 }} /> */}
                        <Checkbox label='Deixar as informações de contato públicas' />
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