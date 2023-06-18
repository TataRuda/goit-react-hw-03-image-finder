import PropTypes from 'prop-types'; 
import React from 'react';
import css from './Seacrhbar.module.css';

export class Searchbar extends React.Component {
 state = {
    query: '',
 }
 
 handleChange = e => {
    const { value } = e.target;
    this.setState({ query: value });
 };
 handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
 };
 render () {
    const {  query } = this.state;
    return (<div >
    <form className={css.searchform} onSubmit={this.handleSubmit}>
      <button className={css.searchformButton} type="submit" >
        <span className={css.searchformButtonLabel}>Search</span>
      </button>
  
      <input className={css.searchformInput}
        name="query"
        value={query}
        onChange={this.handleChange}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </div>

    )
 }


 
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}