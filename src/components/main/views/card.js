import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card, Avatar} from 'material-ui'
import {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card'
import {Collapse} from 'material-ui/transitions'
import MoreVertIcon from 'material-ui-icons/MoreVert';


const data = {
  title: 'Word of the Day',
  summary: 'Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are entry points to more complex and detailed information.',
  liked: 0,
  comments: 0,
  tags: ['JavaScript', 'React']
}

const styles = (theme) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transitions: theme.transitions.create(
      'transform',
      {
        duration: theme.transitions.duration.shortest
      }
    )
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto'
  }
})

const Card = ({classes}) => {
  <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar className={classes.avatar}>R</Avatar>
      }
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title="Srimp and Chorio Paella"
      subheader="Sep 14, 2016"
    >
    </CardHeader>

    <CardMedia
      className={classes.media}
      image="/static"
    >

    </CardMedia>
  </Card>
}
