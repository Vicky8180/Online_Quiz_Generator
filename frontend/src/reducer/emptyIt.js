// const initialState = 0;

// const emptyIt = (state = initialState, action) => {
//   switch (action.type) {
//     case "emptyit": {
//       // console.log(action.payload)
//       return action.payload;
//     }
//     default:
//       return state;
//   }
// };

// export default emptyIt ;

const initialState = 0;

const emptyIt = (state = initialState, action) => {
  switch (action.type) {
    case "emptyit": {
      return state + 1;
    }
    default:
      return state;
  }
};

export default emptyIt;
