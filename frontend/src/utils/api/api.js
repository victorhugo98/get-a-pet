const API_URL = "http://localhost:5000";

export function CREATE_USER(user) {
  return {
    url: API_URL + "/user/register",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  };
}

export function CHECK_USER(token) {
  return {
    url: API_URL + "/user/checkuser",
    options: {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_LOGIN(user) {
  return {
    url: API_URL + "/user/login",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    },
  };
}

export function UPDATE_USER(token, formData) {
  return {
    url: API_URL + "/user/edit",
    options: {
      method: "PATCH",
      headers: { authorization: "Bearer " + token },
      body: formData,
    },
  };
}
