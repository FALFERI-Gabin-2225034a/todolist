function ButtonIcon(props) {
    return (
        <>
            <button className="icons" onClick={props.onClick}><img src={"./public/icons/" + props.children + ".svg"}/></button>
        </>
    );
}

export default ButtonIcon;