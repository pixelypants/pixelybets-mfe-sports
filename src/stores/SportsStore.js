import { ObservableStore } from '@codewithdan/observable-store';

class SportsStore extends ObservableStore {

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
  }

  fetchSports() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.beta.tab.com.au/v1/tab-info-service/sports/Basketball/competitions/NBA/markets?jurisdiction=NSW";
    return fetch(proxyurl + url)
      .then(response => response.json())
      .then(sports => {
        this.setState({ Sports: sports }, SportsStoreActions.GetSports);
        return sports;
      });
  }

  // Set state in the store by calling setState(stateObject, action). 
  // If you want to access the previous state you can also call 
  // setState((prevState) => stateObject, action) rather than calling getState()
  // first before calling setState().
  getSports() {
    let state = this.getState();
    // pull from store cache
    if (state && state.Sports) {
      return this.createPromise(null, state.Sports);
    }
    // doesn't exist in store so fetch from server
    else {
      return this.fetchSports();
    }
  }

  getSport(id) {
    return this.getSports()
      .then(sports => {
        let filteredSports = sports.filter(sport => sport.id === id);
        const customer = (filteredSports && filteredSports.length) ? filteredSports[0] : null;
        this.setState({ customer }, SportsStoreActions.GetCustomer);
        return customer;
      });
  }

  createPromise(err, result) {
    return new Promise((resolve, reject) => {
      return err ? reject(err) : resolve(result);
    });
  }
}

export const SportsStoreActions = {
  GetSports: 'GET_SPORTS',
  GetSport: 'GET_SPORTS'
};

export default new SportsStore();