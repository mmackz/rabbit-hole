const axios = require("axios");

exports.handler = async function (event) {
   try {
      const { address } = event.queryStringParameters;
      const response = await Promise.all([
         axios.get(`${process.env.REACT_APP_TASK_URL}/task_progress?address=${address}`),
         axios.get(`${process.env.REACT_APP_TASK_URL}/address/${address}`)
      ]);
      const data = {
         ...response[0].data.taskData,
         credentialsMinted: response[1].data.credentialsMinted,
         questsRedeemed: response[1].data.questsRedeemed
      };
      return {
         statusCode: 200,
         body: JSON.stringify(data)
      };
   } catch (err) {
      console.log(err);
      return {
         statusCode: 404,
         body: err.toString()
      };
   }
};
