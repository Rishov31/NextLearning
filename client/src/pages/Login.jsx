// McgPr7oX7v1mMcbN
//vVj7oYiygCKKHJId-> 2nd bar e password in atlas
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

//For taking the input for login and signup we have take two state variable signupInput and loginInput.
const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [    //these data are imported from import {useLoginUserMutation,useRegisterUserMutation,} from "@/features/api/authApi";  //which gives us the response which comes from the backend  
    registerUser,
    {
      data: registerData, //je data asbe tar name rakhlam registerData
      error: registerError, ////je error asbe tar name rakhlam registerError
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation(); 
  const [
    loginUser,
    {
      data: loginData, //je data asbe tar name rakhlam loginData
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate(); //this is for navigate to the home page when my login become successful

  const changeInputHandler = (e, type) => {   //je type jokhon hobe setar jonno kaj hobe tahole ar alada alada login ar signup er jonno banate hobe na..
    //call this funtion when the input field changes by onChange event.
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value }); //It spreads the existing signupInput state and updates the field with the name [name] to the new value.
    } else {  //if signup not occur means type="login"..
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {   //this function helps to get the data from the input field.. it calls when the button is clicked.
    const inputData = type === "signup" ? signupInput : loginInput; //according to the type it will get the data from the input field and store it in inputData.
  //Now if the button click-> then action happen-> go to registerUser or loginUser which comes from useRegisterUserMutation() -> @/features/api/authApi send request and get response from the backEnd..
    const action = type === "signup" ? registerUser : loginUser;   //registerUser & loginUser upore create korechi jeta mainly comes from @/features/api/authApi
    await action(inputData);  //ekhane mainly jodi signup hoy then registerUser assign korbo and action e tar inputData te ja store ache(mane jegulo form e input box e likhbo) seta pathachii...same for login.. 
  };

  useEffect(() => {   //jokhon signUp ba login successful hoye jabe then amra toast e msg show korabo..which is show in UI only one time that's why we are using useEffect 
    if (registerIsSuccess && registerData) { //jodi successfully register hoye jai then show msg
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");  //this is for navigate to the home page when my login become successful
    }
    if (loginError) {
      toast.error(loginError.data.message || "login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>{" "}
          {/* tabSwiching ei value dekhei hobe means jokhon signup tab e click korbo tokhon tabContent e giye value match korabe jar value sighnup hobe seta show korbe*/}
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name} //value help us to bind this input box with the state variable 'signupInput' of useState
                  onChange={(e) => changeInputHandler(e, "signup")} //when i call the changeInputHandler i send event and type..so that je type jokhon hobe tar jonno kaj korbe
                  placeholder="Enter your name.."
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter your email.."
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Enter password.."
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter your email.."
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Enter your password.."
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
