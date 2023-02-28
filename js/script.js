{
  let tasks = [];
  let hideDoneTasks = false;


  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
          <button class="tasks__button tasks__button--done js-toggleDone">${task.done ? "✔" : ""}</button>
          <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">${task.content}</span>
          <button class="tasks__button tasks__button--remove js-remove">🗑</button>
        </li>
        `;
    }


    document.querySelector(".js-tasks").innerHTML = htmlString;
  }

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    })
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    const markAllTasksDoneButton = document.querySelector(".js-allTasksDone");

    if (markAllTasksDoneButton) {
      markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  }

  const renderButtons = () => {
    let htmlButtonString = "";

    if (tasks.length > 0) {
      htmlButtonString = `
          <button class="section__button js-hideDoneTasks">
              ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
          </button>
          <button class="section__button js-allTasksDone" ${tasks.every(task => task.done) ? "disabled" : ""}>
              Ukończ wszystkie
          </button>
      `;
    };

    document.querySelector(".js-buttons").innerHTML = htmlButtonString;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask")
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent != "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}