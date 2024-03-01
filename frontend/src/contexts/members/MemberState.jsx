import React, { useState } from 'react'
import { useLocalStorage } from 'react-use';
import MemberContext from './MemberContext';

const MemberState = (props)=>{
    // for collecting user it-self info
    const [myAccount] = useLocalStorage("myAccount");
    const [getMembers, setMembers] = useLocalStorage("chatMembers", []);

    return(
        <MemberContext.Provider value={{getMembers, setMembers}}>
            {props.children}
        </MemberContext.Provider>
    )
}

export default MemberState;