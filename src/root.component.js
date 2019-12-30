import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SportsPage from './sports-page/sports-page.component.js'
import { ObservableStore } from '@codewithdan/observable-store';
import { ReduxDevToolsExtension } from '@codewithdan/observable-store-extensions';

export default class Root extends React.Component {

  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  componentDidMount() {
    // TODO: Need to make this global for all MFEs
    ObservableStore.addExtension(new ReduxDevToolsExtension({ reactRouterHistory: history }))
  }

  render() {
    return (
      this.state.hasError ? (
        <div>
          Error
      </div>
      ) : (
          <BrowserRouter>
            <Route
              path='/sports'
              component={SportsPage}
            />
          </BrowserRouter>
        )
    )
  }
}
