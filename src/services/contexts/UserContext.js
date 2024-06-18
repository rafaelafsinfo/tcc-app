import React, {Children, createContext,useState} from "react";

import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext({})

function UserProvider(){
    const [user,setUser] = useState({})

    function login(email,cpf,id){
        if(email !== '' && cpf !== '' && id !== ''){
            setUser({
                email: email,
                cpf: cpf,
                id:id
            })
        }
    }
     return(
        <UserContext.Provider value={{login,user}}>
            {Children}
        </UserContext.Provider>
     )
}

export default UserProvider 