import { Observable, of } from 'rxjs';
import { ObservableStore } from '@codewithdan/observable-store';

class SportsStore extends ObservableStore {

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
  }

  fetchSports() {
    // this.setState({ sportsLoading: true });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.beta.tab.com.au/v1/tab-info-service/sports/Basketball/competitions/NBA/markets?jurisdiction=NSW";
    return fetch(proxyurl + url)
      .then(response => response.json())
      .then(sports => {
        this.setState({ sports: sports }, SportsStoreActions.GetSports);
        // this.setState({ sportsLoading: false });
        return;
      });
  }

  // Set state in the store by calling setState(stateObject, action). 
  // If you want to access the previous state you can also call 
  // setState((prevState) => stateObject, action) rather than calling getState()
  // first before calling setState().
  getSports() {
    let state = this.getState();
    // pull from store cache
    if (state && state.sports) {
      // Return RxJS Observable
      return of(state.sports);
    }
    // doesn't exist in store so fetch from server
    else {
      return this.fetchSports()
        .then(sports => {
          return this.getState().sports
        })
    }
  }

  getSportsMatches() {
    let state = this.getState();
    // pull from store cache
    if (state && state.sports.matches) {
      // Return RxJS Observable
      return of(state.sports.matches);
    }
    // doesn't exist in store so fetch from server
    else {
      return this.fetchSports()
        .then(sports => {
          return this.getState().sports.matches
        })
    }
  }

  getSport(id) {
    return this.getSports()
      .then(sports => {
        let sport = sports.filter(sport => sport.spectrumUniqueId === id);
        return sport;
      });
  }
}

export const SportsStoreActions = {
  GetSports: 'GET_SPORTS',
  GetSport: 'GET_SPORT',
  GetLoading: 'GET_LOADING'
};

export default new SportsStore();