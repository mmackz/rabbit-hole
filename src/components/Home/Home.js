import Form from "../Form/Form";
import loadingImg from "../../images/magic.svg";

function Home({ props, theme }) {
   const { loading } = props;

   return (
      <>
         {loading && <img className="spinner" src={loadingImg} alt="loading spinner" />}
         <main className={`main-container ${loading && "d-none"}`}>
            <div className="top-section">
               <Form props={{ ...props }} theme={{ ...theme }} />
            </div>
         </main>
      </>
   );
}

export default Home;
