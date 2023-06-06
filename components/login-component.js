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
                      <input
                        type="text"
                        id="login-input"
                        class="input"
                      />
                    </div>
                    <br />
                    <button class="button" id="login-button">Войти</button>
                  </div>`
                  appElement.innerHTML = appHTML;
    
              document.getElementById('login-button').addEventListener("click", () => {
                loginPost({
                    login: "noizzer",
                    password: "qwerty123",
                }).then((user) => {
                    console.log(user);
                    setToken(`Bearer ${user.user.token}`);
                    fetchTodosAndRender();
                })

              })
              return;
          
    }