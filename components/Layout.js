import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Real Estate</title>
            </Head>
            <Box w="100vw" m="auto">
                <header>
                    <Navbar />
                </header>
                <main>
                    {children}
                </main>
            </Box>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout;