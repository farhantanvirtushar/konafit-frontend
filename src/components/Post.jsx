import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { getUser } from "../User";
import packageJson from "../../package.json";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    marginLeft: "auto",
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post(props) {
  let user = getUser();
  const classes = useStyles();
  const [pdf, setPdf] = useState("");

  let config = {
    headers: {
      Authorization: "Token " + user.key,
    },
  };

  const getPdf = async () => {
    let res = await axios.get("/api/v1/pdf/" + props.post.id, config);
    setPdf(res.data.file);
  };

  useEffect(() => {
    getPdf();
  }, []);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src="https://lumiere-a.akamaihd.net/v1/images/ef91b3eba7549321e53d2c6a18b752a9cf5d2637.jpeg?"
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.post.user}
        subheader={new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date(props.post.pdf_uploaded_at))}
      />
      <CardContent>
        <Typography variant="body1" component="p">
          <a
            href={packageJson.proxy + pdf}
            style={{ textDecoration: "none", color: "blue" }}
          >
            {props.post.pdf_name}
          </a>
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {props.post.pdf_description}
        </Typography>
      </CardContent>
    </Card>
  );
}
