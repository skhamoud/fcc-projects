export default {
  // Search for str in wikipedia
  wikiSearch(str) {
    let endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&search=${str}&format=json`;

    return fetch(endpoint)
      .then((res => res.json())) // strips body data into next promise
      .then(json => json)
      .catch(err => console.error(err))
  },
  
  // fetch 10 random articles
  fetchRandom() {
    let endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info&generator=random&grnlimit=10&formatversion=latest&inprop=url&grnnamespace=0`;
    return fetch(endpoint).then(data=>data.json());
  },
  errors: {
    network: "There seems to be a network problem, Try again later!",
    noResults: "Sorry, no related articles found."
  },
  dummyData: [
    "javascript", [
      "JavaScript",
      "JavaScript syntax",
      "JavaScript engine",
      "JavaScript graphics library",
      "JavaScript InfoVis Toolkit",
      "JavaScript templating",
      "JavaScript library",
      "JavaScript Style Sheets",
      "JavaScriptMVC",
      "JavaScript Data Components"
    ],
    [
      "JavaScript (/\u02c8d\u0292\u0251\u02d0v\u0259\u02ccskr\u026apt/) is a high-level, dynamic, untyped, and interpreted programming language.",
      "The syntax of JavaScript is the set of rules that define a correctly structured JavaScript program.",
      "A JavaScript engine is a program or interpreter which executes JavaScript code. A JavaScript engine may be a traditional interpreter, or it may utilize just-in-time compilation to bytecode in some manner.",
      "A JavaScript graphics library is a collection of functions used to aid in the creation of graphics for either the HTML5 canvas element or SVG.",
      "The JavaScript InfoVis Toolkit provides tools for creating Interactive Data Visualizations for the Web.",
      "JavaScript templating refers to the client side data binding method implemented with the JavaScript language.",
      "A JavaScript library is a library of pre-written JavaScript which allows for easier development of JavaScript-based applications, especially for AJAX and other web-centric technologies.",
      "JavaScript Style Sheets (JSSS) was a stylesheet language technology proposed by Netscape Communications Corporation in 1996 to provide facilities for defining the presentation of webpages.",
      "JavaScriptMVC is an open-source rich Internet application framework based on jQuery and OpenAjax. It extends those libraries with a model\u2013view\u2013controller architecture and tools for testing and deployment.",
      "The JavaScript Data Components (JSDC) are open source libraries (GPL), made to give developers of dynamic web pages an easy and fast way of making their applications more powerful using datasets, master-detail relations, dataset-events, conditions and data-aware components."
    ],
    [
      "https://en.wikipedia.org/wiki/JavaScript",
      "https://en.wikipedia.org/wiki/JavaScript_syntax",
      "https://en.wikipedia.org/wiki/JavaScript_engine",
      "https://en.wikipedia.org/wiki/JavaScript_graphics_library",
      "https://en.wikipedia.org/wiki/JavaScript_InfoVis_Toolkit",
      "https://en.wikipedia.org/wiki/JavaScript_templating",
      "https://en.wikipedia.org/wiki/JavaScript_library",
      "https://en.wikipedia.org/wiki/JavaScript_Style_Sheets",
      "https://en.wikipedia.org/wiki/JavaScriptMVC",
      "https://en.wikipedia.org/wiki/JavaScript_Data_Components"
    ]
  ]
}
// TODO : USE AXIOS INSTEAD