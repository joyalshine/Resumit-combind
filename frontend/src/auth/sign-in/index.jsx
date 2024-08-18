import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useSignup from "@/useHooks/useSignup";

import { GoogleLogin } from "@react-oauth/google";
import useGoogleOauth from "@/useHooks/useGoogleOauth";
import Navbar from "@/components/NavBar/NavBar";

export function SignInPage() {
  const [signinDetails, setSigninDetails] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isLoading, setIsLoading] = useState({
    google: false,
    signin: false,
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const signup = useSignup();
  const googleSignIn = useGoogleOauth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSigninDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      setIsLoading((prevState) => ({ ...prevState, google: true }));
      const responseApi = await googleSignIn({ credential_jwt: response.credential });
      if(responseApi.status == "fail") toast.error(responseApi.message);
    } catch (e) {
      console.log(e.message)
      console.log(e)
      toast.error("Some error occured");
    } finally {
      setIsLoading((prevState) => ({ ...prevState, google: false }));
    }
  };

  const handleGoogleLoginError = (error) => {
    toast.error("Some error occured");
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    setIsLoadingSubmit(true)
    console.log(isLoadingSubmit)

    if (
      !signinDetails.email ||
      !signinDetails.username ||
      !signinDetails.password ||
      !signinDetails.passwordConfirm
    ) {
      toast.error("All fields are required");
    } else if (!signinDetails.email.includes("@")) {
      toast.error("Enter a valid email");
    } else if (signinDetails.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
    } else if (signinDetails.password != signinDetails.passwordConfirm) {
      toast.error("Passwords do not match");
    } else {
      const response = await signup(signinDetails);
      if(response.status == "fail") toast.error(response.message);
    }

    setIsLoadingSubmit(false)
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center m-5 justify-center min-h-screen">
        <Card className="w-[450px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-center">
              {isLoading.google ? (
                <Button className="w-full mb-3" disabled={true}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                />
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="username"
                type="text"
                value={signinDetails.username}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                value={signinDetails.email}
                onChange={handleInputChange}
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword.password ? "text" : "password"}
                value={signinDetails.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <Button
                className="flex justify-end h-1"
                variant="link"
                onClick={() => handleTogglePassword("password")}>
                {showPassword.password ? "Hide" : "Show"} Password
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={signinDetails.passwordConfirm}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
              <Button
                className="flex justify-end h-1"
                variant="link"
                onClick={() => handleTogglePassword("confirmPassword")}>
                {showPassword.confirmPassword ? "Hide" : "Show"} Confirm
                Password
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full mb-3"
              onClick={handleSignin}
              // isLoading={isLoading.signin}
              disabled={isLoadingSubmit}>
              {isLoadingSubmit ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Create account"
              )}
            </Button>
            <div>
              Already have an account?
              <Link to={"/auth/login"}>
                <Button variant="link">Sign in</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignInPage;
