import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";

const theme = createTheme({
   palette: {
     success: {
        main: "#71d9b1"
     }
   },
 });

function Stats({ props }) {
   const address = props.address;
   const { level, score, nextLevelScore } = props.data;
   return (
      <div className="stats-container">
         <h1 className="stats-title">User Stats</h1>
         <p>Address: {address}</p>
         <p>Level: {level}</p>
         <p>
            Exp. {score}/{nextLevelScore}
         </p>
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
      </div>
   );
}

export default Stats;
