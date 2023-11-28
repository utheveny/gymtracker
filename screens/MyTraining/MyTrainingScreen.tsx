import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { styles } from './styles';

export default function MyTrainingScreen() {
  // List
  const [sessions, setSessions] = useState<string[]>([]);

  //Create Modal related
  const [isCreateModalVisible, setCreateModalVisible] =
    useState<boolean>(false);
  const [newSession, setNewSession] = useState<string>("");

  //Edit Modal related
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedSession, setEditedSession] = useState<string>("");

  const handleAddSession = () => {
    if (newSession.trim() !== "") {
      setSessions([...sessions, newSession]);
      setNewSession("");
      setCreateModalVisible(false);
    }
  };

  const handleEditSession = (index: number, session: string) => {
    setEditingIndex(index);
    setEditedSession(session);
    setEditModalVisible(true);
  };

  const handleEditSessionConfirm = () => {
    if (editingIndex !== null) {
      const updatedSessions = [...sessions];
      updatedSessions[editingIndex] = editedSession;
      setSessions(updatedSessions);
      setEditingIndex(null);
    }
    setEditedSession("");
    setEditModalVisible(false);
  };

  const handleDeleteSession = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
  };

  return (
    <View style={styles.container}>
      <Text>Mes Programmes</Text>
      <Text>Mes séances :</Text>
      <FlatList
        data={sessions}
        keyExtractor={(index) => index.toString()}
        renderItem={({ index, item }) => {
          return (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>{item}</Text>
              <View style={styles.listItemButtons}>
                <Button
                  title="Modifier"
                  onPress={() => handleEditSession(index, item)}
                />
                <Button
                  title="Supprimer"
                  onPress={() => handleDeleteSession(index)}
                />
              </View>
            </View>
          );
        }}
      />

      {/* Add a Session */}
      <Button
        title="Ajouter une séance"
        onPress={() => setCreateModalVisible(true)}
      />

      {/* Create Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCreateModalVisible}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Nouvelle Séance</Text>
            <TextInput
              placeholder="Nom de la séance"
              onChangeText={(text) => setNewSession(text)}
              value={newSession}
            />
            <Button title="Ajouter" onPress={handleAddSession} />
            <Button
              title="Annuler"
              onPress={() => {
                setNewSession("");
                setEditedSession("");
                setCreateModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Modifier Séance</Text>
            <TextInput
              placeholder="Nom de la séance"
              onChangeText={(text) => setEditedSession(text)}
              value={editedSession}
            />
            <Button title="Modifier" onPress={handleEditSessionConfirm} />
            <Button
              title="Annuler"
              onPress={() => {
                setNewSession("");
                setEditedSession("");
                setEditModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
