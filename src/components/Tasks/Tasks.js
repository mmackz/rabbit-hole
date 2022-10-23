import daos from "../../images/credentials/rhdaos.svg";
import daoImg from "../../images/credentials/daocred.png";
import nfts from "../../images/credentials/rhnfts.svg";
import nftImg from "../../images/credentials/nftcred.png";
import defi from "../../images/credentials/rhdefi.svg";
import defiImg from "../../images/credentials/deficred.png";
import l2 from "../../images/credentials/rhl2.svg";
import l2Img from "../../images/credentials/l2cred.png";
import greenCheck from "../../images/green-check.svg";

function Tasks(props) {
   const task = props.data.taskProgress;

   function formatName(name) {
      return name.replace(/_/g, " ").replace(/(?!\b)[A-Z]/g, (char) => char.toLowerCase());
   }

   const data = Object.entries(task);

   return (
      <div className="tasks-section">
         <section className="credential-card">
            <div className="card-credential">
               <img src={daoImg} alt="DAOs" />
               <img className="checkmark" src={greenCheck} alt="checkmark" />
            </div>

            <div>
               <div className="card-title">
                  <h1 className="form-title">Intro To DAOS</h1>
               </div>

               <div className="card-tasks">
                  <div className="card-task">
                     <p className="card-task-name">Gnosis Safe</p>
                     <span>{data[1][1].progress ? "✅" : "❌"}</span>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default Tasks;

// return (
//    <div className="outer-table">
//       <div className="table-container">
//       <table
//          className={`table table-striped table-bordered table-sm ${
//             darktheme && "table-dark"
//          }`}
//       >
//          <thead>
//             <tr>
//                <th className="left" scope="col">
//                   Task
//                </th>
//                <th scope="col" width="6.875rem" className="px-3">
//                   Progress
//                </th>
//                <th scope="col">Redeemed</th>
//             </tr>
//          </thead>
//          <tbody>
//             {data.length > 0 ? (
//                data.map((item, i) => (
//                   <tr
//                      className={item[1].isDisabled ? "table-danger" : ""}
//                      key={`task-${i}`}
//                   >
//                      <th scope="row">{formatName(item[0])}</th>
//                      <td align="center">{item[1].progress ? "✅" : "❌"}</td>
//                      <td align="center">{(item[1].progress && !legacyTasks.includes(item[0])) || item[1].redeemed ? "✅" : "❌"}</td>
//                   </tr>
//                ))
//             ) : (
//                <tr>
//                   <td colSpan="3" className="text-center">
//                      <p className="py-5">No tasks found.</p>
//                   </td>
//                </tr>
//             )}
//          </tbody>
//       </table>
//       </div>
//    </div>
// );
