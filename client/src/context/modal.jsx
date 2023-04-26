import { createContext, useReducer } from 'react';

export const ModalContext = createContext();

const initialState = {
  setLogin: true,
  setRegister: false,
  setProfile: false,
};

const reducer = (state, action) => {
  const { type, _ } = action;

  switch (type) {
    case 'OPEN_LOGIN':
      return {
        ...state,
        setLogin: true,
        setRegister: false,
      };
    case 'OPEN_REGISTER':
      return {
        setRegister: true,
      };
    case 'CLOSE_AUTH':
      return {
        ...state,
        setLogin: false,
        setRegister: false,
      };
    default:
      throw new Error();
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ModalContext.Provider value={[state, dispatch]}>{children}</ModalContext.Provider>;
};