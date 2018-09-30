import React from 'react'
import { Link } from 'gatsby'
import { Row, Container } from 'reactstrap'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'
const SecondPage = () => (
  <Layout>
    <Row>
      <div className="col-lg-6 col-sm-12">
        <h1 className="text-center">Hi from the second page</h1>
      </div>
      <div className="col-lg-6 col-sm-12">
        <p className="text-center">Welcome to page 2</p>
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Row>
  </Layout>
)

export default SecondPage
