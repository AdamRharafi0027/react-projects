import { Moon, Pen, Plus, Search, Trash2, Check } from "lucide-react";
import { useState, useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
      setShowAddTask(false);
    }
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleEditSave = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && todo.completed) ||
      (filter === "Incompleted" && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center py-10 bg-gradient-to-br from-purple-100 to-white relative">
        {/* Header */}
        <div id="header" className="text-center font-bold w-full px-10">
          <h1 className="text-5xl mb-8 text-[#6C63FF]">Todo List</h1>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Search box */}
            <div className="border-2 flex items-center px-4 rounded-lg border-[#6C63FF] bg-white">
              <input
                type="search"
                placeholder="Search tasks..."
                className="w-[20rem] py-2 text-xl outline-0 placeholder:opacity-40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search color="#6C63FF" />
            </div>
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#6C63FF] text-white rounded-lg py-2 px-4 text-xl cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incompleted">Incompleted</option>
            </select>
            {/* Dark Mode Button placeholder */}
            <button className="bg-[#6C63FF] text-white rounded-lg p-2 cursor-pointer hover:bg-[#9F99FF]">
              <Moon size={30} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div id="body" className="w-full max-w-4xl mt-10">
          <h2 className="text-3xl mb-5 text-[#6C63FF] font-semibold">Tasks</h2>
          <div className="pt-5 overflow-y-auto max-h-[400px] border-gray-300 border-2 rounded-lg bg-white shadow-md">
            {filteredTodos.length === 0 ? (
              <h1 className="text-center text-3xl py-10 text-gray-400">
                No tasks found
              </h1>
            ) : (
              filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className="task border-b-2 pb-3 border-gray-200 flex justify-between px-6 items-center py-4 hover:bg-gray-50"
                >
                  <div className="flex gap-4 items-center">
                    <p className="text-xl text-gray-500">{index + 1}.</p>

                    <label class="box">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleCompleted(todo.id)}
                      />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          class="path"
                        ></path>
                      </svg>
                    </label>
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        className="text-xl border px-2 rounded-md"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    ) : (
                      <p
                        className={`text-xl ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.text}
                      </p>
                    )}
                  </div>
                  <div className="btn flex items-center gap-3">
                    {editingId === todo.id ? (
                      <button
                        onClick={() => handleEditSave(todo.id)}
                        className="bg-green-500 hover:bg-green-400 text-white rounded-md p-2 cursor-pointer"
                      >
                        <Check size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => startEditing(todo)}
                        className="bg-[#6C63FF] hover:bg-[#9F99FF] text-white rounded-md p-2 cursor-pointer"
                      >
                        <Pen size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 hover:bg-red-400 text-white rounded-md p-2 cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={() => {
            setShowAddTask(true);
          }}
          className="fixed right-10 bottom-10 bg-[#6C63FF] hover:bg-[#9F99FF] text-white rounded-full p-4 cursor-pointer shadow-xl"
        >
          <Plus size={40} />
        </button>
      </section>

      {/* Modal for adding task */}
      {showAddTask && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center ">
          <div className="bg-white rounded-sm px-8 py-6 w-[90%] max-w-md shadow-lg border-t-9 border-[#6C63FF]">
            <h1 className="text-center text-2xl font-bold uppercase mb-6 text-[#6C63FF]">
              Add Task
            </h1>
            <input
              type="text"
              placeholder="Create a New Task"
              className="mb-6 border-2 border-[#6C63FF] px-4 w-full py-2 outline-0 rounded-lg"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowAddTask(false)}
                className="text-[#6C63FF] duration-100 border-[#6C63FF] border-2 rounded-lg py-2 px-6 text-lg cursor-pointer hover:text-white hover:bg-[#6C63FF]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                disabled={inputValue.trim() === ""}
                className="text-white duration-100 bg-[#6C63FF] border-[#6C63FF] border-2 rounded-lg py-2 px-6 text-lg cursor-pointer hover:text-[#6C63FF] hover:bg-transparent disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
