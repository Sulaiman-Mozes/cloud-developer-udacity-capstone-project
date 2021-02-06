import { History } from 'history'
import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Header,
  Item,
  Loader
} from 'semantic-ui-react'

import { getAllBlogs } from '../api/blogs-api'
import Auth from '../auth/Auth'
import { Blog } from '../types/Blog'

interface BlogsProps {
  auth: Auth
  history: History
}

interface BlogsState {
  blogs: Blog[]
  loadingBlogs: boolean
}

export class Blogs extends React.PureComponent<BlogsProps, BlogsState> {
  state: BlogsState = {
    blogs: [],
    loadingBlogs: true
  }

  async componentDidMount() {
    try {
      const blogs = await getAllBlogs();
      this.setState({
        blogs,
        loadingBlogs: false
      })
    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <br/>
        <Header as="h1">Blogs</Header>

        {this.renderBlogs()}
      </div>
    )
  }


  renderBlogs() {
    if (this.state.loadingBlogs) {
      return this.renderLoading()
    }

    return this.renderBlogsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Blogs
        </Loader>
      </Grid.Row>
    )
  }

  renderBlogsList() {
    return (

      <Item.Group divided>
        {this.state.blogs.map((blog, pos) => {
          return (
            <Item key={pos}>
            <Item.Image src={blog.attachmentUrl} />
      
            <Item.Content>
              <Item.Header as='a'>{blog.title}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{(new Date(blog.createdAt)).toDateString()}</span>
              </Item.Meta>
              <Item.Description>{blog.description}</Item.Description>
              <Item.Extra>
                <Link to={`/blogs/${blog.blogId}/`} className='ui button primary right floated'>Read More&nbsp;&nbsp;&nbsp;&gt;&gt;</Link>
              </Item.Extra>
            </Item.Content>
          </Item>
          )
        })}
      </Item.Group>

    )
  }
}
