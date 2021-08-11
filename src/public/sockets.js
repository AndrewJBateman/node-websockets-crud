const socket = io.connect();

/**
 * create a new todo
 * @param {string} title  - title of new todo
 * @param {string} description - description of new todo
 */
const saveTodo = (title, description) => {
  socket.emit("client:newtodo", {
    title,
    description,
  });
};

/**
 * delete a todo based on an Id
 * @param {string} id - todo ID
 */
const deleteTodo = (id) => {
  socket.emit("client:deletetodo", id);
};

/**
 *
 * @param {string} id - todo ID
 * @param {string} title - todo title
 * @param {string} description - todo description
 */
const updateTodo= (id, title, description) => {
  socket.emit("client:updatetodo", {
    id,
    title,
    description,
  });
};

socket.on("server:loadtodos", renderTodos);

socket.on("server:newtodo", prependTodo);

socket.on("server:selectedtodo", (todo) => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  title.value = todo.title;
  description.value = todo.description;

  savedId = todo.id;
});