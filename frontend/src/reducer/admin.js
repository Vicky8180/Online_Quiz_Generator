const initialState = [];

const admin = (state = initialState, action) => {
  switch (action.type) {
    case "admin": {
      // console.log(action.payload);
      return [action.payload];
    }
    default:
      return state;
  }
};

export default admin;
