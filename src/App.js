import { useEffect, useReducer } from "react";
import { ethers } from "ethers";
import reducer from "./helpers/reducers";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import Stats from "./components/Stats/Stats";
import loadingImg from "../src/images/magic.svg";

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

   const TASK_API = `https://${process.env.REACT_APP_TASK_URL}/task_progress?address=`;

   useEffect(() => {
      dispatch({
         type: "provider",
         payload: new ethers.providers.getDefaultProvider()
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
         const address = ensRegex.test(input)
            ? await provider.resolveName(input)
            : input;

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
            const response = await fetch(TASK_API + address);
            const data = await response.json();
            const ens = await provider.lookupAddress(address);
            dispatch([
               { type: "error", payload: "" },
               { type: "address", payload: { hex: address, ens } },
               { type: "data", payload: data.taskData },
               { type: "input", payload: "" },
               { type: "loading" }
            ]);
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
      <>
         {loading && (
            <img className="spinner" src={loadingImg} alt="loading spinner" />
         )}
         <main className={`main-container ${loading && "d-none"}`}>
            <div className="top-section">
               <Form
                  props={{ handleSubmit, handleChange, input, error }}
                  theme={{ darktheme, toggleDarkmode }}
               />
               {data && <Stats props={{ address, data }} />}
            </div>

            {data && <Table data={data} theme={darktheme} />}
         </main>
      </>
   );
}

export default App;
