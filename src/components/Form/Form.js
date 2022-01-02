import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import rhlogo from "../../../src/images/rabbitholelogo.png";

import { Fade, Popper, Box } from "@mui/material";

function Form({ props, theme, error }) {
   const { handleChange, handleSubmit, input } = props;
   const { darktheme, toggleDarkmode } = theme;
   const inputRef = useRef();

   function focusInput() {
      inputRef.current.focus();
   }

   return (
      <section className="section">
         <form onSubmit={handleSubmit} className="form">
            <div className="logo-container">
               <div className="rh-logo">
                  <img src={rhlogo} alt="logo"></img>
               </div>
               <span className="logo-text">Task Viewer</span>
               <div className="switch-container">
                  <FontAwesomeIcon icon={faSun} size="xs" color="white" />
                  <div className="switch-outer" onClick={toggleDarkmode}>
                     <div className={`switch-inner ${darktheme && "on"}`}></div>
                  </div>
                  <FontAwesomeIcon icon={faMoon} size="xs" color="white" />
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
                     id="input"
                     value={input}
                     autoComplete="off"
                     className="input"
                     placeholder="Search address or ENS name"
                     onChange={handleChange}
                     ref={inputRef}
                     spellCheck="false"
                     pattern="^0x[0-9a-fA-F]{40}|^\S*.eth$"
                     minLength={7}
                     required
                  />
               </div>
               <button type="submit" className="button">
                  SEARCH
               </button>
            </div>
         </form>
         <Popper
            open={!!error}
            anchorEl={document.getElementById("input")}
            transition
         >
            {({ TransitionProps }) => (
               <Fade {...TransitionProps} timeout={350}>
                  <Box
                     sx={{
                        border: 1,
                        p: 1,
                        mt: 1.5,
                        ml: 4.5,
                        fontSize: "0.75rem",
                        bgcolor: "#f8d7da",
                        color: "#842029",
                        borderColor: "#f5c2c7",
                        borderRadius: "3px",
                        boxShadow: "1px 1px 10px black"
                     }}
                  >
                     {error}
                  </Box>
               </Fade>
            )}

            {/* <div className="error">{error}</div> */}
         </Popper>
      </section>
   );
}

export default Form;
