import React from 'react'
import {connect} from 'react-redux'

// const Home = () => {
//   return (
//     <div>
//       <div>HOME</div>
//     </div>
//   );
// }

const Home = ({greetings}) => {
  return (
    <div>
      <div>HOME</div>
      <div>{greetings}</div>
    </div>
  );
}

const mapState = (state) => ({greetings: state.greetings})

export default connect(mapState)(Home)

// export default Home
