import * as React from 'react';
import { useState } from 'react'

interface ToDoProps {
    compiler: string;
    framework: string;
}

interface Task {
    id: number;
    name: string;
    done: boolean;
}

const dummyData = [
    {
        id: 0,
        name: 'Learn TS',
        done: false
    }
]

const ToDo = (props: any) => {
    const [tasks, setTasks] = useState(dummyData)

    const addNewTask = (newTask: string) => {
        const newTasks = tasks.slice();
        let newTaskObj = {
            id: tasks.length,
            name: newTask,
            done: false
        }
        newTasks.push(newTaskObj);
        setTasks(newTasks);
    }

    const removeTask = (id: number) => {
        const newTasks: Task[] = [];
        tasks.forEach((task) => {
            if (task.id !== id) newTasks.push(task)
        })
        setTasks(newTasks)
    }

    return (
        <div>
            <h1>TypeScript and Sass ToDo</h1>
            <ListContainer tasks={ tasks } removeTask={ removeTask.bind(this) } />
            <AddTask addNewTask={ addNewTask.bind(this) } />
        </div>
    )
}

interface ListContainerProps {
    tasks: Task[];
    removeTask: (id: number) => void;
}

const ListContainer: React.FC<ListContainerProps> = ({ tasks, removeTask }) => {
    return (
        <div>
            <h2>On your list:</h2>
            <ul>
                {
                    tasks.map((task: Task, index: number) => {
                        return (
                            <TaskItem task={ task } key={ index } removeTask={ removeTask } />
                        )
                    })
                }
            </ul>
        </div>
    )
}

interface TaskItemProps {
    task: Task;
    removeTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, removeTask }) => {
    return (
        <li>
            <span>{`${task.name} `}</span>
            <button onClick={() => removeTask(task.id)} >-</button>
        </li>
    )
}

const AddTask = (props: any) => {
    const [taskText, setTaskText] = useState('')

    return (
        <div>
            <label htmlFor="add_task">{`Add new task `}</label>
            <input type="text" id="add_task" onChange={(e) => setTaskText(e.target.value)} />
            <button onClick={ () => props.addNewTask(taskText) } >+</button>
        </div>
    )
}

export { ToDo, ToDoProps };