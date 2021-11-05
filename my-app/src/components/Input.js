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
    labelTextArea:{
      background: '#ffffff',
      padding: '0px 8px',
      position: 'absolute',
      marginLeft: '12px',
      marginTop: '-215px',
      color: '#333D42',
    },
    input:{
      height: '44px',
      width: '101%',
      position: 'absolute',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '16px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    inputButton:{
      height: '64px',
      width: '101%',
      position: 'absolute',
      padding: '10px 16% 10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '16px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    inputIcon:{
      height: '64px',
      width: '101%',
      position: 'absolute',
      padding: '10px 17px 10px 43px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '16px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    extraComponents:{
      height: '64px',
      width: '101%',
      position: 'absolute',
      padding: '10px 16% 10px 43px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '16px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    textAreaInput:{
      height: '200px',
      width: '100%',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '16px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    buttons:{
      background: '#ffffff',
      position: 'relative',
      height: '60px',
      width: '57px',
      marginTop: '10px',
      borderLeft: '1px solid #333D42',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: 'none',
      float: 'right',
      paddingLeft: '16px',
    },
    iconRight:{
      color: '#049DBF',
    },
    iconLeft:{
      color: '#333D42',
      position: 'absolute',
      marginTop: '30px',
      marginLeft: '13px',
    },
}

//rendering inputs
function InputComponent(props){
  if(props.type === "select"){
    return (<select name={props.name} value={props.value} placeholder={props.placeholder} style={styles.input} onChange={props.changeEvent}>{props.children}</select>);
  } else {
    if(props.type === "textArea"){
      return (<textarea name={props.name} value={props.value}  placeholder={props.placeholder} style={styles.textAreaInput} onChange={props.changeEvent}/>);
    } else{
      let inputStyle;
      if(props.buttonIcon !== undefined && props.iconName !== undefined){
          inputStyle = styles.extraComponents;
      }else{
        if(props.buttonIcon !== undefined){
            inputStyle = styles.inputButton;
        }else{
          if(props.iconName !== undefined){
              inputStyle = styles.inputIcon;
          }else{
              inputStyle = styles.input;
          }
        }
      }
      return (<input type={props.type} value={props.value} placeholder={props.placeholder} name={props.name} style={inputStyle} onChange={props.changeEvent}/>);
    }
  }
}

//rendering buttons
function ExtraComponents(props){
  let code;
  if(props.buttonIcon !== undefined){
    code = [code, <button type="submit" style={styles.buttons} onClick={props.buttonClick}><Icon style={styles.iconRight} name={props.buttonIcon} size='large'/></button>,];
  } else {
    code = [code, <></>,];
  }
  if(props.iconName !== undefined){
    code = [code, <Icon style={styles.iconLeft} name={props.iconName} size='large'/>,];
  } else {
    code = [code, <></>,];
  }
  return (code);
}



export default class Input extends React.Component {
    render() {
      return (
        <div style={{position: 'relative', marginBottom: '20px', width:this.props.width, height: this.props.type === "textArea" ? '200px' : '64px'}}>
            <InputComponent type={this.props.type} children={this.props.children} placeholder={this.props.placeholder} name={this.props.name} value={this.props.value} changeEvent={this.props.eventChange} iconName={this.props.iconName} buttonIcon={this.props.buttonIcon}/>
            <ExtraComponents iconName={this.props.iconName} buttonIcon={this.props.buttonIcon} buttonClick={this.props.buttonClick}/>
            <p style={this.props.type === "textArea" ? styles.labelTextArea : styles.labelInput}>{this.props.title}</p>
        </div>
      );
    }
  }

  /*************************************************
  Input Component Documentation:

  - Props:
    - type: "text", "select", "textArea", "password" - the select items are received as children
    - title: input title
    - width
    - eventChange: input onChange event

  - Optional Props:
    - name: input name
    - iconName: the icon name from semantic-ui library
    - buttonIcon: the icon name from semantic-ui library
    - buttonClick: button onClick event
    - placeholder: exists for text and textArea

  ************************************************/
