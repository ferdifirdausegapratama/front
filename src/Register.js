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

// const Register = () => {
//   const [values, setValues] = useState({
//     username: "",
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
//         "http://localhost:3000/auth/register",
//         values
//       );
//       if (response.status === 201) {
//         navigation.navigate("Login");
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Create Account</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Username"
//             placeholderTextColor="#9ca3af"
//             value={values.username}
//             onChangeText={(text) => handleChanges("username", text)}
//           />
//         </View>
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
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Already have an account? </Text>
//           <Text
//             style={styles.link}
//             onPress={() => navigation.navigate("Login")}
//           >
//             Sign In
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

// export default Register;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
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
        "http://localhost:3000/auth/register",
        values
      );
      if (response.status === 201) {
        Alert.alert("Sukses", "Akun berhasil dibuat! Silakan masuk.");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Gagal mendaftar. Periksa data yang dimasukkan.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Tombol Kembali */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Kembali ke Login</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Buat Akun</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Pengguna</Text>
          <View style={styles.inputWrapper}>
            <Icon
              name="person"
              size={20}
              color="#6b7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan Nama Pengguna"
              placeholderTextColor="#9ca3af"
              value={values.username}
              onChangeText={(text) => handleChanges("username", text)}
              autoCapitalize="none"
            />
          </View>
        </View>
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
            name="person-add"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sudah punya akun? </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Masuk
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4b5563",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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

export default Register;
