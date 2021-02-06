import * as React from 'react'
import {
  Grid,
  Button,
  Loader
} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { History } from 'history'
import { Blog } from '../types/Blog'
import { getBlog, patchBlog } from '../api/blogs-api'


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
    isSubmitting: boolean
  }
  

export class EditBlog extends React.PureComponent<BlogsProps, BlogState> {

  state: BlogState = {
    blog: {
      blogId: "",
      content: "",
      description: "",
      createdAt: "",
      attachmentUrl: "",
      title: ""
    },
    loadingBlogs: true,
    isSubmitting: false
  }


  handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    this.setState({...this.state, blog: { ...this.state.blog, [name]: value }});
  }

  onUpdateBlog = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({...this.state, isSubmitting: true})
    try {
      const date = new Date();
      const newBlog = await patchBlog(this.props.auth.getIdToken(), this.props.match.params.blogId, {
        title: this.state.blog.title,
        content: this.state.blog.content,
        description: this.state.blog.description
      })
      this.setState({...this.state, isSubmitting: false});
      this.props.history.push('/dashboard');
    } catch {
      this.setState({...this.state, isSubmitting: false});
      alert('Blog update failed')
    }
  }

  async componentDidMount() {
    try {
      const blog = await getBlog(this.props.match.params.blogId)
      this.setState({
        ...this.state,
        blog,
        loadingBlogs: false
      })
    } catch (e) {
      alert(`Failed to fetch blog: ${e.message}`);
      this.setState({
        ...this.state,
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
      <form className="ui form" onSubmit={this.onUpdateBlog}>
          
        <div className="ui segment">

          <div className="field">
            <label>Title</label>
            <input type="text" name="title" placeholder="Title" value={this.state.blog.title} required onChange={this.handleChange}/>
          </div>

          <div className="field">
              <label>Description</label>
              <textarea rows={2} name="description" required value={this.state.blog.description} onChange={this.handleChange}></textarea>
          </div>
          <div className="field">
              <label>Content</label>
              <textarea name="content" required value={this.state.blog.content} onChange={this.handleChange}></textarea>
          </div>

          <Button type='submit' loading={this.state.isSubmitting}>Submit</Button>
        </div>
      </form>
    )
  }
}
