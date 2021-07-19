import React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "expo-status-bar";
import store from "@stores/createStore";
import {
  Editor,
  ConstructionAdd,
  ConstructionManagement,
  MaterialAddSuccess,
  MaterialAdd,
  MaterialManagement,
  ConstructionAddSuccess,
} from "@screens/index";
import { getColor } from "@styles/index";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={getColor("gray-800")} hidden={false} />
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Root' component={Editor} />
          <Stack.Screen name='Construction' component={ConstructionManagement} />
          <Stack.Screen name='ConstructionAdd' component={ConstructionAdd} />
          <Stack.Screen name='ConstructionAddSuccess' component={ConstructionAddSuccess} />
          <Stack.Screen name='Material' component={MaterialManagement} />
          <Stack.Screen name='MaterialAdd' component={MaterialAdd} />
          <Stack.Screen name='MaterialAddSuccess' component={MaterialAddSuccess} />
          {/* <Stack.Screen name="View3D" component={View3DContainer} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Main;
