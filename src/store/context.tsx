import React, { createContext, useContext, useState } from "react";

interface NameContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const NameContext = createContext<NameContextProps | undefined>(undefined);

export const useNameContext = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("use name context must be used within a name provider");
  }
  return context;
};

interface NameProviderProps {
  children: React.ReactNode;
}

export const NameProvider: React.FC<NameProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};
