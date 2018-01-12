import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Card as MuiCard, Avatar} from 'material-ui'
import {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card'
import {Collapse} from 'material-ui/transitions'
import MoreVertIcon from 'material-ui-icons/MoreVert';

import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';

import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const data = {
  title: 'Word of the Day',
  summary: 'Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are entry points to more complex and detailed information.',
  liked: 0,
  comments: 0,
  tags: ['JavaScript', 'React']
}

const styles = (theme) => ({
  card: {
    // maxWidth: 400,
    // display: 'inline-block',
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

const Card = ({classes}) => (
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
      title="Srimp and Chorio Paella"
      subheader="Sep 14, 2016"
    >
    </CardHeader>

    <CardContent>
      <Typography component="p">
        This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
        // onClick={this.handleExpandClick}
        aria-expanded={true}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={true} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph type="body2">
          Method:
        </Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
          heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
          browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
          chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
          salt and pepper, and cook, stirring often until thickened and fragrant, about 10
          minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and peppers, and
          cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
          Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
          the rice, and cook again without stirring, until mussels have opened and rice is
          just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>

  </MuiCard>
)

export default withStyles(styles)(Card)
