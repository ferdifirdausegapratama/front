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
  const [participants, setParticipants] = useState([]);
  const [schedules, setSchedules] = useState([]);
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

        setEvents(response.data?.events ?? []);
        setParticipants(response.data?.participants ?? []);
        setSchedules(response.data?.schedules ?? []);
      } catch (err) {
        Alert.alert("Error", "Gagal memuat data kegiatan.");
        console.error("Error:", err.message);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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

  const renderParticipantItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Nama Peserta:</Text>
      <Text>{item.namaPeserta}</Text>
      <Text style={styles.itemTitle}>Email:</Text>
      <Text>{item.email}</Text>
    </View>
  );

  const renderScheduleItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Waktu:</Text>
      <Text>{item.waktu}</Text>
      <Text style={styles.itemTitle}>Tempat:</Text>
      <Text>{item.tempat}</Text>
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
        />

        <Text style={styles.sectionTitle}>👥 Daftar Peserta</Text>
        <FlatList
          data={participants}
          renderItem={renderParticipantItem}
          keyExtractor={(item, index) => `participant-${item.id ?? index}`}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>🗓️ Jadwal Acara</Text>
        <FlatList
          data={schedules}
          renderItem={renderScheduleItem}
          keyExtractor={(item, index) => `schedule-${item.id ?? index}`}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Tombol Kembali */}
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
