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
    if (tasks.length > 0) {
      const allTasksDoneButton = document.querySelector(".js-allTasksDone");
      const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

      allTasksDoneButton.addEventListener("click", () => {
        tasks = tasks.map(task => { return { ...task, done: true } });
        render();
      });

      hideDoneTasksButton.addEventListener("click", () => {
        hideDoneTasks = !hideDoneTasks;
        render();
      });
    };
  };

  const renderButtons = (hideDoneTask) => {
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