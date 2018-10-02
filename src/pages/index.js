import React from 'react'
import { Link } from 'gatsby'
import {
  Row,
  Col,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap'
import Layout from '../components/layout'
import './style.css'
import axios from 'axios'
import SecondPage from './page-2'
import { func } from 'prop-types'
import * as $ from 'jquery'
import IntoBoard from './board'
class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      posts: [],
      recenet: [],
      stared: [],
      activeBoard: false,
      post: '',
    }
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  componentDidMount() {
    axios.get('http://localhost:3000/posts').then(res => {
      this.setState({
        posts: res.data,
        stared: res.data.filter(post => post.stared === true),
        opened: res.data.filter(post => post.opened === true),
      })
    })
  }
  setAsFavorite = post => {
    console.log('clicked')
    post.stared = !post.stared
    axios.put('http://localhost:3000/posts/' + post.id, post).then(res => {
      this.setState({
        posts: this.state.posts.filter(p => {
          if (p.id === post.id) return res.data

          return p
        }),
      })
    })
  }
  activate = p => {
    this.setState({
      activeBoard: true,
      post: p,
    })
  }
  deActivate = () =>{
    this.setState({
      activeBoard:false
    })
  }
  render() {
    return (
      <Layout>
        {this.state.activeBoard ? (
          <IntoBoard post={this.state.post} toggleStar={this.setAsFavorite} hideBoard={this.deActivate}/>
        ) : (
          ''
        )}
        {this.state.isOpen ? <NewBoard toggle={this.toggle} /> : ''}
        <Row>
          <Col md="3">
            <ul>
              <li className="active">
                <i className="fab fa-trello mr-1" />
                Boards
              </li>
              <li>
                <i className="fas fa-heartbeat mr-1" />
                Home
              </li>
              <li>
                <h6>Teams</h6>
                <span>
                  <i className="fas fa-plus" />
                  Create a team
                </span>
              </li>
            </ul>
          </Col>
          <Col md="9">
            <div className="starred col-12 d-flex flex-row" />
            <div className="recent d-flex flex-row" />
            <div className="personal">
              <div>
                <h6>
                  <i className="far fa-user mr-1" />
                  Personal Boards
                </h6>
              </div>
              <Row className="boards">
                {this.state.posts.map(post => (
                  <GenerateContainer
                    post={post}
                    func={this.setAsFavorite}
                    activate={this.activate}
                  />
                ))}
                <div className="col-md-3 boardStyle welcomeBoard">
                  <h6>Welcome Board</h6>
                  <i className="far fa-star" />
                </div>
                <div
                  className="col-3 boardStyle newBoard"
                  onClick={() => {
                    this.toggle()
                  }}
                >
                  <p className="text-center">
                    <i className="fas fa-plus mr-1" />
                    Create new Board
                  </p>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Layout>
    )
  }
}
function GenerateContainer(props) {
  return (
    <div
      key={props.post.id}
      className="boardStyle col-3"
      style={{ backgroundColor: props.post.backgroundColor }}
    >
      <div onClick={() => props.activate(props.post)}>
        <h5>{props.post.title}</h5>
      </div>
      {props.post.stared ? (
        <i
          className="far fa-star mb-1 mr-1"
          onClick={() => props.func(props.post)}
        />
      ) : (
        <i
          className="far fa-star stared mb-1 mr-1"
          onClick={() => props.func(props.post)}
        />
      )}
    </div>
  )
}
class NewBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      dropdownOpen: false,
      colors: [],
      url: 'http://localhost:3000/posts',
      color: 'red',
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/colors').then(res => {
      this.setState({
        colors: res.data,
      })
    })
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  createBoard = () => {
    let postObject = {
      title: this.state.title,
      stared: false,
      opened: false,
      backgroundColor: this.state.color,
      lists: [],
    }
    axios.post('http://localhost:3000/posts', postObject)
  }
  render() {
    return (
      <div className="col-6 board ">
        <div className="col-12 d-flex flex-row">
          <div
            className="position-relative col-8"
            style={{ background: this.state.color }}
          >
            <span onClick={() => this.props.toggle()}>
              <i className="fas fa-times mr-1" />
            </span>
            <input
              type="text"
              value={this.state.title}
              placeholder="add Board Title"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="col-4 ml-2">
            {this.state.colors.map((color, i) => (
              <Button
                key={i}
                className="position-relative"
                style={{
                  background: color,
                  padding: '20px 20px',
                  margin: '3px',
                }}
                onClick={() => this.setState({ color: color })}
              >
                {this.state.color === color ? (
                  <i className="fas fa-check position-absolute" />
                ) : (
                  ''
                )}
              </Button>
            ))}
          </div>
        </div>
        <Button
          className="mt-2"
          color="success"
          disabled={this.state.title === '' ? true : false}
          onClick={() => this.createBoard()}
        >
          Create Board
        </Button>
      </div>
    )
  }
}

export default IndexPage
