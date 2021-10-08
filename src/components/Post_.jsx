import React from "react";

import * as timeago from "timeago.js";
import {
  Paper,
  ImageList,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  paperClass: {
    background: "#f5f8f9",
    marginBottom: theme.spacing(3),
  },
  imageClass: {
    alignItems: "center",
  },
  media: {
    width: "100%",
    borderRadius: 10,
  },
  rowClass: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));

export default function Post(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={3} className={classes.paperClass}>
        <Grid container direction="column">
          <Grid container direction="row" className={classes.rowClass}>
            <Grid item>{props.post.userID}</Grid>
            <Grid item>{timeago.format(props.post.createdAt)}</Grid>
          </Grid>
          <Grid item style={{ padding: 15 }}>
            {props.post.description}
          </Grid>
          <Grid container direction="column" className={classes.imageClass}>
            <Grid item>
              <img
                className={classes.media}
                src="https://images.pexels.com/photos/45901/oxeye-daisy-flower-ox-eye-white-45901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="flower"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={classes.rowClass}>
            <Grid item style={{ display: "flex" }}>
              <ThumbUpAltIcon />
              <Typography style={{ marginLeft: 5 }}>
                {props.post.likes.length}
              </Typography>
            </Grid>
            <Grid item>
              <ChatBubbleIcon />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
