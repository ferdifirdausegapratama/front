// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// // } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import axios from "axios";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // const Login = () => {
// //   const [values, setValues] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const navigation = useNavigation();

// //   const handleChanges = (name, value) => {
// //     setValues({ ...values, [name]: value });
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:3000/auth/login",
// //         values
// //       );
// //       if (response.status === 201) {
// //         await AsyncStorage.setItem("token", response.data.token);
// //         navigation.navigate("Home");
// //       }
// //     } catch (err) {
// //       console.log(err.message);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.card}>
// //         <Text style={styles.title}>Login</Text>
// //         <View style={styles.inputContainer}>
// //           <Text style={styles.label}>Email</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter Email"
// //             value={values.email}
// //             onChangeText={(text) => handleChanges("email", text)}
// //             keyboardType="email-address"
// //             autoCapitalize="none"
// //           />
// //         </View>
// //         <View style={styles.inputContainer}>
// //           <Text style={styles.label}>Password</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter Password"
// //             value={values.password}
// //             onChangeText={(text) => handleChanges("password", text)}
// //             secureTextEntry
// //             autoCapitalize="none"
// //           />
// //         </View>
// //         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
// //           <Text style={styles.buttonText}>Submit</Text>
// //         </TouchableOpacity>
// //         <View style={styles.footer}>
// //           <Text style={styles.footerText}>Don't have an account? </Text>
// //           <Text
// //             style={styles.link}
// //             onPress={() => navigation.navigate("Register")}
// //           >
// //             Signup
// //           </Text>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#f5f5f5",
// //   },
// //   card: {
// //     backgroundColor: "#fff",
// //     paddingHorizontal: 32,
// //     paddingVertical: 20,
// //     borderWidth: 1,
// //     borderColor: "#e5e7eb",
// //     width: 300,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginBottom: 16,
// //     textAlign: "center",
// //   },
// //   inputContainer: {
// //     marginBottom: 16,
// //   },
// //   label: {
// //     color: "#374151",
// //     marginBottom: 4,
// //   },
// //   input: {
// //     width: "100%",
// //     padding: 12,
// //     borderWidth: 1,
// //     borderColor: "#d1d5db",
// //     borderRadius: 4,
// //   },
// //   button: {
// //     width: "100%",
// //     backgroundColor: "#16a34a",
// //     paddingVertical: 12,
// //     borderRadius: 4,
// //     alignItems: "center",
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //   },
// //   footer: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginTop: 16,
// //   },
// //   footerText: {
// //     color: "#374151",
// //   },
// //   link: {
// //     color: "#3b82f6",
// //     textDecorationLine: "underline",
// //   },
// // });

// // export default Login;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Login = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const navigation = useNavigation();

//   const handleChanges = (name, value) => {
//     setValues({ ...values, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/auth/login",
//         values
//       );
//       if (response.status === 201) {
//         await AsyncStorage.setItem("token", response.data.token);
//         navigation.navigate("Home");
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome Back</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Email"
//             placeholderTextColor="#9ca3af"
//             value={values.email}
//             onChangeText={(text) => handleChanges("email", text)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Password"
//             placeholderTextColor="#9ca3af"
//             value={values.password}
//             onChangeText={(text) => handleChanges("password", text)}
//             secureTextEntry
//             autoCapitalize="none"
//           />
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Sign In</Text>
//         </TouchableOpacity>
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Don't have an account? </Text>
//           <Text
//             style={styles.link}
//             onPress={() => navigation.navigate("Register")}
//           >
//             Sign Up
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f4f8",
//     backgroundImage: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//     borderRadius: 16,
//     width: 320,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.5)",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 24,
//     textAlign: "center",
//     color: "#1f2937",
//     letterSpacing: 0.5,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     color: "#374151",
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   input: {
//     width: "100%",
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 8,
//     backgroundColor: "#f9fafb",
//     fontSize: 16,
//     color: "#1f2937",
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 8,
//     shadowColor: "#2563eb",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 24,
//   },
//   footerText: {
//     color: "#6b7280",
//     fontSize: 14,
//   },
//   link: {
//     color: "#2563eb",
//     fontSize: 14,
//     fontWeight: "600",
//     textDecorationLine: "underline",
//   },
// });

// export default Login;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();

  const handleChanges = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      if (response.status === 201) {
        await AsyncStorage.setItem("token", response.data.token);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Email atau kata sandi salah");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Selamat Datang Kembali</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Icon
              name="email"
              size={20}
              color="#6b7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan Email"
              placeholderTextColor="#9ca3af"
              value={values.email}
              onChangeText={(text) => handleChanges("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kata Sandi</Text>
          <View style={styles.inputWrapper}>
            <Icon
              name="lock"
              size={20}
              color="#6b7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan Kata Sandi"
              placeholderTextColor="#9ca3af"
              value={values.password}
              onChangeText={(text) => handleChanges("password", text)}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Icon
            name="login"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Belum punya akun? </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Daftar
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb", // Abu-abu lembut
  },
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 20,
    width: "90%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#111827",
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#1f2937",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },
  link: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default Login;
