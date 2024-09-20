import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Login from "../screens/Usuario/Login";
import LoginInst from "../screens/Instituicao/LoginInst";
import Cadastro from "../screens/Usuario/Cadastro";
import CadastroInst from "../screens/Instituicao/CadastroInst";
import TabUser from "./RouterUsuario/TabUser";
import TabInst from "./RouterInstituicao/TabInst";

const Stack = createNativeStackNavigator();

export default function () {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false}}
          />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginInst"
          component={LoginInst}
          options={{ headerShown: false }}
        />
          <Stack.Screen
            name="recsenha"
            component={TabInst}
            options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroInst"
          component={CadastroInst}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabUser"
          component={TabUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabInst"
          component={TabInst}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
