const axios = require("axios");

exports.handler = async function (event) {
   try {
      const { address } = event.queryStringParameters;
      const response = await axios.get(
         `${process.env.REACT_APP_TASK_URL}?address=${address}`
      );
      return {
         statusCode: 200,
         body: JSON.stringify(response.data)
      };
   } catch (err) {
      console.log(err)
      return {
         statusCode: 404,
         body: err.toString()
      };
   }
};
