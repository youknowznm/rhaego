import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card, Badge, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import {FormatDate} from '../../../utils'

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

import StarIcon from 'material-ui-icons/Star';
import DeviceHubIcon from 'material-ui-icons/DeviceHub';

import './productCard.scss'

const ProductCard = ({classes, ProductData}) => {
  const {
    name,
    html_url,
    created_at,
    description,
    stargazers_count,
    forks_count,
    language,
    homepage,
  } = ProductData

  return (
    <div className="card-wrap">
      <Card className="card">
        <a href={html_url} target="_blank">
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
          </CardContent>

          <CardActions disableActionSpacing>
            <IconButton aria-label="Stared">
              <StarIcon />
            </IconButton>
            <Typography className="count" type="caption">
              {stargazers_count}
            </Typography>
            <IconButton aria-label="Forked" className="rotated">
              <DeviceHubIcon />
            </IconButton>
            <Typography className="count" type="caption">
              {forks_count}
            </Typography>
          </CardActions>

         <Button dense color="default" disabled className="tag">{language}</Button>
         {
           homepage === '' ? '' : <Button dense raised color="primary" className="demo-link" target="_blank" href={homepage}>demo</Button>
         }
        </a>
      </Card>
    </div>
  );
}

export default ProductCard
