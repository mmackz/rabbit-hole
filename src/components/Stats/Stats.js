import makeBlockie from "ethereum-blockies-base64";
import daos from "../../images/credentials/rhdaos.svg";
import nfts from "../../images/credentials/rhnfts.svg";
import defi from "../../images/credentials/rhdefi.svg";
import l2 from "../../images/credentials/rhl2.svg";

function Stats(props) {
   const { hex, ens } = props.address;
   const { credentials } = props;

   const shortAddress = `${hex.slice(0, 6)}...${hex.slice(-4)}`;
   const ensDisplay = ens ? ens : <small>N/A</small>;

   // force small font-size for long .eth names
   const ensStyle =
      ensDisplay.length > 20 ? "xs-small" : ensDisplay.length > 16 ? "small" : "";

   return (
      <section className="stats-outer section">
         <div className="stats-inner">
            <div className="stat-container">
               <h1 className="stats-title info">Info</h1>
               <div className="stat-address">
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
                        <a
                           className="address-link"
                           href={`https://etherscan.io/address/${hex}`}
                        >
                           {shortAddress}
                        </a>
                     </p>
                  </div>
               </div>
            </div>
            <div className="stat-container credentials">
               <h1 className="stats-title">Credentials</h1>
               <div className="credential-container">
                  <div className={`credential ${credentials.daos && "earned"}`}>
                     <p className="credential-text">DAO</p>
                     <img src={daos} alt="DAO credential" />
                  </div>
                  <div className={`credential ${credentials.defi && "earned"}`}>
                     <p className="credential-text">DEFI</p>
                     <img src={defi} alt="DEFI credential" />
                  </div>
                  <div className={`credential ${credentials.nfts && "earned"}`}>
                     <p className="credential-text">NFT</p>
                     <img src={nfts} alt="NFT credential" />
                  </div>
                  <div className={`credential ${credentials.l2 && "earned"}`}>
                     <p className="credential-text">L2</p>
                     <img src={l2} alt="L2 credential" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Stats;
