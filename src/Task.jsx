import * as React from 'react';
import ButtonIcon from "./ButtonIcon.jsx";
import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

function Task(props) {
    // Permet de modifier une tâche
    const [canEdit, setCanEdit] = useState(false);

    // Permet d'ouvrir le calendrier
    const [canOpenCalendar, setCanOpenCalendar] = useState(false);

    // Valide la modification
    const edit = (e) => {
        if (e.key === 'Enter' || e.type === 'blur' || e.type === 'click') {
            setCanEdit(!canEdit);
        }
    }

    // Permet de modifier le nom de la tâche
    let objNameTask = <span onClick={edit}>{props.task.name}</span>;

    // Si on peut modifier la tâche mettre un input
    if (canEdit) {
        objNameTask = <input type="text" value={props.task.name} onChange={(e) => props.editTask(props.task.id, e.target.value)} onBlur={edit} onKeyDown={edit} autoFocus />;
    }

    // Permet d'ouvrir le calendrier
    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
        setCanOpenCalendar(!canOpenCalendar);
    };

    const open = Boolean(anchor);
    const [calendarDate, setCalendarDate] = useState(new Date());

    return (
        <li className="task">
            <div className="task-content">
                <div className="head-task">
                    <div className="direction">
                        {props.isFirst ? null : (<ButtonIcon onClick={() => props.swapTask(props.task.id, 'up')}>up-arrow</ButtonIcon>)}
                        {props.isLast ? null : (<ButtonIcon onClick={() => props.swapTask(props.task.id, 'down')}>down-arrow</ButtonIcon>)}
                    </div>
                    <input type="checkbox" checked={props.task.completed} onChange={() => props.toggleTask(props.task.id)}/>
                </div>
                <div className="data-task">
                    {objNameTask}
                    <span className="date">{calendarDate.getDate()}/{calendarDate.getMonth()}/{calendarDate.getFullYear()}</span>
                </div>
                <div className="list-icons">
                    <ButtonIcon onClick={handleClick}>calendar</ButtonIcon>
                    <ButtonIcon onClick={edit}>edit</ButtonIcon>
                    <ButtonIcon onClick={() => props.deleteTask(props.task.id)}>delete</ButtonIcon>
                </div>
            </div>
            {/*canOpenCalendar ? <Calendar className="calendar" onChange={onChange} value={value}/> : null*/}
            <BasePopup
                open={open}
                anchor={anchor}
                disablePortal>
                <Calendar className="calendar" onClickDay={handleClick} onChange={setCalendarDate} value={calendarDate} />
            </BasePopup>
        </li>
    );
}

export default Task;