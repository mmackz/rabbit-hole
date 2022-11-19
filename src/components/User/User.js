import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tasks from "../Tasks/Tasks";
import Form from "../../components/Form/Form";
import Stats from "../../components/Stats/Stats";
import loadingImg from "../../images/magic.svg";

function User({ props, theme }) {
   const {
      handleChange,
      handleSubmit,
      input,
      loading,
      error,
      address,
      data,
      provider,
      dispatch
   } = props;
   const { darktheme, toggleDarkmode } = theme;

   const param = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      async function onLoad() {
         try {
            const response = await fetch(
               `/.netlify/functions/taskapi?address=${param.address}`
            );
            if (response.ok) {
               const data = await response.json();
               const ens = await provider.lookupAddress(param.address);
               dispatch([
                  { type: "error", payload: "" },
                  { type: "address", payload: { hex: param.address, ens } },
                  { type: "data", payload: data }
               ]);
            } else if (response.status !== 200) {
               navigate("/");
               dispatch({ type: "error", payload: "Invalid URL" });
               setTimeout(() => dispatch({ type: "error", payload: "" }), 6000);
            }
         } catch (error) {
            navigate("/");
            const errorText =
               Object.keys(error).length === 0
                  ? "There was an error fetching the data, please try again... "
                  : JSON.stringify(error);
            console.error(errorText);
            dispatch([{ type: "error", payload: errorText }]);
            setTimeout(() => dispatch({ type: "error", payload: "" }), 6000);
         }
      }
      provider && onLoad();
   }, [param.address, provider, dispatch, navigate]);

   const [credentials, setCredentials] = useState({
      daos: false,
      defi: false,
      nfts: false,
      l2: false,
      quest: false
   });

   useEffect(() => {
      if (address.hex !== null) {
         setCredentials({
            daos: false,
            defi: false,
            nfts: false,
            l2: false,
            quest: false
         });
         (async () => {
            const response = await fetch(`/.netlify/functions/credentials?address=${address.hex}`);
            const data = await response.json();
            setCredentials({ ...data });
         })();
      }
   }, [address.hex]);

   return (
      <>
         {(!data || loading) && (
            <img className="spinner" src={loadingImg} alt="loading spinner" />
         )}
         <main className={`main-container ${(!data || loading) && "d-none"}`}>
            <div className="top-section">
               <Form
                  props={{ handleSubmit, handleChange, input, error }}
                  theme={{ darktheme, toggleDarkmode }}
               />
               {data && <Stats address={address} credentials={credentials} />}
            </div>

            {data && <Tasks credentials={credentials} data={data} theme={darktheme} />}
         </main>
      </>
   );
}

export default User;
