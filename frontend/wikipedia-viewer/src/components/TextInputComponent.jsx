import React from 'react';


// ====== TextInput =============
/** Component
 * needs 2 props:
 * onSearch : function => fires when you search for something
 * navigateTo : function (history method : push or replace) => navigates to page or Component
 */
class TextInput extends React.Component{
	constructor(props) {
		super(props)
    this.handleSearch = this.handleSearch.bind(this);
	}
	render() {
		return (
			<input
				type="text"
				name="search"
				placeholder="Search Wikipedia"
				ref={input => this.searchTextInput = input}
				onKeyPress={this.handleSearch}
				className={`search-input`}
			/>
		);
	}
	
  handleSearch(e) {
    let term = this.searchTextInput.value;
		if (e.key === "Enter" && term) {
			this.props.onSearch(term);
			this.props.navigateTo('/articles');
		}
	}
}
export default TextInput;