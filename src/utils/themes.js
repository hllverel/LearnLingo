   const THEMES = ["default", "sage", "blue", "rose", "peach"];

   export const applyRandomTheme = () => {
     const theme = THEMES[Math.floor(Math.random() * THEMES.length)];
     if (theme !== "default") {
       document.documentElement.setAttribute("data-theme", theme);
     }
   };