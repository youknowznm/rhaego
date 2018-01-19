import React from 'react'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

class Loading extends React.Component {
  constructor() {
    super(...arguments)
  }
  render() {
    const {status, children, data} = this.props
    switch (status) {
      case 'loading':
        return (
          <CircularProgress className="mb-loading-placeholder" />
        )
      case 'failure':
        console.log('fail',data);
        return (
          <div className="mb-loading-placeholder">
            <Typography type="subheading">
              An error occurred.
            </Typography>
            <Typography type="subheading">
              Please try again later.
            </Typography>
          </div>
        )
      case 'success':
      console.log('succ',data);
        return children(data)
      default:
        throw new Error('unexpected status ' + status)
    }
  }
}

// const Loading = ({status, data, children}) => {
//   switch (status) {
//     case 'loading':
//       return (
//         <CircularProgress className="mb-loading-placeholder" />
//       )
//     case 'failure':
//       return (
//         <div className="mb-loading-placeholder">
//           <Typography type="subheading">
//             An error occurred.
//           </Typography>
//           <Typography type="subheading">
//             Please try again later.
//           </Typography>
//         </div>
//       )
//     case 'success':
//       return (
//         <div data={data}>
//           {children}
//
//         </div>
//       )
//     default:
//       throw new Error('unexpected status ' + status)
//   }
// }


export default Loading
