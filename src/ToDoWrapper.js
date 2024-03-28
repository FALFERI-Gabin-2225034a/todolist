function ToDoWrapper(props) {
    return (
        <div className="todo-wrapper">
            {props.children}
        </div>
    );
}

export default ToDoWrapper;