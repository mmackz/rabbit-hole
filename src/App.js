import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Table from "./components/Table/Table";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";

import mdata from "./data";

const theme = createTheme({
   palette: {
     success: {
        main: "#81fbb8"
     }
   },
 });

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
      } else {
         setError("Not a valid Ethereum Address");
         setAddress("");
         setData("");
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            value={input}
            placeholder="address"
            onChange={handleChange}
            required
         />
         <button>Submit</button>
         <ThemeProvider theme={theme}>
            <CircularProgress
               size="100px"
               color="success"
               sx={{color: "success.light"}}
               thickness={5}
               variant="determinate"
               value={25}
            />
         </ThemeProvider>
         {error && <p>{error}</p>}
         {data && <Table address={address} data={data} />}
      </form>
   );
}

export default App;
