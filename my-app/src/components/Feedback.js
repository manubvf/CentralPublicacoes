import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Modal from './Modal';

const styles = {
    img: {
        width: 200, 
        height: 200, 
        margin: 20
    },
    title: {
        fontSize: 25, 
        width: '70%', 
        textAlign: 'center',
    },
}

{/* <Feedback ok message="Projeto de pesquisa criado com sucesso!" linkText="Ver página do projeto" link="/"/> */}

export default class Login extends React.Component {
    render() {
        const { ok, notOk, message, link, linkText, handleClose } = this.props;
        return (
            <Modal closeButtonRight handleClose={handleClose}>
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column', width: '250px' }}>
                    {message && <p style={styles.title}> {message} </p>}
                    {ok && <Player style={styles.img} autoplay={true} loop={true} controls={true} src="https://assets8.lottiefiles.com/packages/lf20_4qldwfx4.json"/>}
                    {notOk && <Player style={styles.img} autoplay={true} loop={true} controls={false} src="https://assets4.lottiefiles.com/packages/lf20_j3UXNf.json"/>}
                    {linkText && link && <a href={link}> {linkText} </a>}
                </div>
            </Modal>
      );
    }
  }