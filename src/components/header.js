import React from 'react'
import { Link } from 'gatsby'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap'
import './layout.css'
import 'jquery'
export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  addToggleButton() {
    if (!this.state.isOpen) return <span className="navbar-toggler-icon" />

    return <i className="fas fa-times fa-2x" />
  }
  render() {
    return (
      <div className="d-flex flex-row hh">
        <Col className="col-lg-3 text-left col-sm-4 left my-2">
          <span className="mt-2 mr-2 py-1 px-2">
            <i className="fas fa-home" />
          </span>
          <span className="mx-2 px-3 py-1">
            <i className="fab fa-trello" /> Boards
          </span>
          <span className="pl-5 pr-2 py-1">
            <i className="fas fa-search text-right" />
          </span>
        </Col>
        <Col className="col-lg-6  col-sm-2">
          <h2 className="text-center">trello</h2>
        </Col>
        <Col className="col-lg-3 text-right col-sm-4 right my-3">
          <span className="mx-1 p-2">
            <i className="fas fa-plus" />
          </span>
          <span className="mx-1 p-2">
            <i className="fas fa-info" />
          </span>
          <span className="mx-1 p-2">
            <i className="far fa-bell" />
          </span>
          <span className="user mx-1 p-2 mt-2">U</span>
        </Col>
      </div>
    )
  }
}
