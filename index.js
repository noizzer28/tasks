// План
// 1. Реализовать форму логина в приложении
//  * Перенести всю разметку в рендер функцию (+)
//  * Сделать форму входа динамическй (+)
//  * отрефакторить приложение на модули
//    * api (+)
//    * ... TODO
// 2. Реализовать форму регистрации


    import { deleteToDos, getToDos, postToDos } from "./api.js";
    import { renderLoginComponent } from "./components/login-component.js";
    let tasks = [];
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
        renderLoginComponent({ 
            appElement, 
            setToken: (newToken) => {
            token = newToken;
            },
            fetchTodosAndRender
        });
        return;
      }

      const tasksHtml = tasks.map((task) => {
          return `<li class="task">
                  <p class="task-text">
                    ${task.text}, создал ${task.user?.name ?? "Неизвестно"}
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

      // Добавление задачи в список
      const buttonElement = document.getElementById("add-button")
      buttonElement.addEventListener("click", () => {
            if (textInputElement.value === "") {
              console.log('Пустой ввод')
              return;
            }
            buttonElement.disabled = true;
            buttonElement.textContent = "Задача добавляеятся...";
            postToDos({text: textInputElement.value, 
                        token})
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