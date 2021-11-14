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
      marginBottom: 40,
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
    arrowDisable: {
      minWidth: '46px',
      height: '66px',
      border: '1px solid #fff',
      background: "#fff",
    },
    moreLink:{
      cursor: 'pointer',
      color: '#0070A8',
      textDecoration: 'underline',
    },
  };

  export default class CardCarousel extends React.Component {

    constructor(props) {
      super(props);

      var childrenSize = 0;
      if(this.props.children !== undefined){
        childrenSize = this.props.children.length > 1 ? this.props.children.length : 1;
      }

      var index = -1;
      if(childrenSize >= 1){
        if(childrenSize >= this.props.numberVisible){
          index = this.props.numberVisible-1;
        }else{
          index = childrenSize-1;
        }
      }

      this.state = {visibleCards: [], size: childrenSize, endIndex: index};


      if(this.state.size >= 1){
          const { visibleCards } = this.state;
          if(this.state.size === 1){
            visibleCards.push(this.props.children);
          }else{
            for (var i = 0; i <= index; i++) {
              visibleCards.push(this.props.children[i]);
            }
          }
        this.setState({ visibleCards });
      }

      this.arrowClick = this.arrowClick.bind(this);
    }

    arrowClick(event){
      const arrowDirection = event.target.id;
      let index = this.state.endIndex;
      let auxArray = [];
      if(arrowDirection === "right"){
        for (let i = 0; i <= this.props.numberVisible-1; i++) {
          auxArray.unshift(this.props.children[this.state.endIndex+1-i]);
        }
        index++;
      }else{
        for (let i = 0; i <= this.props.numberVisible-1; i++) {
          auxArray.unshift(this.props.children[this.state.endIndex-1-i]);
        }
        index--;
      }
      this.setState({visibleCards: auxArray});
      this.setState({endIndex: index});
    }

    render() {
      return (
          <div style={{marginBottom:60}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <p style={styles.header}>{this.props.title}</p>
              <div style={styles.moreLink} onClick={this.props.seeMoreClick}>Ver mais +</div>
            </div>
            <div style={{ display:"flex", flexDirection:'row', alignItems:'center', width:'96%' }}>
            {this.state.endIndex < this.props.numberVisible ? <div style={styles.arrowDisable}></div> : <Icon style={styles.arrowIcon} name="angle left" size='large' id="left" onClick={this.arrowClick}/>}
            <div style={styles.cardsContainer}>{this.state.visibleCards}</div>
            {(this.state.endIndex < this.state.size-1 && this.props.numberVisible > 0) ? <Icon style={styles.arrowIcon} name="angle right" size='large' id="right" onClick={this.arrowClick}/> : <div style={styles.arrowDisable}></div>}
            </div>
          </div>
      );
    }
  }
