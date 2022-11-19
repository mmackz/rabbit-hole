function handleError(err) {
   const error = err.error;

   if (error.includes("User does exist")) {
      return "No Activity Found For This Address";
   }

   if (error.includes("failed with status code 403")) {
      return "Request Failed With Status Code 403";
   }

   return "There was an error fetching the data, please try again..."
}

export default handleError;