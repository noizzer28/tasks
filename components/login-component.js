import { loginPost, authPost } from "../api.js";

    export function renderLoginComponent ( { appElement, setToken, fetchTodosAndRender }) {
            let isLoginMode = false;
            const renderForm = () => {
                const appHTML = `             
                <div class="form">
                        <h3 class="form-title">${isLoginMode ? "Регистрация" : "Войти"}</h3>
                        ${isLoginMode ? `                   
                        <div class="form-row">
                            Имя
                            <input
                            type="text"
                            id="name-input"
                            class="input"
                            />
                        </div>` 
                        : ""
                        }
    
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
                                type="password"
                                autocomplete="new-password"
                                id="password-input"
                                class="input"
                              />
                        </div>
                        <br />
                        <button class="button" id="login-button">${isLoginMode ? "Зарегистрироваться": "Войти"}</button>
                        <button class="button" id="auth-button">Перейти${isLoginMode ? " ко входу": " к регистрации"}</button>
                      </div>`

                      appElement.innerHTML = appHTML;

                      document.getElementById('login-button').addEventListener("click", () => {
                        if (!isLoginMode) {
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
                        } else {
                            const login = document.getElementById('login-input').value;
                            const password = document.getElementById('password-input').value;
                            const name = document.getElementById('name-input').value;
                            if (login == "" || password == "" || name == "") {
                                alert("Введите данные")
                                return;
                            }
                            authPost({
                                name: name,
                                login: login,
                                password: password,
                            }).then((user) => {
                                setToken(`Bearer ${user.user.token}`);
                                fetchTodosAndRender();
                            }).catch ((error) => {
                                alert(error.message)
                              }) 
                        }
      
        
        
                      })
        
                      
                    document.getElementById("auth-button").addEventListener("click", () => {
                        isLoginMode = !isLoginMode;
                        console.log("smth")
                        renderForm();
                        
                    })
            }

            renderForm();
    }