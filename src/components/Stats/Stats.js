import makeBlockie from "ethereum-blockies-base64";

function Stats({ props }) {
   const { hex, ens } = props.address;
   // const { credentialsMinted, questsRedeemed } = props.data;

   const shortAddress = `${hex.slice(0, 6)}...${hex.slice(-4)}`;
   const ensDisplay = ens ? ens : <small>N/A</small>;

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
                     <a className="address-link" href={`https://etherscan.io/address/${hex}`}>{shortAddress}</a>
                  </p>
               </div>
            </div>

            <div className="stat-container">
               <div className="stat-text">
                  <p>
                     <span className="small-text">Credentials Go Here</span>
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Stats;
