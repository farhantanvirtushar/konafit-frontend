export const getUser = () => {
  let user = null;
  let remembered = localStorage.getItem("rememberMe") === "true";
  if (remembered) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
  }
  return user;
};

export const updateUser = (user) => {
  let remembered = localStorage.getItem("rememberMe") === "true";
  if (remembered) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }
  return user;
};

export const getAdmin = () => {
  let admin = null;
  let remembered = sessionStorage.getItem("adminLoggedIn") === "true";
  if (remembered) {
    admin = JSON.parse(sessionStorage.getItem("admin"));
  }
  return admin;
};
