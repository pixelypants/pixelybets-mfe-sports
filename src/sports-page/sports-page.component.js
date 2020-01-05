import React, { Fragment } from 'react'
import { Observable, of } from 'rxjs';
import AsyncDecorator from 'async-decorator/rx6'
import { Scoped } from 'kremling'
import styles from './sports-page.krem.css'
import SportsList from "../sports-list/sports-list.component";

import SportsStore from "@portal/sportsStore";
import BetslipStore from "@portal/betslipStore";

@AsyncDecorator
export default class SportsPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loadingSports: false,
      matches: []
    }
    this.sportsStoreSub = null
    this.betslipStoreSub = null
  }

  componentDidMount() {
    this.sportsStoreSub = SportsStore.stateChanged.subscribe(state => {
      if (state) {
        this.setState({ matches: state.sports.matches });
      }
    })
    SportsStore.fetchSports();

    this.betslipStoreSub = BetslipStore.stateChanged.subscribe(state => {
      const list = document.getElementById("sportsList");
      if (!list) return
      const btns = list.getElementsByClassName("match");
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("active")) {
          btns[i].classList.remove("active");
        }
      }
      if (state.bets.length > 0) {
        state.bets.map(bet => {
          const uiBet = document.getElementById(bet.id);
          uiBet.className += " active"
        });
      }
    })
  }

  componentWillUnmount() {
    this.sportsStoreSub.unsubscribe();
    this.betslipStoreSub.unsubscribe();
  }

  handleClick(bet) {
    BetslipStore.addBet(bet);
  }

  render() {
    const { loadingSports, sports } = this.state
    return (
      <Scoped postcss={styles}>
        <div className='sportsPage'>
          <div className='sportsPageContents'>
            <h1>Sports bets:</h1>
            {
              this.state.matches.length === 0 ? (
                <div>
                  Loading ...
                </div>
              ) : (
                  <SportsList
                    matches={this.state.matches}
                    onClick={this.handleClick}
                  />
                )
            }
          </div>
        </div>
      </Scoped>
    )
  }

  componentDidUpdate(prevProps, prevState) { }

}
