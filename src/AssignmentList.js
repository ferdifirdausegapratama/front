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
import { useNavigation } from "@react-navigation/native";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
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

        const response = await axios.get(
          "http://localhost:3000/auth/assignments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAssignments(response.data?.assignments ?? []);
        setGroupMembers(response.data?.groupMembers ?? []);
        setSchedules(response.data?.schedules ?? []);
      } catch (err) {
        Alert.alert("Error", "Gagal memuat data tugas akademik.");
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

  const renderAssignmentItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Judul Tugas:</Text>
      <Text>{item.judulTugas}</Text>
      <Text style={styles.itemTitle}>Tenggat:</Text>
      <Text>{formatDate(item.tenggat)}</Text>
      <Text style={styles.itemTitle}>Mata Kuliah:</Text>
      <Text>{item.mataKuliah}</Text>
      <Text style={styles.itemTitle}>Catatan:</Text>
      <Text>{item.catatan || "-"}</Text>
    </View>
  );

  const renderGroupMemberItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Nama Anggota:</Text>
      <Text>{item.namaAnggota}</Text>
      <Text style={styles.itemTitle}>NIM:</Text>
      <Text>{item.nim}</Text>
    </View>
  );

  const renderScheduleItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Waktu:</Text>
      <Text>{item.waktu}</Text>
      <Text style={styles.itemTitle}>Kegiatan:</Text>
      <Text>{item.kegiatan}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Daftar Tugas Akademik</Text>

        <Text style={styles.sectionTitle}>📋 Daftar Tugas</Text>
        <FlatList
          data={assignments}
          renderItem={renderAssignmentItem}
          keyExtractor={(item, index) => `assignment-${item.id ?? index}`}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>👥 Daftar Anggota Kelompok</Text>
        <FlatList
          data={groupMembers}
          renderItem={renderGroupMemberItem}
          keyExtractor={(item, index) => `member-${item.id ?? index}`}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>🗓️ Jadwal Terkait</Text>
        <FlatList
          data={schedules}
          renderItem={renderScheduleItem}
          keyExtractor={(item, index) => `schedule-${item.id ?? index}`}
          scrollEnabled={false}
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
    backgroundColor: "#6e6e6e",
    elevation: 3,
    shadowColor: "#000",
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

export default AssignmentList;
