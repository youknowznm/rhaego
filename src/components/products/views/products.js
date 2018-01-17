import React from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {CircularProgress} from 'material-ui/Progress'
import {fetchGithub} from '../actions'
import * as Status from '../status.js';

import './products.scss'

class Products extends React.Component {
  constructor({status, fetchGithub, productsData}) {
    super(...arguments)
  }

  componentDidMount() {
    this.props.fetchGithub()
  }

  render() {
    const {status, productsData} = this.props
    switch (status) {
      case 'loading':
        return (
          <CircularProgress className="loading" />
        );
      case 'fail':
        return (
          <p>fail</p>
        );
      case 'success':
        return (
          <div className="products">
            {
              productsData.map((item, i) => (
                <ProductCard
                  key={i}
                  ProductData={item}
                />
              ))
            }
          </div>
        );
      default:
        throw new Error('unexpected status ' + status);
    }
  }
}

const mapState = (state, ownProps) => {
  return {
    status: state.products.status,
    productsData: state.products.productsData,
  };
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchGithub: () => dispatch(fetchGithub())
})

export default connect(mapState, mapDispatch)(Products)
