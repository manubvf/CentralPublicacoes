import React from 'react';

const styles = {
    out: { 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    in: { 
        backgroundColor: 'rgba(255, 255, 255)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        padding: 50,
        minHeight: '60%',
        minWidth: '20%',
    },
    closeButtonLeft: {
        alignSelf: 'start', 
        border: 0, 
        backgroundColor: 'transparent', 
        cursor: 'pointer',
    },
    closeButtonRight: {
        alignSelf: 'end', 
        border: 0, 
        backgroundColor: 'transparent', 
        cursor: 'pointer',
    },
}

export default class Login extends React.Component {
    componentDidMount() {
        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.body.style.overflow = "auto";
    }

    render() {
        const { closeButtonLeft, closeButtonRight, children, handleClose } = this.props;

        return (
            <div style={styles.out}>
                <div style={styles.in}>
                    { closeButtonLeft && <button onClick={handleClose} style={styles.closeButtonLeft}> X </button> }
                    { closeButtonRight && <button onClick={handleClose} style={styles.closeButtonRight}> X </button> }
                    { children }
                </div>
          </div>
      );
    }
  }