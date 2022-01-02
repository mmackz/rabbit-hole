import { useEffect, useReducer } from "react";
import { ethers } from "ethers";
import reducer from "./helpers/reducers";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import Stats from "./components/Stats/Stats";

import mdata from "./data";

// address: {
//    hex: "0xA99F898530dF1514A566f1a6562D62809e99557D",
//    ens: "mattie.eth"
// }

function App() {
   const initialState = {
      address: null,
      data: null,
      error: "",
      input: "",
      provider: null,
      darktheme: false
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   const { address, data, error, input, provider, darktheme } = state;

   const TASK_API = `https://${process.env.REACT_APP_TASK_URL}/app/task_progress?address=`;

   useEffect(() => {
      const url = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`;
      dispatch({
         type: "provider",
         payload: new ethers.providers.JsonRpcProvider(url)
      });
      document.documentElement.setAttribute("data-theme", "light");
   }, []);

   function handleChange({ target }) {
      dispatch({ type: "input", payload: target.value });
   }

   async function handleSubmit(event) {
      event.preventDefault();
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
               { type: "input", payload: "" }
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
               { type: "input", payload: "" }
            ]);
         } catch (error) {
            const errorText =
               Object.keys(error).length === 0
                  ? "There was an error fetching the data, please try again... "
                  : JSON.stringify(error);

            dispatch([
               { type: "error", payload: errorText },
               { type: "address", payload: { hex: null, ens: null } },
               { type: "data", payload: null }
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
      <main className="main-container">
         <div className="top-section">
            <Form
               props={{ handleSubmit, handleChange, input }}
               theme={{ darktheme, toggleDarkmode }}
               error={error}
            />
            {data && <Stats props={{ address, data }} />}
         </div>

         {data && <Table data={data} theme={darktheme} />}
      </main>
   );
}

export default App;
