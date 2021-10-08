import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./Post";
import CreatePost from "./CreatePost";

import { getUser } from "../User";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
}));

export default function Feed() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);

  const limit = 2;

  const user = getUser();

  const getPosts = async () => {
    const res = await axios.get(
      "/api/v1/pdf/?offset=" + offset + "&limit=" + limit
    );

    setPosts([...posts, ...res.data.results]);
    setOffset(offset + limit);
    console.log("offset = " + offset);
    console.log("limit = " + limit);
    console.log(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className={classes.root}>
      <CreatePost />
      <InfiniteScroll
        dataLength={posts.length}
        next={getPosts}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((item) => (
          <Post key={item.id} post={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
