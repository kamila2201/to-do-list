{
  const tasks = [];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li>
          <span class="${task.done ? "tasks__content--done" : ""}">${task.content}</span>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };


  const init = () => {
    const form = document.querySelector(".js-form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-newTask").value.trim();

      if (newTaskContent === "") {
        return;
      }

      tasks.push({
        content: newTaskContent,
      });

      render();
    });
  };

  init();
}