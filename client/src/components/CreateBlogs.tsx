import * as React from 'react'
import Auth from '../auth/Auth'
import { History } from 'history'

import { createBlog } from '../api/blogs-api'
import { Button, Checkbox, Form } from 'semantic-ui-react'


interface BlogsProps {
    auth: Auth
    history: History
  }
  
  interface BlogsState {
    title: string
    description: string
    content: string
  }
  

export class CreateBlog extends React.PureComponent<BlogsProps, BlogsState> {

  state = {
    title: "",
    content: "",
    description: ""
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    this.setState({...this.state, [name]: value });
  }

  onBlogCreate = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const date = new Date();
      const newBlog = await createBlog(this.props.auth.getIdToken(), {
        title: this.state.title,
        content: this.state.content,
        description: this.state.description
      })
      this.props.history.push('/dashboard')
    } catch {
      alert('Blog creation failed')
    }
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.onBlogCreate}>
          
        <div className="ui segment">

          <div className="field">
            <label>Title</label>
            <input type="text" name="title" placeholder="Title" value={this.state.title} required onChange={this.handleChange}/>
          </div>

          <div className="field">
              <label>Description</label>
              <textarea rows={2} name="description" required value={this.state.description} onChange={this.handleChange}></textarea>
          </div>
          <div className="field">
              <label>Content</label>
              <textarea name="content" required value={this.state.content} onChange={this.handleChange}></textarea>
          </div>

          <Button type='submit'>Submit</Button>
        </div>
      </form>
    )
  }
}
