import { createTheme } from "@mui/material";

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === "light"
                ? {
                      background: {
                          default: "#ffffff",
                          paper: "#f5f5f5",
                      },
                      text: {
                          primary: "#000000",
                      },
                  }
                : {
                      background: {
                          default: "#302d2d",
                          paper: "#1e1e1e",
                      },
                      text: {
                          primary: "#ffffff",
                      },
                  }),
        },
    });
