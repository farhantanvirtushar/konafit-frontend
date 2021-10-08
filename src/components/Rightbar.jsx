import React from "react";
import { useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Button, Grid } from "@material-ui/core";
import { Avatar, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import { useHistory } from "react-router";
import { getUser } from "../User";
import packageJson from "../../package.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
  search: {
    display: "flex",
    marginBottom: 3,
    padding: 3,
    borderRadius: 25,
    backgroundColor: "#EEEBF0",
    margin: theme.spacing(1, 3),
  },
  searchIcon: {
    paddingLeft: theme.spacing(2),
    margin: 3,
    height: "100%",
  },

  inputInput: {
    width: "100%",
  },
  discover: {
    margin: 6,
    padding: 6,
    borderRadius: 25,
    backgroundColor: "#EEEBF0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Rightbar() {
  const history = useHistory();
  const classes = useStyles();
  const [papers, setPapers] = useState([]);

  let user = getUser();

  let config = {
    headers: {
      Authorization: "Token " + user.api_token,
    },
  };

  const getPapers = async () => {
    try {
      var res = await axios.get("/api/v1/pdf/view_history/", config);

      let len = res.data.length;
      for (var i = 0; i < len; i++) {
        var pdfUrl = await axios.get("/api/v1/pdf/" + res.data[i].id, config);
        pdfUrl = pdfUrl.data.file;
        res.data[i]["file"] = pdfUrl;
      }
      setPapers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPaperDetails = async (paperID) => {
    try {
      let res = await axios.get("/api/v1/pdf/" + paperID, config);
      return res.data.file;
    } catch (error) {
      return "";
    }
  };

  useEffect(() => {
    getPapers();
  }, []);

  const handleClick = async () => {};
  return (
    <div className={classes.discover}>
      <h5>Recently Viewed</h5>
      <div>
        {papers.map((item) => (
          <List>
            <ListItem>
              <Typography style={{ padding: 3 }}>
                <a
                  href={packageJson.proxy + item.file}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {item.pdf_name}
                </a>
              </Typography>
            </ListItem>
          </List>
        ))}
      </div>
    </div>
  );
}
