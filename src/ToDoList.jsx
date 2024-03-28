import './ToDoList.css'
import Task from "./Task.jsx";
import ToDoInput from "./ToDoInput.jsx";
import {useEffect, useState} from "react";
import Calendar from "react-calendar";
import {isDefaultPropsDeclaration} from "eslint-plugin-react/lib/util/props.js";

function ToDoList() {
    // Récupération des tâches depuis le stockage local lors du chargement initial
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks'));
    });

    const [lastIdTask, setLastIdTask] = useState(() => {
        const storedLastIdTask = localStorage.getItem('lastIdTask');
        return storedLastIdTask ? parseInt(storedLastIdTask) : tasks.length + 1;
    });

    // Enregistrer les tâches dans le stockage local chaque fois qu'elles sont mises à jour
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Enregistrer le dernier ID de tâche dans le stockage local chaque fois qu'il est mis à jour
    useEffect(() => {
        localStorage.setItem('lastIdTask', lastIdTask);
    }, [lastIdTask]);

    // Ajoute une tâche
    const addTasks = (e, idInput) => {
        const inputElement = document.getElementById(idInput);

        if (!inputElement) {
            console.error(`Element with id '${idInput}' not found`);
            return;
        }

        const inputValue = inputElement.value;

        if (e.key === 'Enter' || e.type === 'click') {
            if (inputValue.trim() !== "") {
                setTasks([...tasks, {id: lastIdTask, name: inputValue, completed: false}]);
                setLastIdTask(lastIdTask + 1);
                inputElement.value = "";
            } else {
                alert("Veuillez entrer le nom d'une tâche !");
            }
        }
    }

    // Supprime une tâche
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Modifier une tâche
    const editTask = (id, value) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.name = value;
            }
            return task;
        }))
    }

    // Coche et décoche une tâche
    const toggleTask = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        }));
    }

    // Permet de déplacer une tâche
    const swapTask = (id, direction) => {
        let index;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                index = i;
            }
        }
        if (index !== 0 && direction === 'up') {
            const temp = tasks[index - 1];
            tasks[index - 1] = tasks[index];
            tasks[index] = temp;
            setTasks([...tasks]);
        } else if (index !== tasks.length - 1 && direction === 'down') {
            const temp = tasks[index + 1];
            tasks[index + 1] = tasks[index];
            tasks[index] = temp;
            setTasks([...tasks]);
        }
    }

    return (
        <section id="to-do-list">
            <h2>{tasks.filter(task => task.completed === true).length}/{tasks.length} tâche(s) complété(s)</h2>
            <ToDoInput id="addTask" placeholder="Votre nouvelle tâche..." buttonName="add" action={addTasks}/>

            <ul>
                {tasks.map((task, index) => {
                    if (index === 0)
                        return <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} swapTask={swapTask} isFirst={true} isLast={false}/>
                    else if (index === tasks.length - 1)
                        return <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} swapTask={swapTask} isFirst={false} isLast={true}/>
                    else
                        return <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} swapTask={swapTask} isFirst={false} isLast={false}/>
                })}

            </ul>
        </section>
    );
}

export default ToDoList;