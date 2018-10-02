import React from 'react'
import Layout from '../components/layout'
import { Button } from 'reactstrap'
import axios from 'axios'
export default class IntoBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: '',
      newList: false,
      postLists: [...this.props.post.lists],
    }
  }
  getLabel = () => {
    if (this.props.post.stared) return <i className="far fa-star mb-1 mr-1" />

    return (
      <i style={{ color: 'gold' }} className="far fa-star stared mb-1 mr-1" />
    )
  }
  addListToPost = () => {
    this.props.post.lists.push({
      name: this.state.listName,
      cards: [],
    })
    axios
      .put(`http://localhost:3000/posts/${this.props.post.id}`, this.props.post)
      .then(res => {
        this.setState({
          postLists: [...this.state.postLists, res.data],
        })
      })
  }
  add = () => {
    if (this.state.newList)
      return (
        <div className="col-2 list py-2">
          <div>
            <input
              type="text"
              placeholder="Enter List Name"
              value={this.state.listName}
              onChange={e => this.setState({ listName: e.target.value })}
            />
          </div>
          <div>
            <Button
              disabled={this.state.listName === '' ? true : false}
              className="mr-1 mt-1"
              color="success"
              onClick={() => this.addListToPost()}
            >
              Add
            </Button>
            <span>
              <i
                onClick={() => {
                  this.setState({ newList: false })
                }}
                className="fas fa-times crossed mr-1"
              />
            </span>
          </div>
        </div>
      )

    return (
      <div onClick={e => this.setState({ newList: true })} className="col-1">
        Add new List
      </div>
    )
  }
  render() {
    return (
      <Layout>
        <div
          className="col-12 boardDetails "
          style={{ backgroundColor: this.props.post.backgroundColor }}
        >
          <div className="col-12 position-relative">
            <i
              className="fas fa-times mr-1"
              onClick={() => this.props.hideBoard()}
            />
            <div className="col-6 d-flex flex-row">
              <h3>{this.props.post.title}</h3>
              <button
                style={{
                  borderRight: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  background: 'none',
                  border: 'none',
                }}
                onClick={() => this.props.toggleStar(this.props.post)}
              >
                {this.getLabel()}
              </button>
            </div>
          </div>
          <div className="col-12 d-flex flex-row">
            {this.state.postLists.map(list => (
              <div className="col-2 list mx-2">
                <h5> {list.name}</h5>
              </div>
            ))}
            {this.add()}
          </div>
        </div>
      </Layout>
    )
  }
}
