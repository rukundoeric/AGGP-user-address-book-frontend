/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  ccResponse: {},
  cList: {},
  cDetails: {}
};

export default (state = initialState, action) => {
  const { type, payload, status } = action;

  switch (type) {
    case "CREATE_CONTACT":
      return {
        ...state,
        ccResponse: {
          ...payload,
          status,
        },
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        ccResponse: {
          ...payload,
          status,
        },
      };
    case "GET_CONTACTS":
      return {
        ...state,
        cList: payload,
        status,
      };
    case "GET_CONTACT":
      return {
        ...state,
        cDetails: payload,
        status,
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        ccResponse: {
          ...payload,
          status,
        },
      };
    case "C_C_RESET":
      return {
        ...state,
        cmResponse: {},
      };
    default:
      return state;
  }
};
