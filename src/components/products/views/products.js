import React from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import {fetchGithub} from '../actions'
import {Loading} from '../../../utils'

import './products.scss'

class Products extends React.Component {

  componentDidMount() {
    this.props.fetchGithub()
  }

  render() {
    const {status, productsData} = this.props
    return (
      <Loading status={status} data={productsData}>
        {
          (data) => {
            // console.log('suc',data);
            return data.map((item, i) => (
              <ProductCard
                key={i}
                ProductData={item}
              />
            ));
          }
        }
        {/* <div className="products">
          {
            productsData.map((item, i) => (
              <ProductCard
                key={i}
                ProductData={item}
              />
            ))
          }
        </div> */}
      </Loading>
    );

    // switch (status) {
    //   case 'loading':
    //     return (
    //       <CircularProgress className="mb-loading-placeholder" />
    //     );
    //   case 'failure':
    //     return (
    //       <div className="mb-loading-placeholder">
    //         <Typography type="subheading">
    //           An error occurred.
    //         </Typography>
    //         <Typography type="subheading">
    //           Please try again later.
    //         </Typography>
    //       </div>
    //     );
    //   case 'success':
    //     return (
    //       <div className="products">
    //         {
    //           productsData.map((item, i) => (
    //             <ProductCard
    //               key={i}
    //               ProductData={item}
    //             />
    //           ))
    //         }
    //       </div>
    //     );
    //   default:
    //     throw new Error('unexpected status ' + status);
    // }
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
