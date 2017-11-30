import React, { Component } from "react";

class SearchComponent extends Component {
  constructor(props) {
    super(props); 
    this.handleSearch = this.handleSearch.bind(this);
		this.handleIconClick= this.handleIconClick.bind(this);
  }
  render() {
	return (
	<div className = 'searchbox'>
		<i	className="material-icons"
			onClick={this.handleIconClick}>search</i>
		<input type="text" 
				 name="search"
				 placeholder= "City name"
				 ref={input => this.searchTextInput = input}
				 onKeyPress={this.handleSearch}/>

	</div>);
  }
  handleSearch(e) {
    let city = e.target.value || "";
    if(e.key === "Enter" ) this.props.onSearch(city);

  }
	handleIconClick(){
		let cssClass = this.searchTextInput.className;
		cssClass? this.searchTextInput.className='':
		this.searchTextInput.className='visible';
	}
}

export default SearchComponent;
