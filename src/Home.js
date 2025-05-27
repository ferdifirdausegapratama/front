import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Login");
        return;
      }

      const response = await axios.get("http://localhost:3000/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        navigation.replace("Login");
      }
    } catch (err) {
      Alert.alert("Error", "Session expired or unauthorized");
      navigation.replace("Login");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Main Menu (Dashboard)</Text>
        <Text style={styles.subtitle}>Manage your events and schedules</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EventForm")}
        >
          <Text style={styles.buttonText}>Event Form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PesertaForm")}
        >
          <Text style={styles.buttonText}>Peserta Form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("JadwalForm")}
        >
          <Text style={styles.buttonText}>Jadwal Form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    backgroundImage: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
  },
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 16,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// import React, { useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const Home = () => {
//   const navigation = useNavigation();

//   const fetchUser = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       console.log("Retrieved token:", token);
//       if (!token) {
//         console.log("No token found, redirecting to Login");
//         navigation.replace("Login");
//         return;
//       }

//       const response = await axios.get("http://localhost:3000/auth/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Home response:", response.status, response.data);
//       if (response.status !== 200) {
//         console.log("Invalid status, redirecting to Login");
//         navigation.replace("Login");
//       }
//     } catch (err) {
//       console.log("Home error:", err.message, err.response?.data);
//       Alert.alert("Error", "Session expired or unauthorized");
//       navigation.replace("Login");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Main Menu (Dashboard)</Text>
//         <Text style={styles.subtitle}>Manage your events and schedules</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("EventForm")}
//         >
//           <Text style={styles.buttonText}>Event Form</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("PesertaForm")}
//         >
//           <Text style={styles.buttonText}>Peserta Form</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("JadwalForm")}
//         >
//           <Text style={styles.buttonText}>Jadwal Form</Text>
//         </TouchableOpacity>
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
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1f2937",
//     marginBottom: 12,
//     textAlign: "center",
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#6b7280",
//     marginBottom: 24,
//     textAlign: "center",
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 16,
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
// });

// export default Home;
