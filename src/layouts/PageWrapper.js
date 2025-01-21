import React from "react";
import { Box } from "@mui/material";

const PageWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                p: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                height: "100%",
            }}
        >
            {children}
        </Box>
    );
};

export default PageWrapper;
