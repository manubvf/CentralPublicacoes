import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class LoaderComponent extends React.Component {
    render() {
        return (
            <Dimmer active inverted>
                <Loader size='large'>Carregando</Loader>
            </Dimmer>
        );
    }
  }