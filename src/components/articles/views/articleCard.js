import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card as MuiCard, Badge, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import CommentIcon from 'material-ui-icons/Comment';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import './articleCard.scss'

const Card = ({classes, articleData}) => {
  const {title, date, summary, commentCount, favoriteCount} = articleData

  return (
    <div className="card-wrap">
      <MuiCard className="card">
        <CardHeader
          avatar={
            <Avatar className="avatar">R</Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={date}
        >
        </CardHeader>

        <CardContent>
          <Typography component="p">
            {summary}
          </Typography>
        </CardContent>

        <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites" color="primary">
              <FavoriteIcon />
            </IconButton>
            <Typography className="count" type="caption">
              {favoriteCount}
            </Typography>
            <IconButton aria-label="Comment" color="accent">
              <CommentIcon />
            </IconButton>
            <Typography className="count" type="caption">
              {commentCount}
            </Typography>
       </CardActions>

       <div className="tags">
         <Button dense raised color="default" className="tag">JavaScript</Button>
         <Button dense raised color="default" className="tag">react native</Button>
       </div>


      </MuiCard>
    </div>
  );
}

export default (Card)
