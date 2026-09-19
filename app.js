const storageKey = "vanilla-todo-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");

let todos = loadTodos();

renderTodos();

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

  todos.forEach((todo) => {
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
  emptyMessage.classList.toggle("is-hidden", todos.length > 0);
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
