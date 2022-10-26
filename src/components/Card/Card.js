import Task from "../Task/Task";
import greenCheck from "../../images/green-check.svg";

function Card(props) {
   const { credential, credImg, data, title } = props;

   return (
      <article className="credential-card">
         <div className="card-credential">
            <div className="card-title">
               <p>Intro To</p>
               <h1 className="form-title">{title}</h1>
            </div>
            <div className="credential-image">
               <img src={credImg} alt="DAOs" />
               <img className={`checkmark ${credential && "active"}`} src={greenCheck} alt="checkmark" />
            </div>
         </div>

         <div>
            <div className="card-tasks">
               {data.map((task, i) => (
                  <Task key={task.taskName + i} data={task} />
               ))}
            </div>
         </div>
      </article>
   );
}

export default Card;
