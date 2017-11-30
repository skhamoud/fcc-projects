import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

export default class Streamer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
  }
  toggleDetails(status) {
    if (status === "online")
      this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }
  render() {
    const {
        logo,
        name,
        bio,
        status,
        game,
        language,
        currentStatus,
        viewers,
        followers,
        url,
        mediumPreview
      } = this.props,
      online = status === "online",
      classes = ["box stream "];
    if (online) classes.push("clickable");

    return (
      <li className={classes.join(" ")} onClick={this.toggleDetails.bind(this, status)}>
        <div className=" media-left">
          <figure className="image is-64x64">
            <img src={logo ? logo : "https://via.placeholder.com/64x64"} alt={name} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content ">
            <p className="title is-4">
              {name}
            </p>
            <p>
              {bio ? bio : "No bio saved!"}
            </p>

            <CSSTransitionGroup
              transitionName="live-stream"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {online && this.state.showDetails
                ? <div className="stream__info">
                    <p>
                      <strong>Game: </strong>
                      {game}
                    </p>
                    <p>
                      <strong>Language: </strong>
                      {language.toUpperCase()}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      {currentStatus}
                    </p>
                    <p>
                      <strong>Viewers: </strong>
                      {viewers} watching now!
                    </p>
                    <p>
                      <strong>Followers: </strong>
                      {followers} follower
                    </p>

                    <p>
                      <a href={url} target="_blank">
                        <img src={mediumPreview} alt="" />
                      </a>
                    </p>
                  </div>
                : null}
            </CSSTransitionGroup>
          </div>
        </div>
        <div className="stream__status">
          {online
            ? <a href={url} target="_blank">
                <span>
                  <i className="stream__status-icon online" />Online
                </span>
              </a>
            : <span>
                <i className="stream__status-icon offline" />Offline
              </span>}
        </div>
      </li>
    );
  }
}
