import React, { Component } from "react";
import Streamers from "./components/Streamers";
import Header from "./components/Header";
import LoadingModal from "./components/LoadingModal";
import { fetchData, getStoredData, storeData } from "./api";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamsData: [],
      loading: false,
      error: "",
      filter: "all"
    };
  }

  componentDidMount() {
    this.populateData();
  }

  render() {
    const { loading, error } = this.state;
    return (
      <div className="App">
        <div className="container ">
          <div className="columns">
            <div className="column is-offset-2 is-6">
              {loading
                ? <LoadingModal />
                : <div>
                    {error
                      ? <div className="notification is-danger error">
                          {error}
                        </div>
                      : <div>
                          <Header filterData={this.filterData.bind(this)} />
                          <Streamers {...this.state} />
                        </div>}
                  </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  filterData(filter) {
    this.setState({ filter });
  }

  populateData() {
    this.setState({ loading: true });
    fetchData()
      .then(res => {
        Promise.all([...res]).then(res => {
          this.setState({ streamsData: res, loading: false });
          storeData(res);
        });
      })
      .catch(() => {
        getStoredData(500)
          .then(data => {
            this.setState({ streamsData: data, loading: false });
          })
          .catch(err => {
            this.setState({ error: err, loading: false });
          });
      });
    // console.log(
    //   "streaming : \n",
    //   this.state.streamsData.filter(s => s.status === "online"),
    //   "\nAll",
    //   this.state.streamsData
    // );
  }
}

export default App;
