import React, { Fragment } from 'react'
import AsyncDecorator from 'async-decorator/rx6'
import { Scoped } from 'kremling'
import styles from './sports-page.krem.css'
import SportsList from "../sports-list/sports-list.component";

import SportsStore from "@portal/sportsStore";

@AsyncDecorator
export default class SportsPage extends React.Component {

  state = {
    loadingSports: false,
    matches: []
  }
  storeSub = null

  componentDidMount() {
    this.storeSub = SportsStore.stateChanged.subscribe(state => {
      if (state) {
        this.setState({ matches: state.sports.matches });
      }
    })
    SportsStore.fetchSports();
  }

  render() {
    const { loadingSports, sports } = this.state
    return (
      <Scoped postcss={styles}>
        <div className='sportsPage'>
          <div className='sportsPageContents'>
            <div className='listWrapper'>
              {
                this.state.loadingSports && sports.length === 0 ? (
                  <div>
                    Loading ...
                  </div>
                ) : (
                    <div>
                      <p>Pick a sport:</p>
                      <SportsList
                        matches={this.state.matches}
                      />
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </Scoped>
    )
  }

  componentDidUpdate(prevProps, prevState) { }

}
