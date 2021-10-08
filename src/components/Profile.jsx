import React from "react";
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
import Button from "@material-ui/core/Button";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";

import { updateUser, getUser } from "../User";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 5,
    paddingBottom: 5,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
  },
  coverPhoto: {
    height: 300,
  },

  profilePicture: {
    marginTop: 200,
    marginLeft: 20,
    width: 150,
    height: 150,
    borderStyle: "solid",
    borderColor: "white",
    position: "absolute",
  },
  profileInfo: {
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 10,
  },
}));

export default function Profile() {
  let user = getUser();

  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.api_token,
    },
  };

  const getProfile = async () => {
    try {
      const res = await axios.get("/api/profile/", config);
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
    } catch (error) {}
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardMedia
            className={classes.coverPhoto}
            image="https://i.pinimg.com/originals/6b/41/14/6b411495b7e628600df81ca3351f3399.jpg"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://lumiere-a.akamaihd.net/v1/images/ef91b3eba7549321e53d2c6a18b752a9cf5d2637.jpeg?"
              className={classes.profilePicture}
            />
          </CardMedia>

          <div className={classes.profileInfo}>
            <Typography variant="h5" color="textPrimary" component="p">
              {user.name}
            </Typography>
            <Typography variant="h7" color="textSecondery" component="p">
              {user.email}
            </Typography>
          </div>
        </div>
      </Card>
      <div>
        {posts.map((item) => (
          <Post key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
}
