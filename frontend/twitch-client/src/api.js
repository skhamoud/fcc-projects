import axios from "axios";

const ID = "a8toalazbnt8nau1t9lirm3m6pe2lz";

var streamers = [
  "cretetion",
  "freecodecamp",
  "ESL_SC2",
  "habathcx",
  "storbeck",
  "RobotCaleb",
  "noobs2ninjas",
  "OgamingSC2",
  "brunofin",
  "tommey",
  "caliscg",
  "lolrenaynay",
  "inceptionxx"
];
var endpoint = "https://api.twitch.tv/kraken";

/**
 * Append each stream (if available) to streamer
 * returns Array of Promises
 */
export function fetchData() {
  return fetchStreamers().then(res => {
    const streamers = res.data.users;
    return streamers.map(streamer => {
      return fetchStream(streamer._id).then(res => {
        const stream = res.data.stream;
        if (stream) {
          const {
            game,
            viewers,
            preview: { medium },
            channel: { url, status, followers, language }
          } = stream;
          const streamData = {
            game,
            viewers,
            mediumPreview: medium,
            url,
            currentStatus: status,
            followers,
            language
          };
          return Object.assign({}, streamer, { status: "online" }, streamData);
        } else {
          return Object.assign({}, streamer, { status: "offline" });
        }
      });
    });
  });
}

/**
 * Fetch Array of streamers from their names
 */
function fetchStreamers() {
  return axios.get(endpoint + `/users?login=${streamers.join(",")}`, {
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": ID
    }
  });
}

/**
 * Fetch individual Stream by user Id
 */
function fetchStream(streamerId) {
  return axios.get(endpoint + `/streams/${streamerId}`, {
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": ID
    }
  });
}

/**
 * Fetch data from Localstorage 
 */
export function getStoredData(delay = 0) {
  const storedData = window.localStorage.getItem("storedData");
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (storedData) resolve(JSON.parse(storedData));
      else reject("There is no stored data yet!");
    }, delay);
  });
}
export function storeData(data) {
  window.localStorage.removeItem("storedData");
  window.localStorage.setItem("storedData", JSON.stringify(data, null, 1));
}
