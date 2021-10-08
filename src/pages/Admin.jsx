import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Container, Grid } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import UserList from "../components/UserList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import { getAdmin } from "../User";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    display: "flex",
    margin: 5,
    paddingBottom: 5,
  },
  appbar: {
    display: "flex",
    flexDirection: "row",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#439dce",
    borderRadius: 10,
    padding: 5,
  },
  row: {
    marginBottom: theme.spacing(5),
  },
  topbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
  },
  searchInput: {
    color: "#ffffff",
  },
}));

export default function Admin() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchNum, setSearchNum] = useState("");
  const limit = 5;

  let admin = getAdmin();

  if (admin == null) {
    window.location.replace("/admin/login");
  }

  const handleLogOut = () => {
    sessionStorage.clear();

    window.location.reload();
  };

  const keyPress = async (event) => {
    if (event.keyCode == 13) {
      getAllUsers(1, event.target.value);
      setSearchNum(event.target.value);
      setPage(1);
    }
  };

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + admin.token,
    },
  };

  const getAllUsers = async (pageNo, search) => {
    try {
      var offset = (pageNo - 1) * limit;
      const res = await axios.get(
        "/api/users?search=%" +
          search +
          "%&limit=" +
          limit +
          "&offset=" +
          offset,
        config
      );

      if (res) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = async (event, page) => {
    setPage(page);
    getAllUsers(page, searchNum);
  };

  useEffect(() => {
    getAllUsers(page, "");
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.topbar}>
          <Typography variant="h6">KONA FIT Admin</Typography>
          <Button variant="contained" color="primary" onClick={handleLogOut}>
            Logout
          </Button>
        </div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              User List
            </Typography>
            <div className={classes.search}>
              <SearchIcon />
              <TextField
                className={classes.searchInput}
                id="outlined-basic"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="search by phone number"
                onKeyDown={keyPress}
              ></TextField>
            </div>
          </Toolbar>
        </AppBar>
        <UserList users={users} />
        <Stack spacing={2} className={classes.row}>
          <Pagination
            count={10}
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </Container>
  );
}
