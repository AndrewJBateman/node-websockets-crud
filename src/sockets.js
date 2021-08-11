import { v4 as uuid } from 'uuid';

let todos = [];

export default (io) => {
	io.on('connection', (socket) => {
    console.log('user connected');

		// Send todos to all connected sockets
		socket.emit('server:loadtodos', todos);

    // add new todo to existing todos array using push operator
		socket.on('client:newtodo', (newTodo) => {
			const todo = { id: uuid(), ...newTodo  };
			todos.unshift(todo);
			io.emit('server:newtodo', todo);
		});

    // filter todos to remove todo with id matching delete command
    // then rerender todos
		socket.on('client:deletetodo', (todoId) => {
			todos = todos.filter((todo) => todo.id !== todoId);
			io.emit('server:loadtodos', todos);
		});

    // fetch todo to be edited using find function where ids match
		socket.on('client:gettodo', (todoId) => {
			const todo = todos.find((todo) => todo.id === todoId);
			socket.emit('server:selectedtodo', todo);
		});

    // update todo using new data for todo where ids match
		socket.on('client:updatetodo', (updatedTodo) => {
			todos = todos.map((todo) => {
				if (todo.id === updatedTodo.id) {
					todo.title = updatedTodo.title;
					todo.description = updatedTodo.description;
				}
				return todo;
			});
			io.emit('server:loadtodos', todos);
		});

		socket.on('disconnect', () => {
			console.log(socket.id, 'disconnected');
		});
	});
};
