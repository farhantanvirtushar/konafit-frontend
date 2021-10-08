import React from "react";
import { useHistory } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import { Box, Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Records from "../components/Records";
import { getUser, updateUser } from "../User";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  userInfo: {
    // Fix IE 11 issue.
    marginBottom: 10,
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();

  const history = useHistory();
  let user = getUser();
  const limit = 5;

  var intervalId = null;
  const [started, setstarted] = useState(
    user != null ? user.current_exercise_start_time != "" : false
  );

  const [minutes, setminutes] = useState("00");
  const [seconds, setseconds] = useState("00");
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);

  if (user == null) {
    window.location.replace("/login");
  }

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  };

  const getAllRecords = async (pageNo) => {
    try {
      var offset = (pageNo - 1) * limit;
      const res = await axios.get(
        "/api/records?limit=" + limit + "&offset=" + offset,
        config
      );

      if (res) {
        setRecords(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPoints = async () => {
    try {
      const res = await axios.get("/api/records/totalPoints", config);

      if (res) {
        setTotalPoints(res.data.total_points);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.reload();
  };

  const handlePageChange = async (event, page) => {
    setPage(page);
    getAllRecords(page);
  };
  const handleTimer = async () => {
    try {
      if (started) {
        const end_time = Date.now();
        const start_time = parseInt(user.current_exercise_start_time);
        var duration = end_time - start_time;
        duration = Math.round(duration / 60000);
        var points = duration * 10;
        const data = {
          start_time: start_time,
          end_time: end_time,
          duration: duration,
          points: points,
        };
        user.current_exercise_start_time = "";
        user = updateUser(user);
        setstarted(false);
        const res = await axios.post("/api/records/", data, config);
        console.log(res.data);
        getAllRecords(page);
        getTotalPoints();
      } else {
        const time = Date.now();
        const data = {
          start_time: time,
        };
        user.current_exercise_start_time = time.toString();
        user = updateUser(user);
        setstarted(true);
        const res = await axios.post("/api/records/new", data, config);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var intervalId;
    if (user.current_exercise_start_time != "") {
      intervalId = setInterval(() => {
        var current_time = Date.now();
        var interval =
          current_time - parseInt(user.current_exercise_start_time);

        var totalseconds = Math.floor(interval / 1000);
        var totalminutes = Math.floor(totalseconds / 60);
        totalseconds = Math.floor(totalseconds % 60);

        console.log("====================================");
        console.log(
          "start time = " +
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(user.current_exercise_start_time)
        );
        console.log(
          "current time = " +
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(current_time)
        );

        console.log("start = " + parseInt(user.current_exercise_start_time));
        console.log("end = " + current_time);

        console.log("milisecnds = " + interval);

        console.log("minutes = " + totalminutes);
        console.log("seconds = " + totalseconds);
        console.log("====================================");
        if (totalminutes < 10) {
          totalminutes = "0" + totalminutes.toString();
        } else {
          totalminutes = totalminutes.toString();
        }
        if (totalseconds < 10) {
          totalseconds = "0" + totalseconds.toString();
        } else {
          totalseconds = totalseconds.toString();
        }
        setminutes(totalminutes);
        setseconds(totalseconds);
      }, 1000);
    } else {
      setminutes("00");
      setseconds("00");
    }
    getAllRecords(page);
    getTotalPoints();
    return () => clearInterval(intervalId);
  }, [started]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.topbar}>
          <Typography variant="h6">KONA FIT</Typography>
          <Button variant="contained" color="primary" onClick={handleLogOut}>
            Logout
          </Button>
        </div>
        <div className={classes.userInfo}>
          <Typography variant="body1">
            {user.first_name + " " + user.last_name}
          </Typography>
          <Typography variant="body1">{user.mobile_number}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body1">{totalPoints + " points"}</Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleTimer}
        >
          {started ? "End" : "Start"}
        </Button>
        <Typography variant="h3">{minutes + ":" + seconds}</Typography>

        <Records records={records} />
        <Stack spacing={2}>
          <Pagination
            count={10}
            color="primary"
            page={page}
            onChange={handlePageChange}
            className={classes.row}
          />
        </Stack>
      </div>
    </Container>
  );
}
