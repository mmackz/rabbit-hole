import { useEffect, useReducer } from "react";
import { ethers } from "ethers";
import reducer from "./helpers/reducers";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import Stats from "./components/Stats/Stats";

import mdata from "./data";

function App() {

   const initialState = {
      address: {
         hex: "0xA99F898530dF1514A566f1a6562D62809e99557D",
         ens: "mattie.eth"
      },
      data: mdata,
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
      const ethRegex = /^\S*.eth$/;
      if (regex.test(input)) {
         const address = ethRegex.test(input)
            ? await provider.resolveName(input)
            : input;
         const response = await fetch(TASK_API + address);
         const data = await response.json();
         const ens = await provider.lookupAddress(address);
         dispatch([
            { type: "error", payload: "" },
            { type: "address", payload: { hex: address, ens } },
            { type: "data", payload: data.taskData },
            { type: "input", payload: "" }
         ])
      } else {
         dispatch([
            { type: "error", payload: "Not a valid Ethereum Address" },
            { type: "address", payload: { hex: null, ens: null } },
            { type: "data", payload: null }
         ])
      }
   }

   function toggleDarkmode() {
      dispatch({type: "darktheme"})
      const theme = darktheme ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
   }

   return (
      <main className="main-container">
         <div className="top-section">
            <Form
               props={{ handleSubmit, handleChange, input }}
               theme={{ darktheme, toggleDarkmode }}
            />
            {data && <Stats props={{ address, data }} />}
         </div>

         {error && <p>{error}</p>}
         {data && <Table data={data} theme={darktheme} />}
      </main>
   );
}

export default App;
