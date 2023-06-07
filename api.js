const host = "https://wedev-api.sky.pro/api/v2/todos";


export function getToDos ({token}) {
     return fetch(host, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            throw new Error("Нет авторизации");
          }

          return response.json();
        })
}

export function deleteToDos ({token, id}) {
    return fetch(host +"/" + id, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
}

export function postToDos ({text, token}) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text
        }),
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
}


export function loginPost ({login, password}) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password
      }),
    })
      .then((response) => {
        if (response.status == 400) {
          throw new Error("Неверный логин или пароль")
        }
        return response.json();
      })
}

export function authPost ({login, password, name}) {
  return fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({
        name,
        login,
        password,
      }),
    })
      .then((response) => {
        if (response.status == 400) {
          throw new Error("Пользователь с таким логином уже существует")
        }
        return response.json();
      })
}