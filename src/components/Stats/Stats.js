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
   const { hex, ens } = props.address;
   const { level, score, nextLevelScore } = props.data;

   const shortAddress = `${hex.slice(0, 6)}...${hex.slice(-4)}`;
   const ensDisplay = ens ? ens : "N/A";

   // force small font-size for long .eth names
   const ensStyle =
      ensDisplay.length > 20
         ? "xs-small"
         : ensDisplay.length > 16
         ? "small"
         : "";

   return (
      <section className="stats-outer section">
         <h1 className="stats-title">User Stats</h1>
         <div className="stats-inner">
            <div className="stat-container">
               <div className="blockie">
                  <img src={makeBlockie(hex)} alt="blockie" />
               </div>
               <div className="stat-text">
                  <p className={ensStyle}>
                     <span className="small-text">ENS:</span>
                     {ensDisplay}
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
