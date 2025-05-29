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

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
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

        const response = await axios.get("http://localhost:3000/auth/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // setTasks(response.data?.tasks ?? []);
        // setTeamMembers(response.data?.teamMembers ?? []);
        // setSchedules(response.data?.schedules ?? []);
        console.log("Response data:", response.data); // Debugging
        setEvents(response.data?.events ?? []);
        setTasks(response.data?.tasks ?? []);
        setAssignments(response.data?.assignments ?? []);
      } catch (err) {
        Alert.alert("Error", "Gagal memuat data tugas.");
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

  // const renderTeamMemberItem = ({ item }) => (
  //   <View style={styles.itemBox}>
  //     <Text style={styles.itemTitle}>Nama Anggota:</Text>
  //     <Text>{item.namaAnggota}</Text>
  //     <Text style={styles.itemTitle}>Email:</Text>
  //     <Text>{item.email}</Text>
  //   </View>
  // );

  // const renderScheduleItem = ({ item }) => (
  //   <View style={styles.itemBox}>
  //     <Text style={styles.itemTitle}>Waktu:</Text>
  //     <Text>{item.waktu}</Text>
  //     <Text style={styles.itemTitle}>Tempat:</Text>
  //     <Text>{item.tempat}</Text>
  //   </View>
  // );

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

export default TaskList;
