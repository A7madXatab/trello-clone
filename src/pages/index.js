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
class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  createNewBoard = () => {}
  render() {
    return (
      <Layout>
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
            <div className="starred col-12" />
            <div className="recent" />
            <div className="personal">
              <div>
                <h6>
                  <i class="far fa-user mr-1" />
                  Personal Boards
                </h6>
              </div>
              <div className="d-flex flex-row">
                <div className="col-3 boardStyle welcomeBoard">
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
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    )
  }
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
                  <i class="fas fa-check position-absolute" />
                ) : (
                  ''
                )}
              </Button>
            ))}
          </div>
        </div>
        <Button
          className="mt-2"
          color="secondary"
          onClick={() => this.createBoard()}
        >
          Create Board
        </Button>
      </div>
    )
  }
}

export default IndexPage
