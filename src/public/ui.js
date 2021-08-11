const todosList = document.querySelector('#todos');
let savedId = '';

// create card to display todo
const todoUI = (todo) => {
	const div = document.createElement('div');
	div.innerHTML = `
  <div class="card text-white bg-success border-dark card-body rounded-4 mb-2">
    <div class="d-flex justify-content-between">
      <h1 class="card-title h3">${todo.title}</h1>
      <div>
        <button class="btn btn-sm btn-danger" id="delete">delete</button>
        <button class="btn btn-sm btn-primary" id="update">update</button>
      </div>
    </div>
    <p>${todo.description}</p>
  </div>
`;

	// button click => delete or update functions
	div
		.querySelector('#delete')
		.addEventListener('click', () => deleteTodo(todo.id));

	div
		.querySelector('#update')
		.addEventListener('click', () => socket.emit('client:gettodo', todo.id));

	return div;
};

// Render list of todos, each one on its own card
const renderTodos = (todos) => {
	savedId = '';
	todosList.innerHTML = '';
	todos.forEach((todo) => {
		todosList.prepend(todoUI(todo));
		console.log('todo: ', todo);
	});
};

const prependTodo = (todo) => {
	todosList.prepend(todoUI(todo));
};
