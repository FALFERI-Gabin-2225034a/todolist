import ButtonIcon from "./ButtonIcon.jsx";

function ToDoInput({id, action, buttonName, placeholder}) {
    return (
        <div className="todo-input">
            <ButtonIcon onClick={(e) => action(e, id)}>{buttonName}</ButtonIcon>
            <input type="text" id={id} placeholder={placeholder} onKeyDown={(e) => action(e, id)} />
        </div>
    );
}

export default ToDoInput;