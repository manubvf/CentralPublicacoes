import React from 'react';
import Modal from './Modal';
import Input from '../components/Input';

const styles = {
    title: {
        borderBottom: '2px solid #FF0000',
        paddingBottom: '2.1vh', 
        fontSize: 25, 
        width: '100%', 
        textAlign: 'center',
    },
    filterDropDown:{
      height: '35',
      width: '25',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '15px',
      color: '#5f5f5f',
    },
    infos: {display: 'flex', flexDirection:'row', marginTop: 10},
    addInfoButton: { borderRadius: 10, width:40, height:40, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF', marginLeft: 5 },
    cancelButton: { borderRadius: 10, width:100, height:35, backgroundColor: '#FFFFFF', color:'#0070A8', cursor:'pointer', border: '1px solid #0070A8' },
    reportButton: { borderRadius: 10, width:100, height:35, backgroundColor: '#0070A8', color:'white', cursor:'pointer', border: '1px solid #FFFFFF', marginLeft: 10 },
}

export default class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {information: [], filter: '', reason: ''};
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
        if (!this.state.filter) return null;
        if (this.infoExist(this.state.filter)) return null;

        const { information } = this.state;
        information.push(this.state.filter);
        this.setState({ information });
    }

    handleInputChange = (event) => this.setState({ filter: event.target.value });
    handleTextAreaChange = (event) => this.setState({ reason: event.target.value });

    submit = () => {
        if (this.state.information.length === 0) { console.log('Escolha um motivo e o adicione'); return null; }
        if (this.state.reason === '') { console.log('Descreva o motivo da denúncia'); return null; }

        console.log('Tudo certo');
    }

    renderInfo = (info) => {
        return(
            <div style={{borderRadius: 15, fontSize:13, backgroundColor: '#F1F1F1', paddingLeft: 10, paddingRight: 5, border: '1px solid #586973', marginLeft:10}}>
                {info}
                <button onClick={() => this.deleteInfo(info)} style={{marginLeft:5, color: '#586973', border: 'none', cursor:'pointer'}}> x </button>
            </div>
        )
    }

    render() {
        const { handleClose } = this.props;
        const { reason, information, filter } = this.state;

        return (
            <Modal closeButtonRight handleClose={handleClose}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '400px', textAlign: 'start' }}>
                    <p style={styles.title}> Denunciar projeto </p>
                    <p style={{ fontWeight: 'bold', fontSize: 18 }}>Porque você está denunciando este projeto de pesquisa?</p>
                    <p style={{ color: '#586973' }}>Não se preocupe, sua denúncia será anônima e analisada por moderadores</p>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10}}>
                        <Input title='Motivos *'> 
                            <select name="filter" style={styles.filterDropDown} value={filter} onChange={this.handleInputChange}>
                                <option value="">-</option>
                                <option value="Conteudo impróprio">Conteudo impróprio</option>
                                <option value="Violação de propriedade intelectual">Violação de propriedade intelectual</option>
                            </select>
                        </Input>
                        <button onClick={this.addInfo} style={styles.addInfoButton}> + </button>
                    </div>
                    <div style={styles.infos}>
                        {information.map((item) => this.renderInfo(item))}
                    </div>
                    <Input title="Explique o motivo da denúncia *" style={{margin:20}}>
                        <textarea value={reason} onChange={this.handleTextAreaChange} style={{ width: '100%', height: 120, borderRadius: 10, border: '1px solid #000000', padding:20 }} />
                    </Input>
                    <div style={{ margin: 10 , alignSelf: 'center'}}>
                        <button style={styles.cancelButton} onClick={handleClose}> Cancelar </button>
                        <button style={styles.reportButton} onClick={this.submit}> Denunciar </button>
                    </div>
                </div>
            </Modal>
      );
    }
  }