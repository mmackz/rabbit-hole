const axios = require("axios");

exports.handler = async function (event) {
   try {
      const { address } = event.queryStringParameters;
      const response = await axios.get(
         `${process.env.REACT_APP_TASK_URL}/address/${address}`
      );
      const credentials = Object.fromEntries(
         Object.entries(response.data.credentialsMinted).map(([key, value]) => [
            key.slice(9),
            value
         ])
      );
      credentials.quest = response.data.questsRedeemed.includes(
         process.env.REACT_APP_QUEST_ID
      );
      return {
         statusCode: 200,
         body: JSON.stringify(credentials)
      };
   } catch (err) {
      console.log(err);
      return {
         statusCode: 404,
         body: err.toString()
      };
   }
};
