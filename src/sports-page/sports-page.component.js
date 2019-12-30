import React, { Fragment } from 'react'
import AsyncDecorator from 'async-decorator/rx6'
import { Scoped } from 'kremling'
import styles from './sports-page.krem.css'
import SportsList from "../sports-list/sports-list.component";

import SportsStore from "../stores/SportsStore";

@AsyncDecorator
export default class SportsPage extends React.Component {

  state = {
    loadingSports: false,
    matches: []
  }
  storeSub = null

  componentDidMount() {
    // ###### SportsStore ########
    // Option 1: Subscribe to store changes
    this.storeSub = SportsStore.stateChanged.subscribe(state => {
      if (state) {
        // this.setState({ loadingSports: state.sportsLoading });
        console.log(state)
      }
    })

    // Option 2: Get data directly from store
    SportsStore.getSportsMatches()
      .then(matches => {
        console.log("get matches")
        this.setState({ matches: matches });
      })
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
                    <SportsList
                      matches={this.state.matches}
                    />

                    // <div>
                    //   {this.state.matches.map((item, index) => (
                    //     <button key={index}>
                    //       {item.name}
                    //     </button>
                    //   ))}
                    // </div>
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
