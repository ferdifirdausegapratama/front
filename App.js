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
import Peserta from "./src/AssignmentForm";
import EventForm from "./src/EventForm";
import EventList from "./src/EventList";
import Credits from "./src/Credits";
import TaskForm from "./src/TaskForm";
import TaskList from "./src/TaskList";
import AssignmentForm from "./src/AssignmentForm";
import AssignmentList from "./src/AssignmentList";

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
        <Stack.Screen name="Peserta" component={Peserta} />
        <Stack.Screen name="EventForm" component={EventForm} />
        <Stack.Screen name="EventList" component={EventList} />
        <Stack.Screen name="Credits" component={Credits} />
        <Stack.Screen name="TaskForm" component={TaskForm} />
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="AssignmentForm" component={AssignmentForm} />
        <Stack.Screen name="AssignmentList" component={AssignmentList} />
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
