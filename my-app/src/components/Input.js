import React from 'react';

const styles = {
    labelInput:{
      background: '#ffffff',
      padding: '0px 8px',
      position: 'absolute',
      marginLeft: '12px',
      marginTop: '-8px',
      color: '#333D42',
    },
    filterDropDown:{
      height: '64px',
      width: '28vh',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '21px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
}

export default class Input extends React.Component {
    render() {
      return (
        <label style={this.props.style}>
          <p style={styles.labelInput}> {this.props.title} </p>
          {this.props.children}
        </label>
      );
    }
  }
