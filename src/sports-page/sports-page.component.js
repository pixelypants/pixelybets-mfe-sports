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

  state = {
    loadingSports: false,
    matches: []
  }
  sportsStoreSub = null
  betslipStoreSub = null

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.sportsStoreSub = SportsStore.stateChanged.subscribe(state => {
      if (state) {
        this.setState({ matches: state.sports.matches });
      }
    })
    SportsStore.fetchSports();

    this.betslipStoreSub = BetslipStore.stateChanged.subscribe(state => {
      if (state.bets.length > 0) {
        const list = document.getElementById("sportsList");
        const btns = list.getElementsByClassName("match");
        for (var i = 0; i < btns.length; i++) {
          //if (of(bets).find(bet => bet.id === btns[i].id)) {
          btns[i].classList.remove("mystyle");
          //}
        }
        state.bets.map(bet => {
          const uiBet = document.getElementById(bet.id);
          uiBet.className += " active"
        });
      }
    })
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
            {
              this.state.loadingSports && sports.length === 0 ? (
                <div>
                  Loading ...
                  </div>
              ) : (
                  <div>
                    <h1>Sports bets:</h1>
                    <SportsList
                      matches={this.state.matches}
                      onClick={this.handleClick}
                    />
                  </div>
                )
            }
          </div>
        </div>
      </Scoped>
    )
  }

  componentDidUpdate(prevProps, prevState) { }

}
