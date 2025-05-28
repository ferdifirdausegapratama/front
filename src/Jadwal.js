import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Jadwal = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    namaKegiatan: "",
    jamMulai: "",
    jamSelesai: "",
    tipe: "",
    eventId: "",
  });

  const handleChanges = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/jadwal",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        Alert.alert("Success", "Jadwal created successfully");
        setFormData({
          namaKegiatan: "",
          jamMulai: "",
          jamSelesai: "",
          tipe: "",
          eventId: "",
        });
      }
    } catch (err) {
      console.log("Jadwal creation error:", err.message, err.response?.data);
      Alert.alert("Error", "Failed to create jadwal");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Jadwal Form</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Kegiatan</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Nama Kegiatan"
            placeholderTextColor="#9ca3af"
            value={formData.namaKegiatan}
            onChangeText={(text) => handleChanges("namaKegiatan", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Jam Mulai</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#9ca3af"
            value={formData.jamMulai}
            onChangeText={(text) => handleChanges("jamMulai", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Jam Selesai</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#9ca3af"
            value={formData.jamSelesai}
            onChangeText={(text) => handleChanges("jamSelesai", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipe (e.g., Pembukaan, Talkshow)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Tipe"
            placeholderTextColor="#9ca3af"
            value={formData.tipe}
            onChangeText={(text) => handleChanges("tipe", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Event ID"
            placeholderTextColor="#9ca3af"
            value={formData.eventId}
            onChangeText={(text) => handleChanges("eventId", text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Jadwal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("JadwalList")}
        >
          <Text style={styles.buttonTextSecondary}>View Jadwal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    fontSize: 16,
    color: "#1f2937",
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
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
  buttonSecondary: {
    width: "100%",
    backgroundColor: "#6b7280",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonTextSecondary: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Jadwal;
