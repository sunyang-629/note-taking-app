import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/pages/home-screen/home-screen";
import DetailScreen from "./src/pages/detail-screen/detail-screen";

export type AppStackParamList = {
  Home: undefined;
  Detail: { noteId: string };
};

const RootStack = createNativeStackNavigator<AppStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Detail" component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
