import React from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchGithub} from '../actions'
import {LoadingArea} from '../../../utils'

import './products.css'

class Products extends React.Component {

  componentDidMount() {
    this.props.thisFetchGithub()
  }

  render() {
    const {status, productsData, statusMsg} = this.props
    return (
      <LoadingArea
        status={status}
        failedMsg={statusMsg}
      >
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
      </LoadingArea>
    );
  }
}

const mapState = (state) => {
  return {
    status: state.products.status,
    productsData: state.products.productsData,
    statusMsg: state.products.statusMsg,
  };
}

const mapDispatch = (dispatch) => ({
  thisFetchGithub: () => dispatch(fetchGithub())
})

export default connect(mapState, mapDispatch)(Products)
