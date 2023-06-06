import { loginPost } from "../api.js";

    export function renderLoginComponent ( { appElement, setToken, fetchTodosAndRender }) {

            const appHTML = `             
            <div class="form">
                    <h3 class="form-title">Войдите в ситему</h3>
                    <div class="form-row">
                      Логин
                      <input
                        type="text"
                        id="login-input"
                        class="input"
                      />
                    </div>
                    <div class="form-row">
                      Пароль
                      <form action="">
                          <input
                            type="password"
                            autocomplete="new-password"
                            id="password-input"
                            class="input"
                          />
                      </form>
                    </div>
                    <br />
                    <button class="button" id="login-button">Войти</button>
                  </div>`
                  appElement.innerHTML = appHTML;
    
              document.getElementById('login-button').addEventListener("click", () => {
                const login = document.getElementById('login-input').value;
                const password = document.getElementById('password-input').value;
                if (login == "" || password == "") {
                    alert("Введите данные")
                    return;
                }
                loginPost({
                    login: login,
                    password: password,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    fetchTodosAndRender();
                }).catch ((error) => {
                    alert(error.message)
                  }) 


              })
              return;
          
    }