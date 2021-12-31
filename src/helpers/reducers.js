function reducer(state, action) {
   if (Array.isArray(action)) {
      let newState = { ...state };
      action.forEach((item) => {
         newState = reducer(newState, item);
      });
      return newState;
   }

   const { type, payload } = action;

   switch (type) {
      case "address":
         return { ...state, address: { hex: payload.hex, ens: payload.ens } };
      case "darktheme":
         return { ...state, darktheme: !state.darktheme };
      default:
         return { ...state, [type]: payload };
   }
}

export default reducer;
