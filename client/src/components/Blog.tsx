import { History } from 'history'
import * as React from 'react'

import {
    Grid,
    Image,
    Loader
  } from 'semantic-ui-react'

import { getBlog } from '../api/blogs-api'
import Auth from '../auth/Auth'
import { Blog } from '../types/Blog'

interface BlogsProps {
  auth: Auth
  history: History
  match: {
    params: {
      blogId: string
    }
  }
}

interface BlogState {
  blog: Blog
  loadingBlogs: boolean
}

export class SingleBlog extends React.PureComponent<BlogsProps, BlogState> {
  state: BlogState = {
    blog: {
      blogId: "",
      content: "",
      description: "",
      createdAt: "",
      attachmentUrl: "",
      title: ""
    },
    loadingBlogs: true
  }

  async componentDidMount() {
    try {
      const blog = await getBlog(this.props.match.params.blogId)
      this.setState({
        blog,
        loadingBlogs: false
      })
    } catch (e) {
      alert(`Failed to fetch blog: ${e.message}`);
      this.setState({
        loadingBlogs: false
      })
    }
  }

  render() {

    if(this.state.loadingBlogs) {
      return (
        <Grid.Row>
          <Loader indeterminate active inline="centered">
            Loading Blog
          </Loader>
        </Grid.Row>
      )
    }

    return (
        <>
          <br/>
          <div className="ui segment">
              <Grid>
                  <Grid.Row textAlign='justified'>
                      <Grid.Column>
                          <h1>{this.state.blog.title}</h1>
                          <Image src={this.state.blog.attachmentUrl} size='medium' fluid />
                          <br/>
                          <p>{this.state.blog.content}</p>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </div>
        </>
    )
  }
}