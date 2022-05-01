import { useState } from "react";
import legacyTasks from "../../helpers/legacy-tasks";

function Table(props) {
   const task = props.data.taskProgress;
   const darktheme = props.theme;

   const [toggleLegacy, setToggleLegacy] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   function formatName(name) {
      return name.replace(/_/g, " ").replace(/(?!\b)[A-Z]/g, (char) => char.toLowerCase());
   }

   const data = Object.entries(task)
      .sort()
      .filter((item) => {
         return toggleLegacy ? item[0] : !legacyTasks.includes(item[0]);
      })
      .filter((item) =>
         formatName(item[0]).toLowerCase().includes(searchTerm.toLowerCase())
      );
   return (
      <div className="outer-table">
         <div className="table-container">
         <table
            className={`table table-striped table-bordered table-sm ${
               darktheme && "table-dark"
            }`}
         >
            <thead>
               <tr>
                  <th className="left" scope="col">
                     Task
                     <input
                        className="table-search"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={({ target }) => setSearchTerm(target.value)}
                     />
                     <div className="switch-container me-1">
                        <span className="xs-small">Legacy Tasks:</span>
                        <div
                           className="switch-outer"
                           onClick={() => setToggleLegacy((state) => !state)}
                        >
                           <div className={`switch-inner ${toggleLegacy && "on"}`}></div>
                        </div>
                     </div>
                  </th>
                  <th scope="col" width="6.875rem" className="px-3">
                     Progress
                  </th>
                  <th scope="col">Redeemed</th>
               </tr>
            </thead>
            <tbody>
               {data.length > 0 ? (
                  data.map((item, i) => (
                     <tr
                        className={item[1].isDisabled ? "table-danger" : ""}
                        key={`task-${i}`}
                     >
                        <th scope="row">{formatName(item[0])}</th>
                        <td align="center">{item[1].progress ? "✅" : "❌"}</td>
                        <td align="center">{item[1].redeemed ? "✅" : "❌"}</td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan="3" className="text-center">
                        <p className="py-5">No tasks found.</p>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
         </div>
      </div>
   );
}

export default Table;
