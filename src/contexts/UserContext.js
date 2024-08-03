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
        navigation.navigate("Main")
        console.log(user)
    }
    function signIn (Cnpj, NomeInst, Email, Rua, Numero, Bairro, Cidade,Estado,CEP,Descricao){
        setUser({
            Cnpj: Cnpj,
            NomeInst: NomeInst,
            Email: Email,
            Rua: Rua,
            Numero: Numero,
            Bairro: Bairro,
            Cidade: Cidade,
            Estado: Estado,
            CEP: CEP,
            Descricao: Descricao
        })
        navigation.navigate('Inst')
    }
     return(
        <UserContext.Provider value={{signIn, user}}>
            {children}
        </UserContext.Provider>
     )
}

export default AuthProvider;