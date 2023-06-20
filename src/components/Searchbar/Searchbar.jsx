import PropTypes from 'prop-types'; 
import React, { useState } from 'react';
import css from './Seacrhbar.module.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Searchbar = ({onSubmit}) => {
// hook useState create query and func setQuery (update value of query) 
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };
   return (<div className={css.searchbar}>
    <form className={css.searchform} onSubmit={handleSubmit}>
      <button className={css.searchformButton} type="submit" >
      <FontAwesomeIcon icon={faSearch} />
      </button>
        <input className={css.searchformInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="query"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </div>
   )
 }

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}