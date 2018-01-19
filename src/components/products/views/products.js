import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import {fetchGithub} from '../actions'
import {Loading} from '../../../utils'

import './products.scss'

class Products extends React.Component {

  componentDidMount() {
    this.props.fetchGithubData()
  }

  render() {
    const {status, productsData} = this.props
    return (
      <Loading status={status} data={productsData}>
        {
          () => (
            <div>
              {
                productsData.map((item, i) => (
                  <ProductCard
                    key={i}
                    ProductData={item}
                  />
                ))
              }
            </div>
          )
        }
      </Loading>
    );
  }
}

Products.propTypes = {
  status: PropTypes.string.isRequired,
  productsData: PropTypes.array.isRequired,
}

const mapState = (state, ownProps) => {
  return {
    status: state.products.status,
    productsData: state.products.productsData,
  };
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchGithubData: () => dispatch(fetchGithub())
})

export default connect(mapState, mapDispatch)(Products)
