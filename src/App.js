import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import Stats from "./components/Stats/Stats";


import mdata from "./data";

function App() {
   const [address, setAddress] = useState("");
   const [data, setData] = useState(mdata);
   const [error, setError] = useState("");
   const [input, setInput] = useState("");
   const [provider, setProvider] = useState({});

   const TASK_API = `https://${process.env.REACT_APP_TASK_URL}/app/task_progress?address=`;

   useEffect(() => {
      const url = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`;
      setProvider(new ethers.providers.JsonRpcProvider(url));
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
         setError("");
         setAddress(address);
         setData(data.taskData);
         setInput("");
      } else {
         setError("Not a valid Ethereum Address");
         setAddress("");
         setData("");
      }
   }

   return (
      <div className="container">
         <Form props={{handleSubmit, handleChange, input}} />
         <Stats props={{address, data}} />
         {error && <p>{error}</p>}
         {data && <Table data={data} />}
      </div>
   );
}

export default App;
