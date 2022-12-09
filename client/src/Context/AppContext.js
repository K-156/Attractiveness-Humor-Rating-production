import { createContext, useReducer, useContext } from "react";
import reducer from './reducer'

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,{});
  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
