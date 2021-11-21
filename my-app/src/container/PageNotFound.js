
import React from 'react';
import Container from './Container';
import { Player } from '@lottiefiles/react-lottie-player';

export default class PageNotFound extends React.Component {
    render() {
      return (
        <Container {...this.props}>
            <Player autoplay={true} loop={true} controls={false} src="https://assets8.lottiefiles.com/packages/lf20_rz0hyab1.json" style={{ height: '536px' }}/>
        </Container>
      );
    }
  }