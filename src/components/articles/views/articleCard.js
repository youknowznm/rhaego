import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FavoriteIcon from 'material-ui-icons/Favorite'
import CommentIcon from 'material-ui-icons/Comment'
import {blueGrey} from 'material-ui/colors'
import {SplitToSpans} from '../../../utils'


import './articleCard.css'

const styles = (theme) => ({
  titleAvatar: {
    color: '#fff',
    backgroundColor: blueGrey[500],
    textTransform: 'uppercase',
  },
})

const ArticleCard = ({classes, articleData}) => {
  const {_id, title, summary, tags} = articleData
  const createdDate = articleData.createdDate.slice(0, 10)
  const commentCount = articleData.comments.length
  const likedCount = articleData.comments.liked
  const link = `/article?id=${_id}`
  return (
    <a className="card-wrap" href={link}>
      <Card className="card z-index-2">
        <CardHeader
          className="light-font content-card-header"
          avatar={
            <Avatar className={classes.titleAvatar}>{title.slice(0, 1)}</Avatar>
          }
          title={
            <SplitToSpans>{title}</SplitToSpans>
          }
          subheader={createdDate}
        >
        </CardHeader>

        <CardContent className="holder"></CardContent>

        <p className="custom-card-content light-font z-index-2">
          {summary}
        </p>

        <CardActions className="light-font" disableActionSpacing>
          <IconButton color="inherit" aria-label="Like" disabled>
            <FavoriteIcon />
          </IconButton>
          <Typography className="count " type="caption">
            {likedCount}
          </Typography>
          <IconButton color="inherit" aria-label="Comment" disabled>
            <CommentIcon />
          </IconButton>
          <Typography className="count " type="caption">
            {commentCount}
          </Typography>
        </CardActions>

        <div className="tags">
          {
            tags.map((tag) => {
              const taggedLink = `/articles?tag=${tag}`
              return (
                <Button className="tag"
                  dense
                  raised
                  color="default"
                  href={taggedLink}
                >
                  {tag}
                </Button>
              )
            })
          }
        </div>

      </Card>

    </a>
  )
}

export default withStyles(styles)(ArticleCard)
