interface ITodo {
  text: string;
  complate?: boolean;
}

const todosDB = new Map<number, ITodo>();

todosDB.set(1, { text: "Task 1", complate: false });

let id = 1;

export function getTodos(id?: number) {
  if (id) {
    if (todosDB.has(id)) {
      return { id, ...todosDB.get(id) };
    } else return null;
  }

  return Array.from(todosDB, ([key, value]) => ({ id: key, ...value }));
}

export function createTodo(todo: string) {
  const new_todo: ITodo = {
    text: todo,
    complate: false,
  };

  todosDB.set(++id, new_todo);
}

export function delateTodo(id: number) {
  todosDB.delete(id);
}

export function upteDate(id: number, body: ITodo) {
  if (todosDB.has(id)) {
    const prev_Todo = todosDB.get(id)!;

    todosDB.set(id, { ...prev_Todo, ...body });
  }
}
