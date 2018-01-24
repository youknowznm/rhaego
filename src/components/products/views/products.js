import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchGithub} from '../actions'
import {LoadingContainer} from '../../../utils'

import './products.css'

class Products extends React.Component {

  componentDidMount() {
    this.props.thisFetchGithub()
  }

  render() {
    const {status, productsData} = this.props
    return (
      <LoadingContainer status={status} data={productsData}>
        {
          () => (
            <div className="mb-flex">
              {
                productsData.map((item, i) => (
                  <ProductCard
                    key={i}
                    productData={item}
                  />
                ))
              }
            </div>
          )
        }
      </LoadingContainer>
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
  thisFetchGithub: () => dispatch(fetchGithub())
})

export default connect(mapState, mapDispatch)(Products)
