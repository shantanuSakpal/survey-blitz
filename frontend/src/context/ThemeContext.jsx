import React from "react";
// Context has been created
const ThemeContext = React.createContext(false);
// Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");
  const toggleFunction = () => {
    setTheme(theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleFunction }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
