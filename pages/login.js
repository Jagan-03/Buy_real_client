import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
// Controllers
import { loginUser } from "../controllers/login";

const Login = () => {
    const router = useRouter();
  const user = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      try {
        const response = await loginUser(values);
        const { token, user } = response.data;
        console.log(user);
        localStorage.setItem("buy_real_userToken", token);
        localStorage.setItem("buy_real_user_id", user.googleId);
        localStorage.setItem("buy_real_user_email", user.email);
        localStorage.setItem("buy_real_user_name", user.name);
        router.push("/");
      } catch (error) {
        alert(error.response.data.msg);
      }
    },
  });

  const LoginHeader = () => {
    return (
      <Box textAlign="center" overflow="hidden">
        <Heading>Sign In to Your Account</Heading>
      </Box>
    );
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <LoginHeader />
          <Box my={8} textAlign="left">
        <form onSubmit={user.handleSubmit}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" value={user.values.email} onChange={user.handleChange} placeholder="Enter your email address" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={user.values.password} onChange={user.handleChange} placeholder="Enter your password" />
          </FormControl>

          <Button type="submit" width="full" mt={4}>
            Sign In
          </Button>
        </form>
      </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
