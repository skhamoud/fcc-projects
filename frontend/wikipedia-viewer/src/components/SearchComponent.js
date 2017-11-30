// ============Modules==================
import React, { Component } from "react";
import { Route } from "react-router-dom";
// ========components ===================
import Api from '../api';
import TextInput from './TextInputComponent';
import SearchButton from './SearchButton';

// ==============SearchComponent==============
// needs 2 props:
// - onSearch: function
// - btnContainer: className for page spefic container of the search btn

class SearchComponent extends Component {
  constructor(props) {
		super(props); 
		this.state = { modalVisible: false , randomArticleUrl:""};
		this.toggleModal = this.toggleModal.bind(this);
		this.getRandomArticle = this.getRandomArticle.bind(this);
	}
	componentDidMount() {
		this.getRandomArticle()
	}
	getRandomArticle() {
		Api.fetchRandom().then(data => {
			const articles = data.query.pages;
			let randomArticle = articles[Math.floor(Math.random()*articles.length)]
			this.setState({ randomArticleUrl: randomArticle.fullurl })
		}).catch(console.warn);
	}
	render() {
		// toggle modal and search button visibility
		const isModalVisible = this.state.modalVisible ? 'visible' : 'hidden';
		const searchButtonVisible = this.state.modalVisible ? 'hidden' : 'visible';

		// random article Button stuff 
		const randomArticleUrl = this.state.randomArticleUrl;
		return (
			<div>
				<SearchButton
					onClick={this.toggleModal}
					visible={searchButtonVisible}
					btnContainer={this.props.btnContainer||''}
				/>

				<div className={`searchbox ${isModalVisible}`} >
					<Modal onClick={this.toggleModal} />
					
					{/*Wrap TextInput in router to pass history to it*/}
					<Route render={({ history }) => (
						<TextInput onSearch={this.props.onSearch}
							navigateTo={(place) => {
							history.push(place)
							this.setState({modalVisible:false}) // Land on modal hidden
						}} />
					)} />
					<RandomButton url={randomArticleUrl} />
				</div>

			</div>);
	}
	

	
	toggleModal() {
		this.setState((prevState, props) => ({modalVisible:!prevState.modalVisible}))
	}
}

// ===============Modal====================
/**
 * needs onClick prop : function that fires when you click anywhere in modal
 *  
 */
const Modal = (props) => <div className="modal-bg" onClick={props.onClick || null} ></div>;


// ======= Random Button =======================
/**
 * props.url : string => url of random article
 */
const RandomButton = (props) => (<a href={props.url} className="btn random-btn">Random</a>);

export default SearchComponent;