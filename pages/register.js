import React from "react";
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
import { registerUser } from "../controllers/register";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";

const VARIANT_COLOR = "teal";

const Register = () => {
  const router = useRouter();

  const user = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    async onSubmit(values) {
      try {
        if (values.password === values.repeatPassword) {
          delete values.repeatPassword;
          delete values["field-82"];
          delete values["field-98"];
          console.log(values);
          const response = await registerUser(values);
          if (response)
            alert("Registered successfully. Please login to continue.");
          router.push("/login");
        } else {
          alert("Passwords doesn't match.");
          user.setValues({
            ...user.values,
            password: "",
            repeatPassword: "",
          });
        }
      } catch (error) {
        alert(error.response.data.msg);
        user.setValues({
          ...user.values,
          password: "",
          repeatPassword: "",
        });
      }
    },
  });

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    
    try {
        localStorage.setItem("buy_real_userToken", token);
        localStorage.setItem("buy_real_user_id", result.googleId);
        localStorage.setItem("buy_real_user_email", result.email);
        localStorage.setItem("buy_real_profile", JSON.stringify({result, token}));
        router.push("/");
    } catch (error) {
      console.log(error);
    }

  }

  const googleFailure = (error) => {
    console.log(error);
    console.log("failed");
  }

  const RegisterHeader = () => {
    return (
      <Box textAlign="center" overflow="hidden">
        <Heading>Register to Buy real</Heading>
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
          <RegisterHeader />
          <Box my={8} textAlign="left">
            <form onSubmit={user.handleSubmit}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  value={user.values.name}
                  onChange={user.handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={user.values.email}
                  onChange={user.handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={user.values.password}
                  onChange={user.handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Repeat password</FormLabel>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  name="repeatPassword"
                  value={user.values.repeatPassword}
                  onChange={user.handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                variantColor={VARIANT_COLOR}
                width="full"
                mt={5}
              >
                Sign Up
              </Button>
            </form>
          </Box>

          <Box>
            <GoogleLogin
              clientId="1312823965-uqd893em6uqren1hf008dbt4iqoqtrko.apps.googleusercontent.com"
              render={(GoogleLoginProps) => (
                <Button
                  onClick={GoogleLoginProps.onClick}
                  bg="orange"
                  width="full"
                >
                  <i className="fab fa-google-plus-g"></i> Login in with Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              cross-origin-opener-policy="same-origin-allow-popups"
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;
