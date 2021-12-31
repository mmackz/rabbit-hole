import { useRef } from "react";
import rhlogo from "../../../src/images/rabbitholelogo.png";

function Form({ props, theme }) {
   const { handleChange, handleSubmit, input } = props;
   const { darktheme, setDarktheme } = theme;
   const inputRef = useRef()

   function focusInput() {
      inputRef.current.focus()
   }

   function toggleDarkmode() {
      setDarktheme(state => !state);
      const theme = darktheme ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
   }

   return (
      <section className="section">
         <form onSubmit={handleSubmit} className="form">
            <div className="logo-container">
               <div className="rh-logo">
                  <img src={rhlogo} alt="logo"></img>
               </div>
               <span className="logo-text">Task Viewer</span>
               <div className="switch-outer" onClick={toggleDarkmode}>
                  <div className={`switch-inner ${darktheme && "on"}`}></div>
               </div>
            </div>
            <h1 className="form-title">Enter Users Address or ENS</h1>
            <div className="input-container">
               <div className="searchbar">
                  <div className="icon-container" onClick={focusInput}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-search s-icon"
                        viewBox="0 0 16 16"
                     >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                     </svg>
                  </div>
                  <input
                     type="text"
                     value={input}
                     className="input"
                     placeholder="Search address or ENS name"
                     onChange={handleChange}
                     ref={inputRef}
                     spellCheck="false"
                     required
                  />
               </div>
               <button className="button">SEARCH</button>
            </div>
         </form>
      </section>
   );
}

export default Form;
