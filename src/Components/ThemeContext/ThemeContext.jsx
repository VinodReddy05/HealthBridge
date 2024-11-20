import React, { createContext, useContext, useState, useEffect } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
        document.body.classList.toggle("dark-mode", newMode);
        document.body.classList.toggle("light-mode", !newMode);
    };

    // Apply mode on initial render
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom Hook to Use Theme Context
export const useTheme = () => useContext(ThemeContext);
