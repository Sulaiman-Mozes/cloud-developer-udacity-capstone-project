import { History } from 'history'
import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Grid,
  Header,
  Item,
  Loader
} from 'semantic-ui-react'

import { getBlogs, deleteBlog } from '../api/blogs-api'
import Auth from '../auth/Auth'
import { Blog } from '../types/Blog'
import { UploadBlogImage } from './UploadBlogImage'

interface BlogsProps {
  auth: Auth
  history: History
}

interface BlogsState {
  blogs: Blog[]
  loadingBlogs: boolean
}

export class Dashboard extends React.PureComponent<BlogsProps, BlogsState> {
  state: BlogsState = {
    blogs: [],
    loadingBlogs: true
  }


  onBlogDelete = async (blogId: string) => {
    try {
      await deleteBlog(this.props.auth.getIdToken(), blogId)
      this.setState({
        blogs: this.state.blogs.filter(blog => blog.blogId != blogId)
      })
      alert('Blog deleted')
    } catch {
      alert('Blog deletion failed')
    }
  }

  onUploadImageSucessful = async (blogId: string, attachmentUrl: string) => {
    this.setState({
      blogs: this.state.blogs.map(blog => {
        if (blog.blogId === blogId){
          blog.attachmentUrl = attachmentUrl
        }
        return blog
      })
    })
  }

  async componentDidMount() {
    try {
      const blogs = await getBlogs(this.props.auth.getIdToken())
      this.setState({
        blogs,
        loadingBlogs: false
      })
    } catch (e) {
      alert(`Failed to fetch blogs: ${e.message}`);
      this.setState({
        ...this.state,
        loadingBlogs: false
      })
    }
  }

  render() {
    return (
      <div>
        <br/>
        <Header as="h1">My Blogs</Header>

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
        
                  <div className='left floated'>
                    <UploadBlogImage {...this.props} blogId={blog.blogId} onUploadImageSucessful={this.onUploadImageSucessful} />
                  </div>

                  <Link to={`/blogs/${blog.blogId}/`} className='ui button primary right floated'>Read More&nbsp;&nbsp;&nbsp;&gt;&gt;</Link>
        
                  <Button negative floated='right' onClick={() => this.onBlogDelete(blog.blogId)}>
                    <i className="ui window close icon"></i>
                    Delete
                  </Button>
        
                  <Link to={`/blogs/${blog.blogId}/edit`} className='ui button primary right floated'>
                    <i className="ui edit icon"></i>
                    Update
                  </Link>
        
                </Item.Extra>
              </Item.Content>
            </Item>
        
            )
          })}
        </Item.Group>

    )
  }

}
