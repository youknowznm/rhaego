import React from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchGithub} from '../actions'
import {LoadingArea, useMaterialBackground} from '../../../utils'

import './products.css'

class Products extends React.Component {
  componentDidMount() {
    this.props.thisFetchGithub()
  }
  componentDidUpdate(prevProps) {
    if (this.props.productsArr !== prevProps.productsArr) {
      useMaterialBackground('.content .card')
    }
  }
  render() {
    const {status, productsArr, statusMsg} = this.props
    return (
      <LoadingArea
        status={status}
        failedMsg={statusMsg}
      >
        {
          () => (
            <div className="mb-flex">
              {
                productsArr.map((item, i) => (
                  <ProductCard
                    key={i}
                    eachProductData={item}
                  />
                ))
              }
            </div>
          )
        }
      </LoadingArea>
    )
  }
}

const mapState = (state) => {
  return {
    status: state.products.status,
    productsArr: state.products.productsArr,
    statusMsg: state.products.statusMsg,
  }
}

const mapDispatch = (dispatch) => ({
  thisFetchGithub: () => dispatch(fetchGithub())
})

export default connect(mapState, mapDispatch)(Products)
