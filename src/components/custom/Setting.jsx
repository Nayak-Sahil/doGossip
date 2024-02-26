import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import AccountContext from "@/contexts/account/AccountContext";
import { useNavigate } from "react-router-dom";

export function Setting({handleEmitMessage}) {
  //* Account context: managing account details
  const account = useContext(AccountContext);

  // * This state variable used to perserve input value
  let [userName, setUserName] = useState("");

  useEffect(()=>{
    if(account.myAccount != null) setUserName(account.myAccount.userName);
  }, [account.myAccount]);
  
  function handleSave() {
    // * first change in localMyAccount:
    try{
      const updatedAccount = account.myAccount;
      updatedAccount.prevName = updatedAccount.userName;
      updatedAccount.userName = userName;
  
      account.resetSession();
      account.setAccount(updatedAccount);
      handleEmitMessage();
      // console.warn("clicked", account.myAccount)
    }catch(err){
      console.error(err);
    }
  }

  function handleOnchange(e) {
    setUserName(e.target.value);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-gray-700">
          <FontAwesomeIcon className="text-lg" icon={faGears} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => {
                handleOnchange(e);
              }}
              value={userName}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          {/* <SheetClose asChild> */}
            <Button handleClick={handleSave} type="submit">
              Save changes
            </Button>
          {/* </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
