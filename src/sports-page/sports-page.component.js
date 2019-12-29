import React, { Fragment } from 'react'
import AsyncDecorator from 'async-decorator/rx6'
import { Scoped } from 'kremling'
import styles from './sports-page.krem.css'

import SportsStore from "../stores/SportsStore";

@AsyncDecorator
export default class SportsPage extends React.Component {

  state = {
    loadingSports: false,
    sports: [],
  }
  storeSub = null

  componentDidMount() {
    // ###### SportsStore ########
    // Option 1: Subscribe to store changes
    this.storeSub = SportsStore.stateChanged.subscribe(state => {
      if (state) {
        this.setState({ sports: state.sports });
      }
    })


    // Option 2: Get data directly from store
    SportsStore.getSports()
      .then(cusportsstomers => {
        this.setState({ sports: sports });
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
                    <div>
                      Sports Page
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
