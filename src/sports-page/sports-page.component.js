import React, { Fragment } from 'react'
import AsyncDecorator from 'async-decorator/rx6'
import { Scoped } from 'kremling'
import styles from './sports-page.krem.css'

@AsyncDecorator
export default class SportsPage extends React.Component {

  state = {
    loadingSports: false,
    sports: [],
  }

  componentDidMount() {
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
