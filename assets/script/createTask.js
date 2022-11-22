const tasks = [];

(function (arrOfTask) {
  const objOfTask = arrOfTask.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // НАХОДИМ КОНТАЙНЕР С ЗАДАЧАМИ
  const contentCategory = document.querySelector(".contentCategory");

  // НАХОДИМ ФОРМУ НА СТРАНИЦЕ

  const liBlock = document.querySelector(".categoryBox");
  const form = document.forms["formTask"];
  const inputTitle = form.elements["title"];
  const inputDescription = form.elements["description"];
  const inputCategory = form.elements["category"];

  renderOfTask(objOfTask);

  // EVENT
  // выбираем категорию

  liBlock.addEventListener("click", onCategoryHandler);

  // event form

  form.addEventListener("submit", onFormSubmitHandler);

  // event delete

  contentCategory.addEventListener("click", onDeleteHandler);

  function renderOfTask(taskList) {
    if (!taskList) {
      console.error("no tasks");
      return;
    }
    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach((task) => {
      const item = listItemTemplate(task);
      fragment.appendChild(item);
    });
    contentCategory.appendChild(fragment);
  }
  function listItemTemplate({ _id, title, description, category }) {
    const cardTask = document.createElement("div");
    cardTask.classList.add("categoryItem");
    cardTask.setAttribute("data-task-id", _id);

    const categoryTitleBox = document.createElement("div");
    categoryTitleBox.classList.add("categoryTitleBox");

    const categoryTitle = document.createElement("div");
    categoryTitle.classList.add("categoryTitle");
    const taskTitle = document.createElement("h4");
    taskTitle.textContent = title;
    categoryTitle.append(taskTitle);

    const categoryLogo = document.createElement("div");
    categoryLogo.classList.add("categoryLogo");
    const imgLogo = document.createElement("img");
    if (category == "home task") {
      imgLogo.src = "./assets/svg/home.svg";
    } else if (category == "work task") {
      imgLogo.src = "./assets/svg/library.svg";
    } else {
      imgLogo.src = "./assets/svg/heart.svg";
    }
    categoryLogo.appendChild(imgLogo);

    categoryTitleBox.appendChild(categoryTitle);
    categoryTitleBox.appendChild(categoryLogo);

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("categoryDescription");
    taskDescription.textContent = description;

    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.classList.add("button", "button__del");

    const textBtn = document.createElement("span");
    textBtn.textContent = "delete";

    taskDeleteBtn.append(textBtn);

    cardTask.appendChild(categoryTitleBox);
    cardTask.appendChild(taskDescription);
    cardTask.appendChild(taskDeleteBtn);

    return cardTask;
  }
  function onCategoryHandler(e) {
    const categoryValue = e.target.alt;
    if (!categoryValue) return;
    inputCategory.value = categoryValue;
    return inputCategory;
  }
  function onFormSubmitHandler(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const descriptionValue = inputDescription.value;
    const categoryValue = inputCategory.value;
    if (!titleValue || !descriptionValue || !categoryValue) {
      alert("Заполните все поля!");
      return;
    }
    const task = createNewTask(titleValue, descriptionValue, categoryValue);
    const listItem = listItemTemplate(task);

    contentCategory.insertAdjacentElement("afterbegin", listItem);

    form.reset();
  }
  function createNewTask(title, description, category) {
    const newTask = {
      title,
      description,
      category,
      completed: false,
      id: `task-${Math.random()}`,
    };
    objOfTask[newTask._id] = newTask;
    return { ...newTask };
  }
  function onDeleteHandler(e) {
    if (e.target.classList.contains("button__del")) {
      const parent = e.target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirm = deleteTask(id);
      deleteTaskFromHtml(parent, confirm);
    }
  }
  function deleteTask(id) {
    const isConfirm = confirm("Удалить текущую задачу?");
    if (!isConfirm) return isConfirm;
    delete objOfTask[id];
    return isConfirm;
  }
  function deleteTaskFromHtml(el, confirm) {
    if (!confirm) return;
    el.remove();
  }
})(tasks);
