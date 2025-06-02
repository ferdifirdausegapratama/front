import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Credits = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={24} color="#ffffff" />
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Tentang Aplikasi</Text>
        <Text style={styles.subtitle}>Informasi Aplikasi dan Pengembang</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Icon
              name="info"
              size={28}
              color="#2563eb"
              style={styles.infoIcon}
            />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Nama Aplikasi</Text>
              <Text style={styles.infoValue}>MyAgenda</Text>
            </View>
          </View>

          <View style={styles.developerSection}>
            <Text style={styles.sectionTitle}>Tim Pengembang</Text>
            <View style={styles.developerItem}>
              <Icon
                name="person"
                size={24}
                color="#4b5563"
                style={styles.developerIcon}
              />
              <View style={styles.developerTextContainer}>
                <Text style={styles.developerLabel}>Pengembang 1</Text>
                <Text style={styles.developerValue}>
                  Mochammad Rifky Andrianto
                </Text>
                <Text style={styles.developerNPM}>NPM: 22081010013</Text>
              </View>
            </View>
            <View style={styles.developerItem}>
              <Icon
                name="person"
                size={24}
                color="#4b5563"
                style={styles.developerIcon}
              />
              <View style={styles.developerTextContainer}>
                <Text style={styles.developerLabel}>Pengembang 2</Text>
                <Text style={styles.developerValue}>
                  Bamaramzy Rakan Faishal
                </Text>
                <Text style={styles.developerNPM}>NPM: 22081010056</Text>
              </View>
            </View>
            <View style={styles.developerItem}>
              <Icon
                name="person"
                size={24}
                color="#4b5563"
                style={styles.developerIcon}
              />
              <View style={styles.developerTextContainer}>
                <Text style={styles.developerLabel}>Pengembang 3</Text>
                <Text style={styles.developerValue}>
                  Ferdi Firdaus Ega Pratama
                </Text>
                <Text style={styles.developerNPM}>NPM: 22081010247</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Versi 1.0.0</Text>
          <Text style={styles.footerText}>© 2025 MyAgenda Team</Text>
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
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },
  infoIcon: {
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },
  developerSection: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  developerItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },
  developerIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  developerTextContainer: {
    flex: 1,
  },
  developerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  developerValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  developerNPM: {
    fontSize: 14,
    color: "#4b5563",
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
});

export default Credits;
