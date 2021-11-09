import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

const styles = {
    cardsContainer: {
        display: 'flex',
        gridGap: '62px',
        marginRight: '8%',
        width: '84%',
        marginLeft: '8%',
    },
    header:{
      textAlign: 'left',
      fontSize: 20,
      color: '#333D42',
      paddingLeft: '8.5%',
      marginBottom: 35,
    },
    arrowIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '46px',
      height: '66px',
      border: '1px solid #586973',
      borderRadius: '8px',
      color: '#586973',
    },
  };

  export default class CardCarousel extends React.Component {
//só nao sei se passo os dados e leio tudo aqui ou se já passo os objetos como children

    render() {
      return (
          <>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <p style={styles.header}>Com base em nao sei o que</p>
              <Link style={styles.moreLink}>Ver mais +</Link>
            </div>
            <div style={{ display:"flex", flexDirection:'row', alignItems:'center', width:'96%' }}>
            <Icon style={styles.arrowIcon} name="angle left" size='large'/>
            <div style={styles.cardsContainer}>
              <ProjectSummary title="Gerenciamento de Saúde Populacional Baseada em Inteligência Artificial" category="Inteligência Artificial" authors={["Sandra Avila","Luiz Sérgio Carvalho","Andrei Sposito"]} interested={2390000} tags={["Tag 1","Tag2","Tag3"]}/>
              <ProjectSummary title="Sensitive Media Analysis through Deep Learning Architectures" category="Deep Learning" authors={["Anderson de Rezende Rocha"]} interested={150000} tags={["Tag 1"]}/>
              </div>
            <Icon style={styles.arrowIcon} name="angle right" size='large'/>
            </div>
          </>
      );
    }
  }
