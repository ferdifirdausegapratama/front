import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // ← penting untuk navigasi

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "Sesi tidak valid. Silakan login kembali.");
          return;
        }

        const response = await axios.get("http://localhost:3000/auth/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response data:", response.data); // Debugging
        setEvents(response.data?.events ?? []);
        setTasks(response.data?.tasks ?? []);
        setAssignments(response.data?.assignments ?? []);
      } catch (err) {
        Alert.alert("Error", "Gagal memuat data kegiatan.");
        console.error("Error:", err.message);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Tanggal tidak tersedia";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Format tanggal tidak valid";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderEmptyList = () => (
    <Text style={styles.emptyText}>Tidak ada data tersedia</Text>
  );

  const renderEventItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Nama Acara:</Text>
      <Text>{item.namaAcara}</Text>
      <Text style={styles.itemTitle}>Deskripsi:</Text>
      <Text>{item.deskripsi}</Text>
      <Text style={styles.itemTitle}>Lokasi:</Text>
      <Text>{item.lokasi}</Text>
      <Text style={styles.itemTitle}>Tanggal:</Text>
      <Text>{formatDate(item.tanggal)}</Text>
    </View>
  );

  const renderTaskItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Nama Tugas:</Text>
      <Text>{item.namaTugas}</Text>
      <Text style={styles.itemTitle}>Tenggat Waktu:</Text>
      <Text>{formatDate(item.tenggatWaktu)}</Text>
      <Text style={styles.itemTitle}>Prioritas:</Text>
      <Text>{item.prioritas}</Text>
      <Text style={styles.itemTitle}>Catatan:</Text>
      <Text>{item.catatan}</Text>
    </View>
  );

  const renderAssignmentItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Judul Tugas:</Text>
      <Text>{item.judulTugas}</Text>
      <Text style={styles.itemTitle}>Tenggat Waktu:</Text>
      <Text>{formatDate(item.tenggatWaktu)}</Text>
      <Text style={styles.itemTitle}>Mata Kuliah:</Text>
      <Text>{item.mataKuliah}</Text>
      <Text style={styles.itemTitle}>Catatan:</Text>
      <Text>{item.catatan}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Daftar Kegiatan</Text>

        <Text style={styles.sectionTitle}>📋 Form Acara</Text>
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => `event-${item.id ?? index}`}
          scrollEnabled={false}
          ListEmptyComponent={renderEmptyList}
        />

        <Text style={styles.sectionTitle}>👥 Task</Text>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item, index) => `task-${item.id ?? index}`}
          scrollEnabled={false}
          ListEmptyComponent={renderEmptyList}
        />

        <Text style={styles.sectionTitle}>🗓️ Kegiatan</Text>
        <FlatList
          data={assignments}
          renderItem={renderAssignmentItem}
          keyExtractor={(item, index) => `assignment-${item.id ?? index}`}
          scrollEnabled={false}
          ListEmptyComponent={renderEmptyList}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  itemBox: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: "bold",
    marginTop: 6,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#6e6e6e", // Abu-abu elegan
    elevation: 3, // memberi bayangan di Android
    shadowColor: "#000", // memberi bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventList;
