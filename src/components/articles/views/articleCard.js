import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Typography from 'material-ui/Typography'
import FavoriteIcon from 'material-ui-icons/Favorite'
import CommentIcon from 'material-ui-icons/Comment'
import {grey} from 'material-ui/colors'

import './articleCard.css'

const styles = (theme) => ({
  grayAvatar: {
    color: '#fff',
    backgroundColor: grey[500],
  },
})


const ArticleCard = ({classes, articleData}) => {
  const {title, date, summary, commentCount, favoriteCount} = articleData

  return (
    <div className="card-wrap">
      <Card className="card z-index-2">
        <CardHeader
          className="light-font content-card-header"
          avatar={
            <Avatar className={classes.grayAvatar}>R</Avatar>
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

        <CardContent className="holder"></CardContent>

        <p className="custom-card-content light-font z-index-2">
          {summary}
        </p>

        <CardActions className="light-font" disableActionSpacing>
          <IconButton color="inherit" aria-label="Add to favorites" disabled>
            <FavoriteIcon />
          </IconButton>
          <Typography className="count " type="caption">
            {favoriteCount}
          </Typography>
          <IconButton color="inherit" aria-label="Comment" disabled>
            <CommentIcon />
          </IconButton>
          <Typography className="count " type="caption">
            {commentCount}
          </Typography>
        </CardActions>

        <div className="tags">
          <Button dense raised color="default" className="tag">JavaScript</Button>
          <Button dense raised color="default" className="tag">react native</Button>
        </div>
      </Card>

    </div>
  )
}

export default withStyles(styles)(ArticleCard)
