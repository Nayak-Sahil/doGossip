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
  //* Sheet open & close manualy
  const [open, setOpen] = useState(false);

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
      setOpen(false);
      // console.warn("clicked", account.myAccount)
    }catch(err){
      console.error(err);
    }
  }

  function handleOnchange(e) {
    setUserName(e.target.value);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-gray-700">
          <FontAwesomeIcon className="text-lg" icon={faGears} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-4 text-left sm:mt-1">Edit profile</SheetTitle>
          <SheetDescription className="text-left text-xs sm:text-sm">
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="justify-start py-4">
          <div className="w-full flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => {
                handleOnchange(e);
              }}
              value={userName}
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
