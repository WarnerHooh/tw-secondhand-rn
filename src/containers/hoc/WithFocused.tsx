import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'

export const withFocused = (outerProps) => (InnerContent) => {

  class WithFocused extends React.Component {

    constructor() {
      super()
      this.state = {
        isFocused: false
      }
    }

    componentWillReceiveProps(nextProps) {
      const nav = this.props.nav
      const nextNav = nextProps.nav

      const tabRoute = nav.routes[0]
      const nextTabRoute = nextNav.routes[0]

      if (tabRoute.index !== nextTabRoute.index
        && (nextTabRoute.routes[nextTabRoute.index].routeName === this.props.navigation.state.routeName)) {
        this.setState({
          isFocused: true
        })
      } else {
        this.setState({
          isFocused: false
        })
      }
    }

    render() {
      const { user, nav, ...rest } = this.props
      const { isFocused } = this.state

      return (
        <InnerContent {...rest} isFocused={isFocused} />
      )
    }
  }

  return connect(
    state => ({
      user: state.user,
      nav: state.nav
    })
  )(WithFocused)
}