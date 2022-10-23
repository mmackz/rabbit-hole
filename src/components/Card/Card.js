import greenCheck from "../../images/green-check.svg";

function Card(props) {
   const { credImg, data } = props;
   const { logo, taskName, progress } = data;

   return (
      <article className="credential-card">
         <div className="card-credential">
            <img src={credImg} alt="DAOs" />
            <img className="checkmark" src={greenCheck} alt="checkmark" />
         </div>

         <div>
            <div className="card-title">
               <h1 className="form-title">Intro To DAOS</h1>
            </div>

            <div className="card-tasks">
               <div className="card-task">
                  <img className="card-logo" src={logo} alt="Gnosis Logo" />
                  <p className="card-task-name">{taskName}</p>
                  <div className={`task-status ${progress && "complete"}`}>
                     <div className="task-status-circle"></div>
                     <p className="task-status-text">
                        {progress ? "Complete" : "Incomplete"}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </article>
   );
}

export default Card;
