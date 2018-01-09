import React from 'react'
import {Link} from 'react-router'

const style = {fontWeight: 'bold'}

const view = () => {
  return (
    <div>
      <ul>
        <li style={style}>
          <Link to="/home">Home</Link>
        </li>
        <li style={style}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export {view}
