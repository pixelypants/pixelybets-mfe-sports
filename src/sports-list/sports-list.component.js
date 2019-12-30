import React, { Fragment } from 'react'
import { Scoped } from 'kremling'
import { getPeople } from '../utils/api.js'
import styles from './sports-list.krem.css'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

@withRouter
export default class SportsList extends React.Component {

  render() {
    const { matches } = this.props
    return (
      <Scoped postcss={styles}>
        <div className='peopleList'>
          <Fragment>
            {
              matches.map((match, index) => {
                return (
                  <Link
                    key={match.name}
                    className='match'
                    to={`/`}
                  >
                    {match.name}
                  </Link>
                )
              })
            }
          </Fragment>
        </div>
      </Scoped>
    )
  }
}
