const initialState = null;

const selectedOption = (state = initialState, action) => {
  switch (action.type) {
    case "Dummy": {
      // console.log(action.payload)
      return action.payload;
    }
    default:
      return state;
  }
};

export default selectedOption;
