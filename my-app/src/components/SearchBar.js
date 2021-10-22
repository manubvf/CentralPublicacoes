import React from 'react';
import searchIcon from '../images/searchIcon.png';
import searchPlusIcon from '../images/searchPlusIcon.png';

const styles = {
    form:{
      display: 'flex',
      flexDirection: 'row',
    },
    labelInput:{
      background: '#ffffff',
      padding: '0px 8px',
      position: 'absolute',
      marginLeft: '12px',
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
    filterContainer:{
      marginRight: '20px',
    },
    searchInput:{
      height: '64px',
      width: '65vh',
      padding: '10px 17px',
      borderRadius: '8px',
      border: '1.5px solid #333D42',
      fontSize: '21px',
      color: '#5f5f5f',
      marginTop: '8px',
    },
    searchInputContainer:{
      marginRight: '12px',
    },
    submitButton:{
      background: '#049DBF',
      height: '64px',
      width: '64px',
      borderRadius: '10px',
      border: 'none',
      marginTop: '8px',
    },
    submitButtonContainer:{
      marginRight: '170px',
    },
    searchItem:{
      background: '#f1f1f1',
      height: '34px',
      borderRadius: '20px',
      border: '1.5px solid #5f5f5f',
      marginTop: '8px',
      marginRight: '15px',
      padding: '5px 14px 5px 14px',
      color: '#5f5f5f',
      fontSize: '15px',

    },
    searchItemsContainer:{
      marginTop: '15px',
      marginLeft: '25px',
      display: 'flex',
      flexDirection: 'row',
    },
    closeIcon:{
      color: '#5f5f5f',
      float: 'right',
      fontSize: '20px',
      marginTop: '-2px',
      marginLeft: '10px',
      cursor:'pointer'
    },
    addSearchItem:{
      height: '34px',
      borderRadius: '20px',
      border: '1.5px solid #049DBF',
      marginTop: '8px',
      marginRight: '15px',
      padding: '5px 14px',
      color: '#049DBF',
      fontSize: '15px',
      fontWeight: 'bold',
      cursor:'pointer'
    },
};

function createSearchItemsElement(str, index, e){
    return (<div style={styles.searchItem} onClick={e}>{str}<div id={index} style={styles.closeIcon}>x</div></div>);
 };

//handling search items
function SearchItems(props) {
  let array = props.searchArray;
  let code;
  for (var i = 0; i < array.length; i++) {
    code = [code, createSearchItemsElement(array[i], i, props.closeEvent),];
  }
  return(code);
};

//handling searchItemsContainer
function SearchItemsContainer(props){
  if(props.visible){
    return (<div style={styles.searchItemsContainer}><SearchItems searchArray={props.searchArray} closeEvent={props.closeEvent}/><div style={styles.addSearchItem} onClick={props.addMoreEvent}>adicionar mais  +</div></div>);
  } else {
    return (<></>);
  }
}

export default class ProjectSummary extends React.Component {

    constructor(props) {
      super(props);
      this.state = {filter: 'título', search: '', searchArray:[]};

      this.searchInput = React.createRef();

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
      this.handleAddMoreClick = this.handleAddMoreClick.bind(this);
    }

    handleInputChange(event){
      const nameState = event.target.name;
      this.setState({[nameState]: event.target.value});
      event.target.focus();
    }

    handleSubmit(event) {
      var str = this.state.search;
      const strTrim = str.trim();
      if(strTrim.length > 0){
        var array = this.state.searchArray;
        str = this.state.filter + ": " + this.state.search;
        const index = array.indexOf(str);
        if(index < 0){
          array.push(str);
          this.setState({searchArray: array});
        }
      } else{
        alert('A barra de pesquisa deve estar preenchida com um termo!');
      }
      event.preventDefault();
    }

    handleDeleteItem(event){
      var array = this.state.searchArray;
      array.splice(event.target.id, 1);
      this.setState({searchArray: array});
    }

    handleAddMoreClick(event){
      this.searchInput.current.focus();
    }

    render() {
      return (
        <div>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <label style={styles.filterContainer}>
            <p style={styles.labelInput}>Filtrar por </p>
            <select name="filter" style={styles.filterDropDown} value={this.state.filter} onChange={this.handleInputChange}>
              <option value="título">Título</option>
              <option value="categoria">Categoria</option>
              <option value="autor">Autor</option>
              <option value="tag">Tag</option>
            </select>
          </label>
          <label style={styles.searchInputContainer}>
            <input type="text" ref={this.searchInput}  name="search" value={this.state.search} placeholder="Pesquisar" style={styles.searchInput} onChange={this.handleInputChange} />
          </label>
          <div style={styles.submitButtonContainer}>
            <input type="image" src={this.state.searchArray.length > 0 ? searchPlusIcon: searchIcon} alt="Pesquisar" style={styles.submitButton}/>
          </div>
          <label style={styles.filterContainer}>
              <p style={styles.labelInput}>Ordenar por </p>
              <select style={styles.filterDropDown} value={this.state.filter} onChange={this.handleFilterChange}>
                <option value="title"> </option>
              </select>
          </label>
        </form>
        <SearchItemsContainer visible={this.state.searchArray.length > 0 ? true : false} searchArray={this.state.searchArray} closeEvent={this.handleDeleteItem} addMoreEvent={this.handleAddMoreClick}/>
      </div>
      );
    }
  }
