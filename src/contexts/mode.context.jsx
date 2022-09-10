import { createContext, useState,useEffect } from 'react';


export const ModeContext = createContext({
  mode: '',
});




export const ModeProvider = ({ children }) => {
  
    const [mode, setMode] = useState('Light Mode');

    useEffect(() => {
        localStorage.setItem('mode',mode);
      }, []);

  const value = { mode,setMode };
  
  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};