import React, {Children, createContext,useState} from "react";
import api from "../api";
import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext({})

function UserProvider(){
    const [user,setUser] = useState({})
    const [error,setError] = useState(null)
    const navigation = useNavigation()

    function login (email,id){
        if(email !== '' && id !== ''){
            setUser({
                email:email,
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