import * as React from 'react'
import Auth from '../auth/Auth'
// import { Button } from 'semantic-ui-react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState {}


const paragraph = "Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their tiny stature, and even others for their massive size. Many people also have their own barometers for what makes a cute dog."


export class LogIn extends React.PureComponent<LogInProps, LogInState> {
  // onLogin = () => {
  //   this.props.auth.login()
  // }

  render() {
    return (
      <div>
        {/* <div className="ui two column centered grid">
        <div className="column stackable center aligned">
          <h1 className="right float">Please log in</h1>
        </div>
        <div className="four column centered row">
          <div className="column stackable center aligned">
            <Button positive onClick={this.onLogin}>
              Log in
            </Button>
          </div>
        </div>
        </div> */}
<br/>
<h1>Recent Blogs</h1>
<br/>

  <Item.Group divided>
    <Item>
      <Item.Image src='https://cdn.pixabay.com/photo/2021/01/27/18/45/blueberries-5955833_960_720.jpg' />

      <Item.Content>
        <Item.Header as='a'>12 Years a Slave</Item.Header>
        <Item.Meta>
          <span className='cinema'>Union Square 14</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
        <Button primary floated='right'>
            Read More&nbsp;&nbsp;&nbsp;&gt;&gt;
          </Button>
          <Label>IMAX</Label>
          <Label icon='globe' content='Additional Languages' />
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='https://cdn.pixabay.com/photo/2021/01/27/18/45/blueberries-5955833_960_720.jpg' />

      <Item.Content>
        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Read More&nbsp;&nbsp;&nbsp;&gt;&gt;
          </Button>
          <Label>Limited</Label>
        </Item.Extra>
      </Item.Content>
    </Item>


  </Item.Group>


<div>
  <Item.Group divided>

  <Item>
      <Item.Image src='https://cdn.pixabay.com/photo/2021/01/27/18/45/blueberries-5955833_960_720.jpg' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>

          <div className='left floated'>
            <input type="file" className="inputfile" id="embedpollfileinput" />
            <label htmlFor="embedpollfileinput" className="blue ui button">
              <i className="ui upload icon"></i> 
              Upload image
            </label>
          </div>

          <Button primary floated='right'>
            Read More&nbsp;&nbsp;&nbsp;&gt;&gt;
          </Button>

          <Button negative floated='right'>
            Delete
          </Button>

          <Button primary floated='right'>
            Update
          </Button>

        </Item.Extra>
      </Item.Content>
    </Item>


    <Item>
      <Item.Image src='https://cdn.pixabay.com/photo/2021/01/27/18/45/blueberries-5955833_960_720.jpg' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>

          <div className='left floated'>
            <input type="file" className="inputfile" id="embedpollfileinput" />
            <label htmlFor="embedpollfileinput" className="blue ui button">
              <i className="ui upload icon"></i> 
              Upload image
            </label>
          </div>

          <Button primary floated='right'>
            Read More&nbsp;&nbsp;&nbsp;&gt;&gt;
          </Button>

          <Button negative floated='right'>
            Delete
          </Button>

          <Button primary floated='right'>
            Update
          </Button>

        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='https://cdn.pixabay.com/photo/2021/01/27/18/45/blueberries-5955833_960_720.jpg' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>

          <div className='left floated'>
            <input type="file" className="inputfile" id="embedpollfileinput" />
            <label htmlFor="embedpollfileinput" className="blue ui button">
              <i className="ui upload icon"></i> 
              Upload image
            </label>
          </div>

          <Button primary floated='right'>
            Read More&nbsp;&nbsp;&nbsp;&gt;&gt;
          </Button>

          <Button negative floated='right'>
            Delete
          </Button>

          <Button primary floated='right'>
            Update
          </Button>

        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
</div>


  <div>

  
  </div>

  <div>
    <div className="ui form">
      
      <div className="ui segment">

      <div className="field">
    <label>Title</label>
    <input type="text" name="first-name" placeholder="First Name"/>
  </div>


      <div className="field">
        <div className="ui toggle checkbox">
          <input type="checkbox" name="gift" tabIndex={0} className=""/>
          <label>Publish Blog</label>
        </div>
      </div>

      <div className="field">
        <label>Description</label>
        <textarea rows={2}></textarea>
      </div>
      <div className="field">
        <label>Content</label>
        <textarea></textarea>
      </div>
    </div>
  </div>
  </div>


      </div>
    )
  }
}
