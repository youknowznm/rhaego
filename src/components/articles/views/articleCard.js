import React from 'react'
import {Card, Button, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FavoriteIcon from 'material-ui-icons/Favorite'
import CommentIcon from 'material-ui-icons/Comment'
import {blueGrey} from 'material-ui/colors'
import {SplitToSpans, formatDate} from '../../../utils'

import './articleCard.css'

const ArticleCard = ({classes, articleData}) => {
  const {_id, title, summary, tags} = articleData
  const createdDate = formatDate(new Date(articleData.createdDate))
  const commentCount = articleData.comments.length
  const likedCount = articleData.liked.length
  const link = `/article?id=${_id}`
  return (
    <a className="card-wrap" href={link}>
      <Card className="card z-index-2">
        <CardHeader
          className="light-font content-card-header"
          avatar={
            <Avatar className="avatar">{title.slice(0, 1)}</Avatar>
          }
          title={
            <SplitToSpans className="mono">{title}</SplitToSpans>
          }
          subheader={createdDate}
        >
        </CardHeader>

        <CardContent className="card-content-holder"></CardContent>

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
            tags.map((tag, index) => {
              const taggedLink = `/articles?tag=${tag}`
              return (
                <Button className="tag"
                  key={index}
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

export default ArticleCard
