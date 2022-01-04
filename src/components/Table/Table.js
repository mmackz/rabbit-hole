import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCopy } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";

function Table(props) {
   const task = props.data.taskProgress;
   const darktheme = props.theme;

   const [openDropdown, setOpenDropdown] = useState(null);
   const [activeTooltip, setActiveTooltip] = useState(null);
   const [timeoutId, setTimeoutId] = useState(null);

   useEffect(() => {
      function resetDropdown() {
         if (openDropdown && !openDropdown.classList.contains("d-none")) {
            openDropdown.classList.add("d-none");
            setOpenDropdown(null);
         }
      }
      document.body.addEventListener("click", resetDropdown);

      return () => document.body.removeEventListener("click", resetDropdown);
   }, [openDropdown]);

   useEffect(() => {
      const tooltipTriggerList = [].slice.call(
         document.querySelectorAll(".copy-icon")
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
         return new Tooltip(tooltipTriggerEl, {
            title: "Copied!",
            trigger: "manual"
         });
      });
   }, [activeTooltip]);

   function copyId(index, event) {
      event.stopPropagation();
      const idEl = document.getElementById(`id-${index}`);
      if (window.isSecureContext) {
         navigator.clipboard.writeText(idEl.textContent);
      }
      const tooltipEl = document.getElementById(`projectId-${index}`);
      const tooltip = Tooltip.getInstance(tooltipEl);
      timeoutId && clearTimeout(timeoutId);
      activeTooltip && activeTooltip.hide();
      tooltip.show();
      setActiveTooltip(tooltip);
      const timeout = setTimeout(() => tooltip.hide(), 1000);
      setTimeoutId(timeout);
   }

   function dropdown(index, event) {
      event.stopPropagation();
      if (!event.target.classList.contains("drop-item")) {
         openDropdown && openDropdown.classList.add("d-none");
         const el = document.getElementById(`dropdown-${index}`);
         if (openDropdown === el) {
            setOpenDropdown(null);
         } else {
            el.classList.remove("d-none");
            setOpenDropdown(el);
         }
      }
   }

   function formatName(name) {
      return name
         .replace(/_/g, " ")
         .replace(/(?!\b)[A-Z]/g, (char) => char.toLowerCase());
   }

   const data = Object.entries(task).sort();

   return (
      <div className="table-container">
         <table className={`table table-striped table-bordered table-sm ${darktheme && "table-dark"}`}>
            <thead>
               <tr>
                  <th className="left" scope="col">
                     Task
                  </th>
                  <th scope="col">Progress</th>
                  <th scope="col">Redeemed</th>
                  <th scope="col">ID</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item, i) => (
                  <tr
                     className={item[1].isDisabled ? "table-danger" : ""}
                     key={`task-${i}`}
                  >
                     <th scope="row">{formatName(item[0])}</th>
                     <td align="center">{item[1].progress ? "✅" : "❌"}</td>
                     <td align="center">{item[1].redeemed ? "✅" : "❌"}</td>
                     <td
                        align="center"
                        className="dropdown"
                        onClick={(e) => dropdown(i, e)}
                     >
                        <FontAwesomeIcon icon={faCaretDown} />
                        <p className="d-none drop-item" id={`dropdown-${i}`}>
                           <span
                              onClick={(e) => e.stopPropagation()}
                              id={`id-${i}`}
                           >
                              {item[1].projectId}
                           </span>
                           <FontAwesomeIcon
                              icon={faCopy}
                              id={`projectId-${i}`}
                              className="copy-icon"
                              onClick={(e) => copyId(i, e)}
                           />
                        </p>
                     </td>
                  </tr>
               ))}
            </tbody>
            <tfoot></tfoot>
         </table>
      </div>
   );
}

export default Table;
