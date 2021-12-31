import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import Stats from "./components/Stats/Stats";

import mdata from "./data";

function App() {
   const [address, setAddress] = useState({
      address: "0xA99F898530dF1514A566f1a6562D62809e99557D",
      ens: "mattie.eth"
   });
   const [data, setData] = useState(mdata);
   const [error, setError] = useState("");
   const [input, setInput] = useState("");
   const [provider, setProvider] = useState(null);
   const [darktheme, setDarktheme] = useState(false);

   const TASK_API = `https://${process.env.REACT_APP_TASK_URL}/app/task_progress?address=`;

   useEffect(() => {
      const url = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`;
      setProvider(new ethers.providers.JsonRpcProvider(url));
      document.documentElement.setAttribute("data-theme", "light");
   }, []);

   function handleChange({ target }) {
      setInput(target.value);
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
         setError("");
         setAddress({ address, ens });
         setData(data.taskData);
         setInput("");
      } else {
         setError("Not a valid Ethereum Address");
         setAddress("");
         setData("");
      }
   }

   return (
      <main className="main-container">
         <div className="top-section">
            <Form props={{ handleSubmit, handleChange, input }} theme={{darktheme, setDarktheme}} />
            <Stats props={{ address, data }} />
         </div>

         {error && <p>{error}</p>}
         {data && <Table data={data} theme={darktheme} />}
      </main>
   );
}

export default App;
