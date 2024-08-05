import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext({})

function AuthProvider({ children }){
    const [user,setUser] = useState(null)
    const navigation = useNavigation()

    function signIn (id, p_nome, sobrenome, email){
        if(id !== ''){
            
        }
        setUser({
            id: id,
            p_nome: p_nome,
            sobrenome: sobrenome,
            email: email
        })
        navigation.navigate("MainPage")
        console.log(user)
    }
     return(
        <UserContext.Provider value={{signIn, user}}>
            {children}
        </UserContext.Provider>
     )
}

export default AuthProvider;