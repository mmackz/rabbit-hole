import getTaskData from "../../helpers/getTaskData";
import daoImg from "../../images/credentials/daocredsm.png";
import nftImg from "../../images/credentials/nftcred.png";
import defiImg from "../../images/credentials/deficred.png";
import l2Img from "../../images/credentials/l2cred.png";

import Card from "../Card/Card";

function Tasks(props) {
   const data = Object.entries(props.data.taskProgress);
   const { daos, defi, nfts, l2 } = props.credentials;

   return (
      <section className="tasks-section">
         <Card credential={daos} credImg={daoImg} data={getTaskData("DAO", data)} title="DAOs" />
         <Card credential={defi} credImg={defiImg} data={getTaskData("DEFI", data)} title="DEFI" />
         <Card credential={nfts} credImg={nftImg} data={getTaskData("NFT", data)} title="NFTs" />
         <Card credential={l2} credImg={l2Img} data={getTaskData("L2", data)} title="L2"/>
      </section>
   );
}

export default Tasks;
