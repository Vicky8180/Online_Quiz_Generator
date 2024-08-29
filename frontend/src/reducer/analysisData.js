const initialState = [];

const analysisData = (state = initialState, action) => {
  switch (action.type) {
    case "dummy": {
      return [action.payload];
    }
    default:
      return state;
  }
};

export default analysisData;
