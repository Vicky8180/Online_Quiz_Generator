const initialState = [];

const validator = (state = initialState, action) => {
  switch (action.type) {
    case "validator": {
      // console.log(action.payload);
      return [action.payload];
    }
    default:
      return state;
  }
};

export default validator;
