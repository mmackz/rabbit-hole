function Task(props) {

   const { logo, taskName, progress } = props.data;

   return (
      <div className="card-task">
         <img className="card-logo" src={logo} alt="Gnosis Logo" />
         <p className={`card-task-name ${taskName.length > 17 && "long"}`}>{taskName}</p>
         <div className={`task-status ${progress && "complete"}`}>
            <div className="task-status-circle"></div>
            <p className={`task-status-text ${progress && "complete"}`}>{progress ? "Complete" : "Incomplete"}</p>
         </div>
      </div>
   );
}

export default Task;
