// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// // Date validation function (same as server-side)
// const isValidDate = (dateString) => {
//   const regex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!regex.test(dateString)) return false;
//   const date = new Date(dateString);
//   return date instanceof Date && !isNaN(date);
// };

// const EventForm = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     namaAcara: "",
//     tanggal: "",
//     lokasi: "",
//     deskripsi: "",
//   });
//   const [events, setEvents] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const handleChanges = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const fetchEvents = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await axios.get("http://localhost:3000/events", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvents(response.data.events);
//     } catch (err) {
//       console.log("Fetch events error:", err.message);
//       Alert.alert("Error", "Gagal mengambil daftar acara");
//     }
//   };

//   const handleEdit = (event) => {
//     console.log("Editing event:", event);

//     // Convert ISO date to YYYY-MM-DD format
//     const formattedDate = event.tanggal.split("T")[0];

//     setFormData({
//       namaAcara: event.namaAcara,
//       tanggal: formattedDate,
//       lokasi: event.lokasi,
//       deskripsi: event.deskripsi || "",
//     });
//     setEditingId(event.id);
//     console.log("Editing ID set to:", event.id);
//   };

//   const handleSubmit = async () => {
//     // Validasi client-side
//     if (!formData.namaAcara || !formData.tanggal || !formData.lokasi) {
//       Alert.alert("Error", "Harap isi semua kolom yang diperlukan");
//       return;
//     }

//     if (!isValidDate(formData.tanggal)) {
//       Alert.alert("Error", "Format tanggal salah. Gunakan YYYY-MM-DD");
//       return;
//     }

//     try {
//       const token = await AsyncStorage.getItem("token");
//       console.log("Token:", token);
//       console.log("Form data:", formData);
//       console.log("Editing ID:", editingId);

//       const url = editingId
//         ? `http://localhost:3000/events/${editingId}`
//         : "http://localhost:3000/events";

//       const method = editingId ? "put" : "post";

//       const response = await axios[method](url, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Server response:", response);

//       if (response.status === 200 || response.status === 201) {
//         Alert.alert(
//           "Sukses",
//           editingId ? "Acara berhasil diperbarui" : "Acara berhasil dibuat"
//         );
//         setEditingId(null);
//         setFormData({ namaAcara: "", tanggal: "", lokasi: "", deskripsi: "" });
//         fetchEvents();
//       }
//     } catch (err) {
//       console.log("Error details:", {
//         message: err.message,
//         response: err.response,
//         stack: err.stack,
//       });
//       Alert.alert(
//         "Error",
//         err.response?.data?.message ||
//           (editingId ? "Gagal memperbarui acara" : "Gagal membuat acara")
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await axios.delete(
//         `http://localhost:3000/events/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         Alert.alert("Sukses", "Acara berhasil dihapus");
//         fetchEvents();
//       }
//     } catch (err) {
//       console.log("Delete error:", err.message);
//       Alert.alert("Error", "Gagal menghapus acara");
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Form Acara</Text>

//         {/* Form Input Section */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Nama Acara</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Contoh: Pernikahan, Seminar, Konser"
//             placeholderTextColor="#9ca3af"
//             value={formData.namaAcara}
//             onChangeText={(text) => handleChanges("namaAcara", text)}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Tanggal</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="YYYY-MM-DD (contoh: 2025-12-31)"
//             placeholderTextColor="#9ca3af"
//             value={formData.tanggal}
//             onChangeText={(text) => handleChanges("tanggal", text)}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Lokasi</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Contoh: Gedung Serba Guna, Hotel Grand Ballroom"
//             placeholderTextColor="#9ca3af"
//             value={formData.lokasi}
//             onChangeText={(text) => handleChanges("lokasi", text)}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Deskripsi</Text>
//           <TextInput
//             style={[styles.input, { height: 80 }]}
//             placeholder="Tambahkan deskripsi acara (opsional)"
//             placeholderTextColor="#9ca3af"
//             value={formData.deskripsi}
//             onChangeText={(text) => handleChanges("deskripsi", text)}
//             multiline
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>
//             {editingId ? "Perbarui Acara" : "Buat Acara"}
//           </Text>
//         </TouchableOpacity>

//         {/* Event List Section Below Submit Button */}
//         <Text style={styles.subtitle}>Daftar Acara</Text>
//         <FlatList
//           data={events}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.eventItem}>
//               <Text style={styles.eventText}>
//                 <Text style={styles.previewLabel}>Nama Acara:</Text>{" "}
//                 {item.namaAcara}
//               </Text>
//               <Text style={styles.eventSubText}>
//                 <Text style={styles.previewLabel}>Tanggal:</Text>{" "}
//                 {item.tanggal.split("T")[0]}
//               </Text>
//               <Text style={styles.eventSubText}>
//                 <Text style={styles.previewLabel}>Lokasi:</Text> {item.lokasi}
//               </Text>
//               <Text style={styles.eventSubText}>
//                 <Text style={styles.previewLabel}>Deskripsi:</Text>{" "}
//                 {item.deskripsi || "-"}
//               </Text>
//               <View style={styles.eventActions}>
//                 <TouchableOpacity
//                   style={styles.actionButton}
//                   onPress={() => handleEdit(item)}
//                 >
//                   <Text style={styles.actionText}>Edit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.deleteButton]}
//                   onPress={() => handleDelete(item.id)}
//                 >
//                   <Text style={styles.actionText}>Hapus</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           style={styles.eventList}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f4f8",
//     paddingVertical: 20,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//     borderRadius: 16,
//     width: "90%",
//     maxWidth: 400,
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
//     color: "#1f2937",
//     marginBottom: 24,
//     textAlign: "center",
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1f2937",
//     marginTop: 16,
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   previewContainer: {
//     backgroundColor: "#f8fafc",
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//   },
//   previewTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#334155",
//     marginBottom: 8,
//   },
//   previewText: {
//     fontSize: 14,
//     color: "#475569",
//     marginBottom: 4,
//   },
//   previewLabel: {
//     fontWeight: "600",
//     color: "#1e40af",
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
//   eventList: {
//     maxHeight: 300,
//   },
//   eventItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//     marginBottom: 8,
//   },
//   eventText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1f2937",
//     marginBottom: 4,
//   },
//   eventSubText: {
//     fontSize: 14,
//     color: "#6b7280",
//     marginBottom: 4,
//   },
//   eventActions: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginTop: 8,
//   },
//   actionButton: {
//     marginLeft: 12,
//     padding: 6,
//     borderRadius: 4,
//     backgroundColor: "#e0e7ff",
//   },
//   deleteButton: {
//     backgroundColor: "#fee2e2",
//   },
//   actionText: {
//     color: "#2563eb",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

// export default EventForm;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Date validation function (same as server-side)
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const EventForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    namaAcara: "",
    tanggal: "",
    lokasi: "",
    deskripsi: "",
  });
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChanges = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data.events);
    } catch (err) {
      console.log("Fetch events error:", err.message);
      Alert.alert("Error", "Gagal mengambil daftar acara");
    }
  };

  const handleEdit = (event) => {
    console.log("Editing event:", event);
    const formattedDate = event.tanggal.split("T")[0];
    setFormData({
      namaAcara: event.namaAcara,
      tanggal: formattedDate,
      lokasi: event.lokasi,
      deskripsi: event.deskripsi || "",
    });
    setEditingId(event.id);
    console.log("Editing ID set to:", event.id);
  };

  const handleSubmit = async () => {
    if (!formData.namaAcara || !formData.tanggal || !formData.lokasi) {
      Alert.alert("Error", "Harap isi semua kolom yang diperlukan");
      return;
    }

    if (!isValidDate(formData.tanggal)) {
      Alert.alert("Error", "Format tanggal salah. Gunakan YYYY-MM-DD");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
      console.log("Form data:", formData);
      console.log("Editing ID:", editingId);

      const url = editingId
        ? `http://localhost:3000/events/${editingId}`
        : "http://localhost:3000/events";

      const method = editingId ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Server response:", response);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Sukses",
          editingId ? "Acara berhasil diperbarui" : "Acara berhasil dibuat"
        );
        setEditingId(null);
        setFormData({ namaAcara: "", tanggal: "", lokasi: "", deskripsi: "" });
        fetchEvents();
      }
    } catch (err) {
      console.log("Error details:", {
        message: err.message,
        response: err.response,
        stack: err.stack,
      });
      Alert.alert(
        "Error",
        err.response?.data?.message ||
          (editingId ? "Gagal memperbarui acara" : "Gagal membuat acara")
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/events/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        Alert.alert("Sukses", "Acara berhasil dihapus");
        fetchEvents();
      }
    } catch (err) {
      console.log("Delete error:", err.message);
      Alert.alert("Error", "Gagal menghapus acara");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Tombol Kembali */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Form Acara</Text>

        {/* Form Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Acara</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Pernikahan, Seminar, Konser"
            placeholderTextColor="#9ca3af"
            value={formData.namaAcara}
            onChangeText={(text) => handleChanges("namaAcara", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tanggal</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD (contoh: 2025-12-31)"
            placeholderTextColor="#9ca3af"
            value={formData.tanggal}
            onChangeText={(text) => handleChanges("tanggal", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Lokasi</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Gedung Serba Guna, Hotel Grand Ballroom"
            placeholderTextColor="#9ca3af"
            value={formData.lokasi}
            onChangeText={(text) => handleChanges("lokasi", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deskripsi</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Tambahkan deskripsi acara (opsional)"
            placeholderTextColor="#9ca3af"
            value={formData.deskripsi}
            onChangeText={(text) => handleChanges("deskripsi", text)}
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {editingId ? "Perbarui Acara" : "Buat Acara"}
          </Text>
        </TouchableOpacity>

        {/* Event List Section */}
        <Text style={styles.subtitle}>Daftar Acara</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text style={styles.eventText}>
                <Text style={styles.previewLabel}>Nama Acara:</Text>{" "}
                {item.namaAcara}
              </Text>
              <Text style={styles.eventSubText}>
                <Text style={styles.previewLabel}>Tanggal:</Text>{" "}
                {item.tanggal.split("T")[0]}
              </Text>
              <Text style={styles.eventSubText}>
                <Text style={styles.previewLabel}>Lokasi:</Text> {item.lokasi}
              </Text>
              <Text style={styles.eventSubText}>
                <Text style={styles.previewLabel}>Deskripsi:</Text>{" "}
                {item.deskripsi || "-"}
              </Text>
              <View style={styles.eventActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEdit(item)}
                  activeOpacity={0.7}
                >
                  <Icon name="edit" size={16} color="#2563eb" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                  activeOpacity={0.7}
                >
                  <Icon name="delete" size={16} color="#dc2626" />
                  <Text style={[styles.actionText, { color: "#dc2626" }]}>
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={styles.eventList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    paddingVertical: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    width: "92%",
    maxWidth: 420,
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
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#1f2937",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    fontSize: 16,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  eventList: {
    maxHeight: 320,
  },
  eventItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  eventText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  eventSubText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 6,
  },
  previewLabel: {
    fontWeight: "600",
    color: "#1e40af",
  },
  eventActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#e0e7ff",
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
  },
  actionText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});

export default EventForm;
