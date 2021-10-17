import React from 'react';
import { Icon } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom'

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
    searchIcon:{
      color: '#F1F1F1',
      position: 'absolute'
    },
};

export default class ProjectSummary extends React.Component {

    constructor(props) {
      super(props);
      this.state = {filter: 'title'};
      this.state = {search: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('Um nome foi enviado: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <label style={styles.filterContainer}>
            <p style={styles.labelInput}>Filtrar por </p>
            <select style={styles.filterDropDown} value={this.state.filter} onChange={this.handleFilterChange}>
              <option value="title">Título</option>
              <option value="category">Categoria</option>
              <option value="author">Autor</option>
              <option value="tag">Tag</option>
              </select>
          </label>
          <label style={styles.searchInputContainer}>
            <input type="text" value={this.state.search} placeholder="Pesquisar" style={styles.searchInput} onChange={this.handleSearchInputChange} />
          </label>
          <div style={styles.submitButtonContainer}>
            <input type="submit" value="" style={styles.submitButton}/>
          </div>
          <label style={styles.filterContainer}>
            <p style={styles.labelInput}>Ordenar por </p>
            <select style={styles.filterDropDown} value={this.state.filter} onChange={this.handleFilterChange}>
              <option value="title"> </option>
              </select>
          </label>
        </form>
      );
    }
  }
