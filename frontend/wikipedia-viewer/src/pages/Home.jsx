// =========Modules===============
import React from 'react';
import SearchComponent from '../components/SearchComponent';

// ========Assets==================
import bgImage from '../assets/books.jpg' ;

const Home = (props)=>  {
  const homeStyle = {
    background: `url(${bgImage}) center / cover`,
    height: "100vh",
  }
  return (
    <div style={homeStyle} >  
      <SearchComponent
        onSearch={props.fetchArticles}
        btnContainer="search-btn_home"
      />
    </div>
    );
}

export default Home;