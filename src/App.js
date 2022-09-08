import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import vhCheck from "vh-check";
import reducer from "./helpers/reducers";
import Home from "./components/Home/Home";
import User from "./components/User/User";

function App() {
   const initialState = {
      address: null,
      data: null,
      error: "",
      input: "",
      loading: false,
      provider: null,
      darktheme: false
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   const { address, data, error, input, loading, provider, darktheme } = state;

   const navigate = useNavigate();

   vhCheck();

   useEffect(() => {
      dispatch({
         type: "provider",
         payload: new ethers.providers.AlchemyProvider(
            "homestead",
            process.env.REACT_APP_ALCHEMY_KEY
         )
      });
      document.documentElement.setAttribute("data-theme", "light");
   }, []);

   function handleChange({ target }) {
      dispatch({ type: "input", payload: target.value });
   }

   async function handleSubmit(event) {
      event.preventDefault();
      dispatch({ type: "loading" });
      const regex = /^0x[0-9a-fA-F]{40}|^\S*.eth$/;
      const ensRegex = /^\S*.eth$/;
      if (regex.test(input)) {
         const address = ensRegex.test(input) ? await provider.resolveName(input) : input;

         if (!address) {
            dispatch([
               {
                  type: "error",
                  payload:
                     "The ENS entered is not registered or is not used as a primary address"
               },
               { type: "input", payload: "" },
               { type: "loading" }
            ]);
            setTimeout(() => dispatch({ type: "error", payload: "" }), 6000);
            return;
         }

         try {
            const response = await fetch(`/.netlify/functions/taskapi?address=${address}`);
            const data = await response.json();
            const ens = await provider.lookupAddress(address);
            dispatch([
               { type: "error", payload: "" },
               { type: "address", payload: { hex: address, ens } },
               { type: "data", payload: data.taskData },
               { type: "input", payload: "" },
               { type: "loading" }
            ]);
            navigate(`/${address}`);
         } catch (error) {
            const errorText =
               Object.keys(error).length === 0
                  ? "There was an error fetching the data, please try again... "
                  : JSON.stringify(error);
            dispatch([
               { type: "error", payload: errorText },
               { type: "input", payload: "" },
               { type: "loading" }
            ]);
            setTimeout(() => dispatch({ type: "error", payload: "" }), 6000);
         }
      }
   }

   function toggleDarkmode() {
      dispatch({ type: "darktheme" });
      const theme = darktheme ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
   }

   return (
      <Routes>
         <Route
            path="/"
            element={
               <Home
                  props={{ handleChange, handleSubmit, input, error, loading }}
                  theme={{ darktheme, toggleDarkmode }}
               />
            }
         />
         <Route
            path="/:address"
            element={
               <User
                  props={{
                     handleChange,
                     handleSubmit,
                     input,
                     error,
                     loading,
                     address,
                     data,
                     provider,
                     dispatch
                  }}
                  theme={{ darktheme, toggleDarkmode }}
               />
            }
         />
      </Routes>
   );
}

export default App;
