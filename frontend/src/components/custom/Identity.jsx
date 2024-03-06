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
import { useContext, useState, useEffect } from "react";
import { Modal } from "./Modal";
import FrameAnimation from "./FrameAnimation";
import AccountContext from "@/contexts/account/AccountContext";

export function Identity() {
  const [inptVal, setInptVal] = useState("");
  const [isError, setError] = useState(true);

  // Account context: managing account details
  const account = useContext(AccountContext);
  
  // when page reload clear session
  useEffect(() => {
    account.resetSession();
  }, []);

  useEffect(() => {
    if(account.myAccount == null) setError(true);
  }, [account.myAccount]);

  function handleSubmit() {
    // console.warn(isError);
    if (inptVal.length == 0) {
      setError("Name field is required!");
    } else if (inptVal.length > 15) {
      setError("Name must be up to 15 characters!");
    } else {
      // ! once we found no error we open pop-up model to confirm
      setError(false);
    }
  }

  function handleOnchange(e) {
    setInptVal(e.target.value);
  }

  function handleCancel() {
    setInptVal("");
  }

  return (
    <Card className="m-auto translate-y-2/4 w-[90%] sm:w-[350px] shadow relative">
      <FrameAnimation />
      <CardHeader>
        <CardTitle>Let's Chat</CardTitle>
        <CardDescription>Chat with new friends.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={(e) => {
                  handleOnchange(e);
                }}
                value={inptVal}
                id="name"
                placeholder="Enter your name"
              />
              <Label className="text-red-500 text-sm font-medium">
                {isError}
              </Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button handleClick={handleCancel} variant="outline">
          Cancel
        </Button>
        {/* <Button handleclick={handleSubmit}>Connect</Button> */}
        <Modal handleclick={handleSubmit} modalState={!isError} userName={inptVal} />
      </CardFooter>
    </Card>
  );
}
