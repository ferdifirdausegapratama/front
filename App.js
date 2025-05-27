// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Login from "./src/Login";
// import Register from "./src/Register";
// // import Home from "./src/Home"; // pastikan path ini benar
// import Home from "./src/Home";
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Login" // hapus SplashScreen, set initial ke Login
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/SplashScreen";
import Login from "./src/Login";
import Register from "./src/Register";
import Home from "./src/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import { createStackNavigator } from "@react-navigation/stack";
// import SplashScreen from "./SplashScreen";
// import Login from "./Login";
// import HomeScreen from "./HomeScreen";
// import Register from "./Register";

// const Stack = createStackNavigator();

// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={Register}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
