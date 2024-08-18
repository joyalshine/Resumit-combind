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
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useLogin from "@/useHooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleOauth from "@/useHooks/useGoogleOauth";
import toast from "react-hot-toast";
import Navbar from "@/components/NavBar/NavBar";

export function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    loginError: false,
    message: "",
  });

  const [loginLoader, setLoginLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin();
  const googleSignIn = useGoogleOauth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSwitchChange = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      setGoogleLoader(true);
      const responseApi = await googleSignIn({ credential_jwt: response.credential });
      if(responseApi.status == "fail") toast.error(responseApi.message);
    } catch (e) {
      toast.error("Some error occured");
    } finally {
      setGoogleLoader(false);
    }
  };

  const handleGoogleLoginError = (error) => {
    toast.error("Some error occured");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginLoader(true);

    if (!loginDetails.email || !loginDetails.password) {
      toast.error("All fields are required");
    } else {
      const response = await login(loginDetails);

      if (response.status == "fail") toast.error(response.message);
    }

    setLoginLoader(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[450px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Please enter your email below to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-center">
              {googleLoader ? (
                <Button className="w-full mb-3" disabled={googleLoader}>
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginDetails.email}
                onChange={handleInputChange}
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={loginDetails.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Switch
                id="showPassword"
                checked={showPassword}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="showPassword">Show Password</Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full mb-3"
              onClick={handleLogin}
              disabled={loginLoader}>
              {loginLoader ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div>
              Don't have an account?&nbsp;
              <Link to={"/auth/sign-in"}>
                <Button variant="link">Register</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Login;
