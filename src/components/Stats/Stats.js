import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import makeBlockie from "ethereum-blockies-base64";

const theme = createTheme({
   palette: {
      success: {
         main: "#71d9b1"
      }
   }
});

function Stats({ props }) {
   const { address, ens } = props.address;
   const { level, score, nextLevelScore } = props.data;

   const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

   return (
      <section className="stats-outer section">
         <h1 className="stats-title">User Stats</h1>
         <div className="stats-inner">
            <div className="stat-container">
               <div className="blockie">
                  <img src={makeBlockie(address)} alt="blockie" />
               </div>
               <div className="stat-text">
                  <p>
                     <span className="small-text">ENS:</span>
                     {ens ? ens : "N/A"}
                  </p>
                  <p className="short-address">
                     <span className="small-text">Address:</span>
                     {shortAddress}
                  </p>
               </div>
            </div>

            <div className="stat-container">
               <ThemeProvider theme={theme}>
                  <CircularProgress
                     size="40px"
                     sx={{ color: "success.light" }}
                     thickness={6}
                     variant="determinate"
                     value={75}
                  />
               </ThemeProvider>
               <div className="stat-text">
                  <p>
                     <span className="small-text">Level:</span> {level}
                  </p>
                  <p>
                     <span className="small-text">Exp.</span> {score}/
                     {nextLevelScore}
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Stats;
