import React, { useState } from 'react'
import AccountContext from './AccountContext';
import { useLocalStorage, useSessionStorage } from 'react-use';

const AccountState = (props)=>{
    // here i used localstorage because useLocalStorage is like returning state variable, but useSessionStorage not providing state variable. since here i need account information as state variable so that when account info get changed we can let other know about info. 
    const [myAccount, setAccount] = useLocalStorage("myAccount", null);

    function resetSession(){
        setAccount(null);
    }

    return(
        <AccountContext.Provider value={{myAccount, setAccount, resetSession}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;