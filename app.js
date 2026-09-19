const storageKey = "vanilla-todo-items";
const themeStorageKey = "vanilla-todo-theme";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

let todos = loadTodos();
let currentFilter = "all";
let selectedTheme = loadSelectedTheme();

applyTheme(getActiveTheme());
renderTodos();

themeToggle.addEventListener("click", () => {
  selectedTheme = getActiveTheme() === "dark" ? "light" : "dark";

  localStorage.setItem(themeStorageKey, selectedTheme);
  applyTheme(selectedTheme);
});

colorSchemeQuery.addEventListener("change", () => {
  if (selectedTheme !== null) {
    return;
  }

  applyTheme(getActiveTheme());
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    todoInput.value = "";
    return;
  }

  todos.push({
    id: createTodoId(),
    text,
    completed: false,
  });

  todoInput.value = "";
  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

todoList.addEventListener("change", (event) => {
  if (!event.target.matches(".todo-checkbox")) {
    return;
  }

  const todoId = event.target.closest(".todo-item").dataset.id;
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    return;
  }

  todo.completed = event.target.checked;
  saveTodos();
  renderTodos();
});

todoList.addEventListener("click", (event) => {
  if (!event.target.matches(".delete-button")) {
    return;
  }

  const todoId = event.target.closest(".todo-item").dataset.id;

  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  const visibleTodos = getVisibleTodos();

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = todo.id;

    if (todo.completed) {
      item.classList.add("is-complete");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `切換 ${todo.text} 的完成狀態`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除 ${todo.text}`);

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  updateSummary();
}

function updateSummary() {
  const remainingItems = todos.filter((todo) => !todo.completed).length;

  remainingCount.textContent = `未完成:${remainingItems} 項`;
  emptyMessage.textContent = getEmptyMessage();
  emptyMessage.classList.toggle("is-hidden", getVisibleTodos().length > 0);

  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === currentFilter);
  });
}

function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function getEmptyMessage() {
  if (currentFilter === "active") {
    return "目前沒有未完成的待辦事項";
  }

  if (currentFilter === "completed") {
    return "目前沒有已完成的待辦事項";
  }

  return "還沒有任何待辦事項,新增一個吧!";
}

function loadTodos() {
  const savedTodos = localStorage.getItem(storageKey);

  if (!savedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);

    if (Array.isArray(parsedTodos)) {
      return parsedTodos;
    }
  } catch (error) {
    console.warn("無法讀取待辦事項資料", error);
  }

  return [];
}

function saveTodos() {
  localStorage.setItem(storageKey, JSON.stringify(todos));
}

function createTodoId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadSelectedTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return null;
}

function getActiveTheme() {
  if (selectedTheme !== null) {
    return selectedTheme;
  }

  if (colorSchemeQuery.matches) {
    return "dark";
  }

  return "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️ 淺色模式" : "🌙 深色模式";
}
