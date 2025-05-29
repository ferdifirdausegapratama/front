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

// Validasi format tanggal
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const AssignmentForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    judulTugas: "",
    tenggat: "",
    mataKuliah: "",
    catatan: "",
  });
  const [assignments, setAssignments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChanges = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(response.data.assignments);
    } catch (err) {
      console.log("Fetch assignments error:", err.message);
      Alert.alert("Error", "Gagal mengambil daftar tugas akademik");
    }
  };

  const handleEdit = (assignment) => {
    console.log("Editing assignment:", assignment);
    const formattedDate = assignment.tenggat.split("T")[0];
    setFormData({
      judulTugas: assignment.judulTugas,
      tenggat: formattedDate,
      mataKuliah: assignment.mataKuliah,
      catatan: assignment.catatan || "",
    });
    setEditingId(assignment.id);
  };

  const handleSubmit = async () => {
    if (!formData.judulTugas || !formData.tenggat || !formData.mataKuliah) {
      Alert.alert("Error", "Harap isi semua kolom yang diperlukan");
      return;
    }

    if (!isValidDate(formData.tenggat)) {
      Alert.alert("Error", "Format tanggal salah. Gunakan YYYY-MM-DD");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const url = editingId
        ? `http://localhost:3000/assignments/${editingId}`
        : "http://localhost:3000/assignments";
      const method = editingId ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Sukses",
          editingId
            ? "Tugas akademik berhasil diperbarui"
            : "Tugas akademik berhasil dibuat"
        );
        setEditingId(null);
        setFormData({
          judulTugas: "",
          tenggat: "",
          mataKuliah: "",
          catatan: "",
        });
        fetchAssignments();
      }
    } catch (err) {
      console.log("Error details:", {
        message: err.message,
        response: err.response,
      });
      Alert.alert(
        "Error",
        err.response?.data?.message ||
          (editingId
            ? "Gagal memperbarui tugas akademik"
            : "Gagal membuat tugas akademik")
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/assignments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        Alert.alert("Sukses", "Tugas akademik berhasil dihapus");
        fetchAssignments();
      }
    } catch (err) {
      console.log("Delete error:", err.message);
      Alert.alert("Error", "Gagal menghapus tugas akademik");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Form Tugas Akademik</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Judul Tugas</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Makalah AI, Kuis Algoritma"
            placeholderTextColor="#9ca3af"
            value={formData.judulTugas}
            onChangeText={(text) => handleChanges("judulTugas", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tenggat Waktu</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD (contoh: 2025-12-31)"
            placeholderTextColor="#9ca3af"
            value={formData.tenggat}
            onChangeText={(text) => handleChanges("tenggat", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mata Kuliah</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Kecerdasan Buatan, Pemrograman Web"
            placeholderTextColor="#9ca3af"
            value={formData.mataKuliah}
            onChangeText={(text) => handleChanges("mataKuliah", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Catatan</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Tambahkan catatan tugas (opsional)"
            placeholderTextColor="#9ca3af"
            value={formData.catatan}
            onChangeText={(text) => handleChanges("catatan", text)}
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {editingId ? "Perbarui Tugas" : "Buat Tugas"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Daftar Tugas Akademik</Text>
        <FlatList
          data={assignments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.assignmentItem}>
              <Text style={styles.assignmentText}>
                <Text style={styles.previewLabel}>Judul Tugas:</Text>{" "}
                {item.judulTugas}
              </Text>
              <Text style={styles.assignmentSubText}>
                <Text style={styles.previewLabel}>Tenggat:</Text>{" "}
                {item.tenggat.split("T")[0]}
              </Text>
              <Text style={styles.assignmentSubText}>
                <Text style={styles.previewLabel}>Mata Kuliah:</Text>{" "}
                {item.mataKuliah}
              </Text>
              <Text style={styles.assignmentSubText}>
                <Text style={styles.previewLabel}>Catatan:</Text>{" "}
                {item.catatan || "-"}
              </Text>
              <View style={styles.assignmentActions}>
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
          style={styles.assignmentList}
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
  assignmentList: {
    maxHeight: 320,
  },
  assignmentItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  assignmentText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  assignmentSubText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 6,
  },
  previewLabel: {
    fontWeight: "600",
    color: "#1e40af",
  },
  assignmentActions: {
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

export default AssignmentForm;
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
// import Icon from "react-native-vector-icons/MaterialIcons";

// // Validasi format tanggal
// const isValidDate = (dateString) => {
//   const regex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!regex.test(dateString)) return false;
//   const date = new Date(dateString);
//   return date instanceof Date && !isNaN(date);
// };

// const AssignmentForm = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     judulTugas: "",
//     tenggat: "",
//     mataKuliah: "",
//     catatan: "",
//   });
//   const [assignments, setAssignments] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const handleChanges = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const fetchAssignments = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Error", "Token tidak ditemukan. Silakan login kembali.");
//         return;
//       }
//       console.log("Fetching assignments with token:", token);
//       const response = await axios.get("http://localhost:3000/assignments", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Assignments response:", response.data);
//       setAssignments(response.data.assignments || []);
//     } catch (err) {
//       console.log("Fetch assignments error:", err.message);
//       Alert.alert("Error", "Gagal mengambil daftar tugas akademik");
//     }
//   };

//   const handleEdit = (assignment) => {
//     console.log("Editing assignment:", assignment);
//     const formattedDate = assignment.tenggat.split("T")[0];
//     setFormData({
//       judulTugas: assignment.judulTugas,
//       tenggat: formattedDate,
//       mataKuliah: assignment.mataKuliah,
//       catatan: assignment.catatan || "",
//     });
//     setEditingId(assignment.id);
//   };

//   const handleSubmit = async () => {
//     if (!formData.judulTugas || !formData.tenggat || !formData.mataKuliah) {
//       Alert.alert("Error", "Harap isi semua kolom yang diperlukan");
//       return;
//     }

//     if (!isValidDate(formData.tenggat)) {
//       Alert.alert("Error", "Format tanggal salah. Gunakan YYYY-MM-DD");
//       return;
//     }

//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Error", "Token tidak ditemukan. Silakan login kembali.");
//         return;
//       }
//       console.log("Submitting assignment:", { token, formData, editingId });
//       const url = editingId
//         ? `http://localhost:3000/assignments/${editingId}`
//         : "http://localhost:3000/assignments";
//       const method = editingId ? "put" : "post";

//       const response = await axios[method](url, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Submit response:", response.data);

//       if (response.status === 200 || response.status === 201) {
//         Alert.alert(
//           "Sukses",
//           editingId
//             ? "Tugas akademik berhasil diperbarui"
//             : "Tugas akademik berhasil dibuat"
//         );
//         setEditingId(null);
//         setFormData({
//           judulTugas: "",
//           tenggat: "",
//           mataKuliah: "",
//           catatan: "",
//         });
//         fetchAssignments();
//       }
//     } catch (err) {
//       console.log("Error details:", {
//         message: err.message,
//         response: err.response,
//       });
//       Alert.alert(
//         "Error",
//         err.response?.data?.message ||
//           (editingId
//             ? "Gagal memperbarui tugas akademik"
//             : "Gagal membuat tugas akademik")
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Error", "Token tidak ditemukan. Silakan login kembali.");
//         return;
//       }
//       console.log("Deleting assignment ID:", id);
//       const response = await axios.delete(
//         `http://localhost:3000/assignments/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Delete response:", response.data);
//       if (response.status === 200) {
//         Alert.alert("Sukses", "Tugas akademik berhasil dihapus");
//         fetchAssignments();
//       }
//     } catch (err) {
//       console.log("Delete error:", err.message);
//       Alert.alert("Error", "Gagal menghapus tugas akademik");
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.card}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate("Home")}
//           activeOpacity={0.7}
//         >
//           <Icon name="arrow-back" size={20} color="#ffffff" />
//           <Text style={styles.backButtonText}>Kembali</Text>
//         </TouchableOpacity>

//         <Text style={styles.title}>Form Tugas Akademik</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Judul Tugas</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Contoh: Makalah AI, Kuis Algoritma"
//             placeholderTextColor="#9ca3af"
//             value={formData.judulTugas}
//             onChangeText={(text) => handleChanges("judulTugas", text)}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Tenggat Waktu</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="YYYY-MM-DD (contoh: 2025-12-31)"
//             placeholderTextColor="#9ca3af"
//             value={formData.tenggat}
//             onChangeText={(text) => handleChanges("tenggat", text)}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Mata Kuliah</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Contoh: Kecerdasan Buatan, Pemrograman Web"
//             placeholderTextColor="#9ca3af"
//             value={formData.mataKuliah}
//             onChangeText={(text) => handleChanges("mataKuliah", text)}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Catatan</Text>
//           <TextInput
//             style={[styles.input, { height: 80 }]}
//             placeholder="Tambahkan catatan tugas (opsional)"
//             placeholderTextColor="#9ca3af"
//             value={formData.catatan}
//             onChangeText={(text) => handleChanges("catatan", text)}
//             multiline
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSubmit}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.buttonText}>
//             {editingId ? "Perbarui Tugas" : "Buat Tugas"}
//           </Text>
//         </TouchableOpacity>

//         <Text style={styles.subtitle}>Daftar Tugas Akademik</Text>
//         <FlatList
//           data={assignments}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.assignmentItem}>
//               <Text style={styles.assignmentText}>
//                 <Text style={styles.previewLabel}>Judul Tugas:</Text>{" "}
//                 {item.judulTugas}
//               </Text>
//               <Text style={styles.assignmentSubText}>
//                 <Text style={styles.previewLabel}>Tenggat:</Text>{" "}
//                 {item.tenggat.split("T")[0]}
//               </Text>
//               <Text style={styles.assignmentSubText}>
//                 <Text style={styles.previewLabel}>Mata Kuliah:</Text>{" "}
//                 {item.mataKuliah}
//               </Text>
//               <Text style={styles.assignmentSubText}>
//                 <Text style={styles.previewLabel}>Catatan:</Text>{" "}
//                 {item.catatan || "-"}
//               </Text>
//               <View style={styles.assignmentActions}>
//                 <TouchableOpacity
//                   style={styles.actionButton}
//                   onPress={() => handleEdit(item)}
//                   activeOpacity={0.7}
//                 >
//                   <Icon name="edit" size={16} color="#2563eb" />
//                   <Text style={styles.actionText}>Edit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.actionButton, styles.deleteButton]}
//                   onPress={() => handleDelete(item.id)}
//                   activeOpacity={0.7}
//                 >
//                   <Icon name="delete" size={16} color="#dc2626" />
//                   <Text style={[styles.actionText, { color: "#dc2626" }]}>
//                     Hapus
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           style={styles.assignmentList}
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
//     backgroundColor: "#e5e7eb",
//     paddingVertical: 30,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     borderRadius: 20,
//     width: "92%",
//     maxWidth: 420,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 10,
//     borderWidth: 1,
//     borderColor: "#e0e7ff",
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4b5563",
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   backButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#111827",
//     marginBottom: 24,
//     textAlign: "center",
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#111827",
//     marginTop: 20,
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     color: "#1f2937",
//     fontSize: 15,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   input: {
//     width: "100%",
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     backgroundColor: "#f9fafb",
//     fontSize: 16,
//     color: "#111827",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#2563eb",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 12,
//     shadowColor: "#2563eb",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 6,
//     elevation: 6,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   assignmentList: {
//     maxHeight: 320,
//   },
//   assignmentItem: {
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: "#f8fafc",
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   assignmentText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: 6,
//   },
//   assignmentSubText: {
//     fontSize: 14,
//     color: "#4b5563",
//     marginBottom: 6,
//   },
//   previewLabel: {
//     fontWeight: "600",
//     color: "#1e40af",
//   },
//   assignmentActions: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginTop: 10,
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 12,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     backgroundColor: "#e0e7ff",
//   },
//   deleteButton: {
//     backgroundColor: "#fee2e2",
//   },
//   actionText: {
//     color: "#2563eb",
//     fontSize: 14,
//     fontWeight: "600",
//     marginLeft: 6,
//   },
// });

// export default AssignmentForm;
