import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { NotFound } from './components/NotFound'
import { Blogs } from './components/Blogs'
import { Dashboard } from './components/Dashboard'
import { CreateBlog } from './components/CreateBlogs'
import { EditBlog } from './components/EditBlog'
import { SingleBlog } from './components/Blog'


export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
            <Router history={this.props.history}>

              <Grid.Column width={16}>
                  {this.generateMenu()}
              </Grid.Column>

              <Grid.Column centered width={16}>
                  {this.generateCurrentPage()}
              </Grid.Column>

              </Router>

            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <div className="ui menu">

        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        {this.props.auth.isAuthenticated() && (
          <>
          <Menu.Item name="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <Menu.Item name="create">
            <Link to="/create">Create Blog</Link>
          </Menu.Item>

          </>
        )}

        <div className="right menu">
          <div className="item">
            {this.props.auth.isAuthenticated() ? (
              <div className="ui primary button" onClick={this.handleLogout} >Log Out</div>
              ) : (
              <div className="ui positive button" onClick={this.handleLogin}>Log In</div>
              )}
          </div>
        </div>
      </div>
    )
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return (
        <Switch>

          <Route
            path="/blogs/:blogId/"
            exact
            render={props => {
              return <SingleBlog {...props} auth={this.props.auth} />
            }}
          />
      
          <Route
            render={props => {
              return <Blogs {...props} auth={this.props.auth} />
            }}
          />

        </Switch>
      )
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Blogs {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/dashboard"
          exact
          render={props => {
            return <Dashboard {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/create"
          exact
          render={props => {
            return <CreateBlog {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/blogs/:blogId/edit"
          exact
          render={props => {
            return <EditBlog {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/blogs/:blogId/"
          exact
          render={props => {
            return <SingleBlog {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
