import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext({})

function AuthProvider({ children }){
    const [user,setUser] = useState(null)
    const navigation = useNavigation()

    function signIn (id, p_nome, sobrenome, email,cidade,estado,username){
        if(id !== ''){
            
        }
        setUser({
            id: id,
            p_nome: p_nome,
            sobrenome: sobrenome,
            email: email,
            cidade: cidade,
            estado: estado,
            username: username
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