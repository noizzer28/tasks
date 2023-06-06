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
                setToken("Bearer c8ccbodkdkb8co6gckd8b8cocwdg5g5k5o6g38o3co3cc3co3d03co3bc3b43k37s3c03c83d43co3cw3c03ek");
                fetchTodosAndRender();
              })
              return;
          
    }