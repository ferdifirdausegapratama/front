// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Modal,
//   TextInput,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const Home = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const fetchUser = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         navigation.replace("Login");
//         return;
//       }

//       const response = await axios.get("http://localhost:3000/auth/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status !== 201) {
//         navigation.replace("Login");
//       }
//     } catch (err) {
//       Alert.alert("Error", "Sesi kadaluarsa atau tidak diizinkan");
//       navigation.replace("Login");
//       console.log(err);
//     }
//   };

//   const handleProfileChanges = (name, value) => {
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleProfileSubmit = async () => {
//     if (!profileData.username && !profileData.email && !profileData.password) {
//       Alert.alert("Error", "Harap isi setidaknya satu kolom untuk diperbarui");
//       return;
//     }

//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await axios.put(
//         "http://localhost:3000/auth/update-profile",
//         profileData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         Alert.alert("Sukses", "Profil berhasil diperbarui");
//         setProfileData({ username: "", email: "", password: "" });
//         setModalVisible(false);
//       }
//     } catch (err) {
//       console.log(err.message);
//       Alert.alert("Error", "Gagal memperbarui profil. Periksa data Anda.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       Alert.alert("Sukses", "Anda telah keluar dari akun");
//       navigation.replace("Login");
//     } catch (err) {
//       console.log(err.message);
//       Alert.alert("Error", "Gagal keluar dari akun");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         {/* Header dengan Tombol Kembali, Profil, dan Keluar */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.navigate("Login")}
//             activeOpacity={0.7}
//           >
//             <Icon name="arrow-back" size={20} color="#ffffff" />
//             <Text style={styles.backButtonText}>Kembali ke Login</Text>
//           </TouchableOpacity>
//           <View style={styles.headerRight}>
//             <TouchableOpacity
//               style={styles.profileButton}
//               onPress={() => setModalVisible(true)}
//               activeOpacity={0.7}
//             >
//               <Icon name="account-circle" size={24} color="#4b5563" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.logoutButton}
//               onPress={handleLogout}
//               activeOpacity={0.7}
//             >
//               <Icon name="logout" size={24} color="#4b5563" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <Text style={styles.title}>Dashboard</Text>
//         <Text style={styles.subtitle}>Kelola acara dan jadwal Anda</Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("EventForm")}
//           activeOpacity={0.7}
//         >
//           <Icon
//             name="event"
//             size={20}
//             color="#ffffff"
//             style={styles.buttonIcon}
//           />
//           <Text style={styles.buttonText}>Form Acara</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("Peserta")}
//           activeOpacity={0.7}
//         >
//           <Icon
//             name="people"
//             size={20}
//             color="#ffffff"
//             style={styles.buttonIcon}
//           />
//           <Text style={styles.buttonText}>Form Peserta</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("ScheduleForm")}
//           activeOpacity={0.7}
//         >
//           <Icon
//             name="schedule"
//             size={20}
//             color="#ffffff"
//             style={styles.buttonIcon}
//           />
//           <Text style={styles.buttonText}>Form Jadwal</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("EventList")}
//           activeOpacity={0.7}
//         >
//           <Icon
//             name="list"
//             size={20}
//             color="#ffffff"
//             style={styles.buttonIcon}
//           />
//           <Text style={styles.buttonText}>Lihat Semua Kegiatan</Text>
//         </TouchableOpacity> */}

//         <TouchableOpacity
//           style={styles.button}
//           onPress={async () => {
//             try {
//               const token = await AsyncStorage.getItem("token");
//               if (!token) {
//                 Alert.alert(
//                   "Error",
//                   "Sesi tidak valid. Silakan login kembali."
//                 );
//                 navigation.replace("Login");
//                 return;
//               }
//               navigation.navigate("EventList");
//             } catch (err) {
//               console.error(err.message);
//               Alert.alert("Error", "Gagal mengakses data kegiatan.");
//             }
//           }}
//           activeOpacity={0.7}
//         >
//           <Icon
//             name="list"
//             size={20}
//             color="#ffffff"
//             style={styles.buttonIcon}
//           />
//           <Text style={styles.buttonText}>Lihat Semua Kegiatan</Text>
//         </TouchableOpacity>

//         {/* Modal Profil */}
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Perbarui Profil</Text>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Nama Pengguna</Text>
//                 <View style={styles.inputWrapper}>
//                   <Icon
//                     name="person"
//                     size={20}
//                     color="#6b7280"
//                     style={styles.inputIcon}
//                   />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Masukkan Nama Pengguna"
//                     placeholderTextColor="#9ca3af"
//                     value={profileData.username}
//                     onChangeText={(text) =>
//                       handleProfileChanges("username", text)
//                     }
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Email</Text>
//                 <View style={styles.inputWrapper}>
//                   <Icon
//                     name="email"
//                     size={20}
//                     color="#6b7280"
//                     style={styles.inputIcon}
//                   />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Masukkan Email"
//                     placeholderTextColor="#9ca3af"
//                     value={profileData.email}
//                     onChangeText={(text) => handleProfileChanges("email", text)}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Kata Sandi Baru</Text>
//                 <View style={styles.inputWrapper}>
//                   <Icon
//                     name="lock"
//                     size={20}
//                     color="#6b7280"
//                     style={styles.inputIcon}
//                   />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Masukkan Kata Sandi Baru"
//                     placeholderTextColor="#9ca3af"
//                     value={profileData.password}
//                     onChangeText={(text) =>
//                       handleProfileChanges("password", text)
//                     }
//                     secureTextEntry
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>
//               <View style={styles.modalActions}>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.saveButton]}
//                   onPress={handleProfileSubmit}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.modalButtonText}>Simpan</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.cancelButton]}
//                   onPress={() => setModalVisible(false)}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.modalButtonText}>Batal</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#e5e7eb",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//     borderRadius: 20,
//     width: "90%",
//     maxWidth: 360,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 10,
//     borderWidth: 1,
//     borderColor: "#e0e7ff",
//     alignItems: "center",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     marginBottom: 20,
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4b5563",
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//   },
//   backButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   headerRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileButton: {
//     padding: 8,
//   },
//   logoutButton: {
//     padding: 8,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#111827",
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
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "#2563eb",
//     paddingVertical: 16,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#2563eb",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 6,
//     elevation: 6,
//   },
//   buttonIcon: {
//     marginRight: 8,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#ffffff",
//     padding: 24,
//     borderRadius: 20,
//     width: "90%",
//     maxWidth: 360,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#111827",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     color: "#1f2937",
//     fontSize: 15,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     backgroundColor: "#f9fafb",
//   },
//   inputIcon: {
//     marginLeft: 12,
//   },
//   input: {
//     flex: 1,
//     padding: 14,
//     fontSize: 16,
//     color: "#111827",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginHorizontal: 8,
//   },
//   saveButton: {
//     backgroundColor: "#2563eb",
//   },
//   cancelButton: {
//     backgroundColor: "#6b7280",
//   },
//   modalButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default Home;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      Alert.alert("Error", "Sesi kadaluarsa atau tidak diizinkan");
      navigation.replace("Login");
      console.log(err);
    }
  };

  const handleProfileChanges = (name, value) => {
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileSubmit = async () => {
    if (!profileData.username && !profileData.email && !profileData.password) {
      Alert.alert("Error", "Harap isi setidaknya satu kolom untuk diperbarui");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/auth/update-profile",
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        Alert.alert("Sukses", "Profil berhasil diperbarui");
        setProfileData({ username: "", email: "", password: "" });
        setModalVisible(false);
      }
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Gagal memperbarui profil. Periksa data Anda.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Alert.alert("Sukses", "Anda telah keluar dari akun");
      navigation.replace("Login");
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", "Gagal keluar dari akun");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header dengan Tombol Kembali, Profil, Kredit, dan Keluar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={20} color="#ffffff" />
            <Text style={styles.backButtonText}>Kembali ke Login</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
            >
              <Icon name="account-circle" size={24} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.creditsButton}
              onPress={() => navigation.navigate("Credits")}
              activeOpacity={0.7}
            >
              <Icon name="info" size={24} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Icon name="logout" size={24} color="#4b5563" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Kelola acara dan tugas Anda</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EventForm")}
          activeOpacity={0.7}
        >
          <Icon
            name="event"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Form Acara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TaskForm")}
          activeOpacity={0.7}
        >
          <Icon
            name="people"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Form Tugas Proyek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AssignmentForm")}
          activeOpacity={0.7}
        >
          <Icon
            name="schedule"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Form Tugas Akademik</Text>
        </TouchableOpacity>

        {/* Modal Profil */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Perbarui Profil</Text>
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
                    value={profileData.username}
                    onChangeText={(text) =>
                      handleProfileChanges("username", text)
                    }
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
                    value={profileData.email}
                    onChangeText={(text) => handleProfileChanges("email", text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Kata Sandi Baru</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="lock"
                    size={20}
                    color="#6b7280"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Masukkan Kata Sandi Baru"
                    placeholderTextColor="#9ca3af"
                    value={profileData.password}
                    onChangeText={(text) =>
                      handleProfileChanges("password", text)
                    }
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleProfileSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>Simpan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>Batal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
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
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4b5563",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    padding: 8,
  },
  creditsButton: {
    padding: 8,
  },
  logoutButton: {
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    width: "90%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
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
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: "#2563eb",
  },
  cancelButton: {
    backgroundColor: "#6b7280",
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Home;
