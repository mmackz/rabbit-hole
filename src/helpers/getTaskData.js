import aave from "../images/projects/aave.png";
import gnosis from "../images/projects/gnosis.png";
import hop from "../images/projects/hop.png";
import lido from "../images/projects/lido.png";
import mirror from "../images/projects/mirror.png";
import partybid from "../images/projects/partybid.png";
import quix from "../images/projects/quix.png";
import snapshot from "../images/projects/snapshot.png";
import uniswap from "../images/projects/uniswap.png";
import zora from "../images/projects/zora.png";

function getTaskData(credential, taskdata) {
   switch (credential) {
      case "DAO":
         return [
            {
               taskName: "Gnosis Safe",
               progress: taskdata.find((task) => task[0] === "GNOSIS_SAFE_OWNER")[1].progress,
               logo: gnosis
            },
            {
               taskName: "Snapshot Vote",
               progress: taskdata.find((task) => task[0] === "SNAPSHOT_VOTER")[1].progress,
               logo: snapshot
            },
            {
               taskName: "Lido Delegate",
               progress: taskdata.find((task) => task[0] === "LIDO_RABBITHOLE_DELEGATE")[1].progress,
               logo: snapshot
            }
         ];
      case "NFT":
         return [
            {
               taskName: "Zora Mint",
               progress: taskdata.find((task) => task[0] === "ZORA_MINT")[1].progress,
               logo: zora
            },
            {
               taskName: "PartyBid Bid",
               progress: taskdata.find((task) => task[0] === "PARTY_CONTRIBUTION")[1].progress,
               logo: partybid
            },
            {
               taskName: "Mirror Mint",
               progress: taskdata.find((task) => task[0] === "MIRROR_PUBLISH")[1].progress,
               logo: mirror
            }
         ];
      case "DEFI":
         return [
            {
               taskName: "Lido Deposit",
               progress: taskdata.find((task) => task[0] === "LIDO_DEPOSIT")[1].progress,
               logo: lido
            },
            {
               taskName: "Lido Aave Lend",
               progress: taskdata.find((task) => task[0] === "LIDO_AAVE_LEND")[1].progress,
               logo: aave
            },
            {
               taskName: "Lido USDC Borrow",
               progress: taskdata.find((task) => task[0] === "AAVE_USDC_BORROW")[1].progress,
               logo: aave
            },
            {
               taskName: "Uniswap ETH/USDC Pool",
               progress: taskdata.find((task) => task[0] === "UNISWAP_V3_ETHUSDC_POOL")[1].progress,
               logo: uniswap
            }
         ];
      case "L2":
         return [
            {
               taskName: "Hop Bridge Optimism",
               progress: taskdata.find((task) => task[0] === "optimism_hop_bridgeeth_20220818")[1].progress,
               logo: hop
            },
            {
               taskName: "Uniswap OP/ETH Swap",
               progress: taskdata.find((task) => task[0] === "optimism_uniswapv3_swapethop_20220818")[1].progress,
               logo: uniswap
            },
            {
               taskName: "Quix Mint NFT",
               progress: taskdata.find((task) => task[0] === "optimism_quixotic_mintrbhnft_20220823")[1].progress,
               logo: quix
            }
         ];
      default:
         return [];
   }
}

export default getTaskData;
