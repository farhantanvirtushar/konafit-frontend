import React from "react";
import { useContext, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Collapse from "@mui/material/Collapse";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import MuiPhoneNumber from "material-ui-phone-number";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CSEDU Research Hub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userCreated, setUserCreated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [emailTaken, setemailTaken] = useState(false);

  const rePasswordRef = useRef();

  if (userCreated) {
    return <Redirect to="/" />;
  }

  let remembered = localStorage.getItem("rememberMe") === "true";
  if (remembered) {
    return <Redirect to="/" />;
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      return <Redirect to="/" />;
    }
  }

  const passwordMatchingHandler = (event) => {
    setRePassword(event.target.value);
    if (password != event.target.value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };
  const registerHandler = async (event) => {
    setSubmitted(true);
    event.preventDefault();

    var csrftoken = Cookies.get("csrftoken");
    let config = {
      headers: {
        "X-CSRFToken": csrftoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (password != rePassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      const userData = {
        first_name: firstname,
        last_name: lastname,
        mobile_number: phone,
        email: email,
        password: password,
      };

      try {
        const res = await axios.post("/api/auth/register/", userData, config);
        if (res) {
          let data = res.data;
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("user", JSON.stringify(data));
          setUserCreated(true);
        }
      } catch (error) {
        setSubmitted(false);
        let error_msg = error.response.data.error;

        if (error_msg == "users_email_key") {
          setemailTaken(true);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPhoneNumber
                variant="outlined"
                fullWidth
                defaultCountry={"us"}
                onChange={(value) => setPhone(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Collapse in={emailTaken}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setemailTaken(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  email already exists !
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Re Enter Password"
                type="password"
                id="repassword"
                ref={rePasswordRef}
                onChange={passwordMatchingHandler}
              />
            </Grid>
          </Grid>
          <div className={classes.paper}>
            <Collapse in={!passwordsMatch}>
              <Alert
                severity="error"
                style={{
                  margin: 3,
                }}
              >
                Passwords doesn't match
              </Alert>
            </Collapse>
            {!submitted ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={registerHandler}
              >
                Sign Up
              </Button>
            ) : (
              <CircularProgress />
            )}
          </div>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
