import React from 'react'
import {Card, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import {FormatDate} from '../../../utils'

import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import StarIcon from 'material-ui-icons/Star';
import DeviceHubIcon from 'material-ui-icons/DeviceHub';

import './productCard.css'

const ProductCard = ({classes, productData}) => {
  const {
    name,
    html_url,
    created_at,
    description,
    stargazers_count,
    forks_count,
    language,
    homepage,
  } = productData

  return (
    <a className="card-wrap" href={html_url} target="_blank"  style={classes}>
      <Card className="card">
        <CardHeader
          avatar={
            <Avatar className="avatar">{name.slice(0, 1).toUpperCase()}</Avatar>
          }
          title={name}
          subheader={FormatDate(created_at)}
        >
          <Button>{language}</Button>
        </CardHeader>

        <CardContent>
          <Typography component="p">
            {description}
          </Typography>
          <Typography type="body2" className="language">{language}</Typography>
          {
            homepage === '' ? '' : <Button dense raised className="demo-link" target="_blank" href={homepage}>demo</Button>
          }
        </CardContent>

        <CardActions disableActionSpacing>
          <IconButton aria-label="Stared" href={html_url + '/stargazers'} target="_blank">
            <StarIcon />
          </IconButton>
          <Typography className="count" type="caption">
            {stargazers_count}
          </Typography>
          <IconButton aria-label="Forked" className="rotated" href={html_url + '/network'} target="_blank">
            <DeviceHubIcon />
          </IconButton>
          <Typography className="count" type="caption">
            {forks_count}
          </Typography>
        </CardActions>
      </Card>
    </a>
  );
}

export default ProductCard
