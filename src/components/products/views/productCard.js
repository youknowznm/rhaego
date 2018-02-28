import React from 'react'
import {Card, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import {formatDate, TransitionWrap} from '../../../utils'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import StarIcon from 'material-ui-icons/Star'
import DeviceHubIcon from 'material-ui-icons/DeviceHub'

import './productCard.css'

const ProductCard = ({classes, eachProductData}) => {
  const {
    name,
    html_url,
    created_at,
    description,
    stargazers_count,
    forks_count,
    language,
    homepage,
  } = eachProductData

  return (
    <TransitionWrap>
      <a className="card-wrap" href={html_url} target="_blank"  style={classes}>
        <Card className="card z-index-2">
          <CardHeader
            className="light-font content-card-header"
            avatar={
              <Avatar className="avatar">{name.trim().slice(0, 1)}</Avatar>
            }
            title={name}
            subheader={formatDate(created_at)}
          >
            <Button>{language}</Button>
          </CardHeader>

          <CardContent className="card-content-holder"></CardContent>

          <p className="custom-card-content light-font">
            {description}
          </p>

          <Typography type="body2" className="language light-font">{language}</Typography>
          {
            homepage === '' ? '' : <Button dense raised className="demo-link" target="_blank" href={homepage}>demo</Button>
          }

          <CardActions className="light-font" disableActionSpacing>
            <IconButton color="inherit" aria-label="Stared" href={html_url + '/stargazers'} target="_blank">
              <StarIcon />
            </IconButton>
            <Typography className="count " type="caption">
              {stargazers_count}
            </Typography>
            <IconButton aria-label="Forked" color="inherit" className="rotated" href={html_url + '/network'} target="_blank">
              <DeviceHubIcon />
            </IconButton>
            <Typography className="count" type="caption">
              {forks_count}
            </Typography>
          </CardActions>

        </Card>
      </a>
    </TransitionWrap>
  )
}

export default ProductCard
