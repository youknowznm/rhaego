import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card as MuiCard, Avatar} from 'material-ui'
import {CardHeader, CardContent, CardActions} from 'material-ui/Card'

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = (theme) => ({
  card: {
    // maxWidth: 400,
    // display: 'inline-block',
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

const Card = ({classes, title, date, summary}) => (
  <MuiCard className={classes.card}>
    <CardHeader
      avatar={
        <Avatar className={classes.avatar}>R</Avatar>
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
           <IconButton aria-label="Add to favorites">
             <FavoriteIcon />
           </IconButton>
           <IconButton aria-label="Share">
             <ShareIcon />
           </IconButton>
           <div className={classes.flexGrow} />
           <IconButton
             // className={classnames(classes.expand, {
             //   [classes.expandOpen]: this.state.expanded,
             // })}
             // onClick={this.handleExpandClick}
             // aria-expanded={this.state.expanded}
             aria-label="Show more"
           >
             <ExpandMoreIcon />
           </IconButton>
         </CardActions>


  </MuiCard>
)

export default withStyles(styles)(Card)
