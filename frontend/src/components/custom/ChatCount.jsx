import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MemberContext from "@/contexts/members/MemberContext";
import AccountContext from "@/contexts/account/AccountContext";

{
  // for offline badge
  /* <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-900">
      Session Out
    </span> */
}
export function ChatCount() {
    //* Account context: managing account details
    const account = useContext(AccountContext);

  //* Member context: managing chat member details
  const membersData = useContext(MemberContext);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <p className="font-medium text-xs cursor-pointer">
          View Chat Member{" "}
          <FontAwesomeIcon className="ml-1" icon={faCaretDown} />
        </p>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[600px]">
          <DrawerHeader>
            <DrawerTitle>Chat Members</DrawerTitle>
            <DrawerDescription>
              Total {membersData.getMembers.length} members actively joined in this chat.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full h-48 p-4 pt-1 pb-0 flex flex-col overflow-y-scroll">
              {membersData.getMembers.map((member) => {
                return (
                  <div className="w-full h-16 flex items-center justify-between">
                    <div className="p-4 w-1/3 text-right text-sm">
                      <div className="flex items-center">
                        <p className="whitespace-no-wrap font-medium text-center">
                          {member.userName}<br></br>
                          <span className="text-gray-500 text-xs text-center">
                            {(member.socketId == account.myAccount.socketId) ? "(You)" : ""}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="p-4 w-2/5 text-center text-sm">
                      <p className="whitespace-no-wrap text-gray-600">
                        {member.connectedAt}
                        {/* {member.connectedAt.substring(member.connectedAt.indexOf(new Date().getFullYear() + 4), member.connectedAt.indexOf("G"))} */}
                      </p>
                    </div>
                    <div className="p-4 w-1/3 text-right text-sm">
                      <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                        Online
                      </span>
                    </div>
                    </div>
                );
              })}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
