import React, { Fragment } from 'react'
import { Scoped } from 'kremling'
import { getPeople } from '../utils/api.js'
import styles from './sports-list.krem.css'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import uuid from "uuid"

export default class SportsList extends React.Component {
  render() {
    const { matches, onClick } = this.props
    return (
      <Scoped postcss={styles}>
        <div className='sportsList' id='sportsList'>
          <Fragment>
            {
              matches.map((match, index) => {
                return (
                  <button key={uuid.v1()} id={match.id} className='match' onClick={e => {
                    onClick({
                      id: match.id,
                      name: match.name,
                      amount: 222
                    });
                  }
                  }>
                    {match.id + " : " + match.name + " : $222"}
                  </button>
                )
              })
            }
          </Fragment>
        </div>
      </Scoped>
    )
  }
}
