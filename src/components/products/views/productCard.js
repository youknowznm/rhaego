import React from 'react'
import { withStyles } from 'material-ui/styles';
import {Card, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import {formatDate} from '../../../utils'
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import StarIcon from 'material-ui-icons/Star';
import DeviceHubIcon from 'material-ui-icons/DeviceHub';
import {grey} from 'material-ui/colors';

import './productCard.css'

const styles = (theme) => ({
  grayAvatar: {
    color: '#fff',
    backgroundColor: grey[500],
  },
})

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
    <a className="card-wrap" href={html_url} target="_blank"  style={classes}>
      <Card className="card light-font-important">
        <CardHeader
          className="light-font-important"
          avatar={
            <Avatar className={classes.grayAvatar}>{name.slice(0, 1).toUpperCase()}</Avatar>
          }
          title={name}
          subheader={formatDate(created_at)}
        >
          <Button>{language}</Button>
        </CardHeader>

        <CardContent>
          <Typography component="p" className="light-font-important">
            {description}
          </Typography>
          <Typography type="body2" className="language light-font-important">{language}</Typography>
          {
            homepage === '' ? '' : <Button dense raised className="demo-link" target="_blank" href={homepage}>demo</Button>
          }
        </CardContent>

        <CardActions disableActionSpacing>
          <IconButton color="inherit" aria-label="Stared" href={html_url + '/stargazers'} target="_blank">
            <StarIcon />
          </IconButton>
          <Typography className="count light-font-important" type="caption">
            {stargazers_count}
          </Typography>
          <IconButton aria-label="Forked" color="inherit" className="rotated" href={html_url + '/network'} target="_blank">
            <DeviceHubIcon />
          </IconButton>
          <Typography className="count light-bg-important" type="caption">
            {forks_count}
          </Typography>
        </CardActions>
      </Card>
    </a>
  );
}

export default withStyles(styles)(ProductCard);
