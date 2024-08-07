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
        <UserContext.Provider value={{login,user}}>
            {Children}
        </UserContext.Provider>
     )
}

export default UserProvider 