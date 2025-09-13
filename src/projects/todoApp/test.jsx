import './ToDo.css'
import { useState } from 'react'

function ToDo() {
    // State to store the list of tasks
    const [tasks, setTasks] = useState([])
    // State to store the current input value
    const [inputValue, setInputValue] = useState('')
    // State to store the task being edited
    const [editIndex, setEditIndex] = useState(null)
    const [editValue, setEditValue] = useState('')

    // Function to handle adding a new task
    const handleAddTask = () => {
        // Only add task if input is not empty
        if (inputValue.trim() !== '') {
            // Add new task to tasks array
            setTasks([...tasks, inputValue])
            // Clear the input
            setInputValue('')
        }
    }

    // Function to handle input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // Function to handle deleting a task
    const handleDeleteTask = (indexToDelete) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete))
    }

    // Function to start editing a task
    const handleStartEdit = (index, task) => {
        setEditIndex(index)
        setEditValue(task)
    }

    // Function to save edited task
    const handleSaveEdit = (index) => {
        if (editValue.trim() !== '') {
            const newTasks = [...tasks]
            newTasks[index] = editValue
            setTasks(newTasks)
            setEditIndex(null)
            setEditValue('')
        }
    }

    // Function to handle edit input changes
    const handleEditChange = (e) => {
        setEditValue(e.target.value)
    }

    return (
        <>
            <div className="todo">
                <div className="todo-header">
                    <h1>To-Do List App</h1>
                </div>
                <div className="todo-body">
                    <input 
                        type="text" 
                        placeholder="Add a new task"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddTask}>Add</button>
                    <ul className="todo-list">
                        {tasks.map((task, index) => (
                            <li key={index}>
                                {editIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={handleEditChange}
                                        />
                                        <button onClick={() => handleSaveEdit(index)}>Save</button>
                                    </>
                                ) : (
                                    <>
                                        {task}
                                        <button onClick={() => handleStartEdit(index, task)}>Edit</button>
                                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ToDo