import React from 'react';

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
    }
}

//rendering inputs
function InputComponent(props){
  if(props.type === "select"){
    return (<select name={props.name} style={styles.input} onChange={props.changeEvent}>{props.children}</select>);
  } else {
    return (<input type="text" name={props.name} style={styles.input} onChange={props.changeEvent} />);
  }
}

export default class Input extends React.Component {
    render() {
      return (
        <div style={{width:this.props.width}}>
          <p style={styles.labelInput}>{this.props.title}</p>
            <InputComponent type={this.props.type} children={this.props.children} name={this.props.name} changeEvent={this.props.eventChange}/>
        </div>
      );
    }
  }
