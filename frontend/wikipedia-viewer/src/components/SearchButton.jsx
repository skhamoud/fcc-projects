import React from 'react';

// ================Assets============
import btn from "../assets/search-btn.svg"

// ==========searchButton============= 
/**
 * @param {props} props 
 * onClick: function => fires on button onClick
 * btnContainer: string => className of Button container
 * visible: string  => 'visible' || 'hidden', className    
 */
const SearchButton = (props) => {
  return (
      <div className={`search-btn ${props.btnContainer||''} ${props.visible || ''}`} onClick={props.onClick} >
        <img src={btn} alt="searchButton"  />
      </div>
	);
}
export default SearchButton;