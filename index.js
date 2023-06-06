// План
// 1. Реализовать форму логина в приложении
//  * Перенести всю разметку в рендер функцию (+)
//  * Сделать форму входа динамическй (+)
//  * отрефакторить приложение на модули
//    * api (+)
//    * ... TODO
// 2. Реализовать форму регистрации
    import { deleteToDos, getToDos, postToDos } from "./api.js";
    let tasks = [];

    // let token = "Bearer c8ccbodkdkb8co6gckd8b8cocwdg5g5k5o6g38o3co3cc3co3d03co3bc3b43k37s3c03c83d43co3cw3c03ek";
    let token = null;

    const host = "https://wedev-api.sky.pro/api/v2/todos";

    const fetchTodosAndRender = () => {
      return getToDos({token})
        .then((responseData) => {
          tasks = responseData.todos;
          renderApp();
        });
    };

    const renderApp = () => {
      const appElement = document.getElementById('app');
      if (token == null) {
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

          const enterElement = document.getElementById('login-button').addEventListener("click", () => {
            token = "Bearer c8ccbodkdkb8co6gckd8b8cocwdg5g5k5o6g38o3co3cc3co3d03co3bc3b43k37s3c03c83d43co3cw3c03ek";
            fetchTodosAndRender();
          })
          return;
      }


      const tasksHtml = tasks.map((task) => {
          return `<li class="task">
                  <p class="task-text">
                    ${task.text}
                    <button data-id="${task.id}" class="button delete-button">Удалить</button>
                  </p>
                </li>`;
        })
        .join("");

      const appHTML = `        
            <h1>Список задач</h1>
            <ul class="tasks" id="list">
              ${tasksHtml}
            </ul>
            <br />
            <div class="form">
              <h3 class="form-title">Форма добавления</h3>
              <div class="form-row">
                Что нужно сделать:
                <input
                  type="text"
                  id="text-input"
                  class="input"
                  placeholder="Выпить кофе"
                />
              </div>
              <br />
              <button class="button" id="add-button">Добавить</button>
            </div>`
      
      appElement.innerHTML = appHTML;      

      const textInputElement = document.getElementById("text-input");

      // Реализаця удаления
      const deleteButtons = document.querySelectorAll(".delete-button");
        for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          const id = deleteButton.dataset.id;
            deleteToDos({token, id})
            .then((responseData) => {
              tasks = responseData.todos;
              renderApp();
            });
        });
      }


      const buttonElement = document.getElementById("add-button")
      buttonElement.addEventListener("click", () => {
            if (textInputElement.value === "") {
              console.log('Пустой ввод')
              return;
            }
            let text = textInputElement.value;
            buttonElement.disabled = true;
            buttonElement.textContent = "Задача добавляеятся...";
            // подписываемся на успешное завершение запроса с помощью then
            postToDos({text, token})
              .then(() => {
                textInputElement.value = "";
              })
              .then(() => {
                return fetchTodosAndRender();
              })
              .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
              })
              .catch((error) => {
                console.error(error);
                alert("Кажется у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
              });
          });
    };
    

    renderApp();