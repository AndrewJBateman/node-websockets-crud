const todoForm = document.querySelector('#todoForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

todoForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (savedId) {
		updateTodo(savedId, title.value, description.value);
	} else {
		saveTodo(title.value, description.value);
	}

	title.value = '';
	description.value = '';

	title.focus();
});
