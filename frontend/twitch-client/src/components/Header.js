import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "all"
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  setActiveTab(tabName) {
    return this.state.activeTab === tabName ? "is-active" : "";
  }
  handleTabClick(e) {
    e.preventDefault();
    const activeTabName = e.target.text.toLowerCase();
    this.setState({ activeTab: activeTabName });
    this.props.filterData(activeTabName);
  }
  render() {
    const tabs = ["all", "online", "offline"];
    return (
      <div className="tabs is-right " onClick={this.handleTabClick}>
        <ul>
          <li className={this.setActiveTab(tabs[0])}><a>All</a></li>
          <li className={this.setActiveTab(tabs[1])}><a>Online</a></li>
          <li className={this.setActiveTab(tabs[2])}><a>Offline</a></li>
        </ul>
      </div>
    );
  }
}
