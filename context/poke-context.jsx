const { createContext, useContext, useState } = require("react");

const PokeContext = createContext({
  currentOrder: 1,
  waitTime: 2,
  restart: false,
  setCurrentOrder: () => {},
  setWaitTime: () => {},
  setRestart: () => {},
});

export const PokeContextProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(1);
  const [waitTime, setWaitTime] = useState(2);
  const [restart, setRestart] = useState(false);

  return (
    <PokeContext.Provider
      value={{
        currentOrder,
        waitTime,
        restart,
        setCurrentOrder,
        setWaitTime,
        setRestart,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export const usePokeContext = () => {
  return useContext(PokeContext);
};
