import React from 'react';
import { Icon } from 'semantic-ui-react';

const styles = {
    labelInput:{
      background: '#ffffff',
      padding: '0px 8px',
      position: 'absolute',
      marginLeft: '12px',
      marginTop: '-3px',
      color: '#333D42',
    },
    input:{
      height: '64px',
      width: '100%',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '21px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    inputButton:{
      height: '64px',
      width: '100%',
      padding: '10px 71px 10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '21px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    textAreaInput:{
      height: '200px',
      width: '100%',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '21px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    buttons:{
      background: '#ffffff',
      position: 'absolute',
      height: '60px',
      width: '57px',
      marginTop: '10px',
      borderLeft: '1px solid #333D42',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: 'none',
      left: '32%',
      paddingLeft: '16px',
    },
    icons:{
      color: '#049DBF',
    }
}

//rendering inputs
function InputComponent(props){
  if(props.type === "select"){
    return (<select name={props.name} style={styles.input} onChange={props.changeEvent}>{props.children}</select>);
  } else {
    if(props.type === "textArea"){
      return (<textarea name={props.name} style={styles.textAreaInput} onChange={props.changeEvent}/>);
    } else{
      return (<input type="text" name={props.name} style={props.buttonExists === true? styles.inputButton : styles.input} onChange={props.changeEvent}/>);
    }
  }
}

//rendering buttons
function ButtonComponent(props){
  if(props.exists === true){
    return (<button type="submit" style={styles.buttons} onClick={props.buttonClick}><Icon style={styles.icons} name={props.icon} size='large'/></button>);
  } else {
    return (<></>);
  }
}



export default class Input extends React.Component {
    render() {
      return (
        <div style={{width:this.props.width}}>
          <p style={styles.labelInput}>{this.props.title}</p>
            <ButtonComponent exists={this.props.buttonExists} icon={this.props.buttonIcon} buttonClick={this.props.buttonClick}/>
            <InputComponent type={this.props.type} children={this.props.children} name={this.props.name} changeEvent={this.props.eventChange} buttonExists={this.props.buttonExists}/>
        </div>
      );
    }
  }
