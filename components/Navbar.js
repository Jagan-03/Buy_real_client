import React from "react";
import Link from "next/link";
import useInterval from 'use-interval';
import { Button, Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/Ai";
import { FaUserCircle } from "react-icons/Fa";
import { useRouter } from "next/router";

const Navbar = () => {

    const [userSignedIn, setUserSignedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const router = useRouter();

    useInterval(() => {
        const user_token = localStorage.getItem("buy_real_userToken");
        const user_name = localStorage.getItem("buy_real_user_name");
        const user_email = localStorage.getItem("buy_real_user_email");
        setUserName(user_name);
        setUserEmail(user_email);
        if(user_token !== "null") setUserSignedIn(true);
        else setUserSignedIn(false);
    }, 500);

    const signOut = () => {
        localStorage.setItem("buy_real_profile", "null");
        localStorage.setItem("buy_real_userToken", "null");
        localStorage.setItem("buy_real_user", null);
        localStorage.setItem("buy_real_user_id", null);
        localStorage.setItem("buy_real_user_name", null);
        localStorage.setItem("buy_real_user_email", null);
        router.push("/login");
    }

    return (
        <Flex p="2" bg="gray.900">
            <Box fontSize="3xl" color="blue.400" fontWeight="bold">
                <Link href="/" paddingLeft="2">Buy Real</Link>
            </Box>
            <Spacer />
            <Flex alignItems="center" color="white">
                {userName !== "null" && `Welcome back ${userName} !!!`}
            </Flex>
            <Flex alignItems="center">
                <Menu>
                    <MenuButton as={IconButton} icon={<AiOutlineUser />} variant="outlined" color="red.400" />
                    {userSignedIn ? (
                        <MenuList>
                        <Flex direction="column" p="2" alignItems="center">
                            <FaUserCircle fontSize="30px" />
                            {userEmail}
                        </Flex>
                        <Button bg="white" p="0" onClick={signOut} w="100%">
                            <MenuItem>Sign out</MenuItem>
                        </Button>
                    </MenuList>
                    ) : (
                        <MenuList>
                        <Link href="/login" passHref>
                            <MenuItem >Login</MenuItem>
                        </Link>
                        <Link href="/register" passHref>
                            <MenuItem>Register</MenuItem>
                        </Link>
                    </MenuList>
                    )}
                    
                </Menu>
            </Flex>
            <Flex paddingRight="5" alignItems="center">
                <Menu>
                    <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color="red.400" />
                    <MenuList>
                        <Link href="/" passHref>
                            <MenuItem icon={<FcHome />}>Home</MenuItem>
                        </Link>
                        <Link href="/search" passHref>
                            <MenuItem icon={<BsSearch />}>Search</MenuItem>
                        </Link>
                        <Link href="/search?purpose=for-sale" passHref>
                            <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                        </Link>
                        <Link href="/search?purpose=for-rent" passHref>
                            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Navbar;