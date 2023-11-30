import React, { useState } from "react";
import { View, Text, FlatList, Button, Modal, TextInput } from "react-native";
import { styles } from "./styles";

interface Session {
  name: string;
  exercises: string[];
}

export default function MyTrainingScreen() {
  // List
  const [sessions, setSessions] = useState<Session[]>([]);

  //Create Session Modal related
  const [isCreateModalVisible, setCreateModalVisible] =
    useState<boolean>(false);
  const [newSession, setNewSession] = useState<string>("");

  //Edit Session Modal related
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [currentEditingSession, setCurrentEditingSession] =
    useState<Session | null>(null);
  const [editedExercises, setEditedExercises] = useState<string[]>([]);

  //Add Exercise Modal related
  const [isAddExerciseModalVisible, setAddExerciseModalVisible] =
    useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<string>("");

  const handleAddSession = () => {
    if (newSession.trim() !== "") {
      const newSessionObject: Session = {
        name: newSession,
        exercises: [],
      };
      setSessions([...sessions, newSessionObject]);
      setNewSession("");
      setCreateModalVisible(false);
    }
  };

  const handleEditSession = (index: number, session: Session) => {
    setEditingIndex(index);
    setCurrentEditingSession(session);
    setEditedExercises(session.exercises);
    setEditModalVisible(true);
  };

  const handleEditSessionConfirm = () => {
    if (editingIndex !== -1 && currentEditingSession) {
      const updatedSessions = [...sessions];
      updatedSessions[editingIndex] = currentEditingSession;
      setSessions(updatedSessions);
      setEditingIndex(-1);
      setCurrentEditingSession(null);
    }
    setEditModalVisible(false);
  };

  const handleDeleteSession = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
  };

  const handleOpenAddExerciseModal = () => {
    setAddExerciseModalVisible(true);
  };

  const handleAddExercise = () => {
    if (newExercise.trim() !== "" && currentEditingSession) {
      const updatedExercises = [
        ...currentEditingSession.exercises,
        newExercise,
      ];
      setCurrentEditingSession({
        ...currentEditingSession,
        exercises: updatedExercises,
      });
      setNewExercise("");
      setAddExerciseModalVisible(false);
    }
  };

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = [...editedExercises];
    updatedExercises.splice(index, 1);
    setEditedExercises(updatedExercises);
    if (currentEditingSession) {
      setCurrentEditingSession({
        ...currentEditingSession,
        exercises: updatedExercises,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Mes Programmes</Text>
      <Text>Mes séances :</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.name}
        renderItem={({ index, item }) => {
          return (
            <View style={styles.listItemContainer}>
              <Text
                style={styles.listItemText}
                onPress={() => handleEditSession(index, item)}
              >
                {item.name}
              </Text>
              <View style={styles.listItemButtons}>
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
            <Button title="Ajouter" onPress={() => handleAddSession} />
            <Button
              title="Annuler"
              onPress={() => {
                setNewSession("");
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
          <View style={styles.modalEditContent}>
            <Text>Modifier Séance</Text>
            <TextInput
              placeholder="Nom de la séance"
              onChangeText={(text) => {
                if (currentEditingSession) {
                  setCurrentEditingSession({
                    ...currentEditingSession,
                    name: text,
                  });
                }
              }}
              value={currentEditingSession?.name || ""}
            />

            {/* Exerices */}
            <Text>Exercices :</Text>
            <FlatList
              data={editedExercises}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.listItemContainer}>
                  <Text style={styles.listItemText}>{item}</Text>
                  <Button
                    title="Supprimer"
                    onPress={() => handleDeleteExercise(index)}
                  />
                </View>
              )}
            />
            <Button
              title="Ajouter un exercice"
              onPress={() => handleOpenAddExerciseModal()}
            />

            <Button title="Modifier" onPress={() => handleEditSessionConfirm} />
            <Button
              title="Annuler"
              onPress={() => {
                setNewSession("");
                setEditModalVisible(false);
              }}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isAddExerciseModalVisible}
          onRequestClose={() => setAddExerciseModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Ajouter un exercice</Text>
              <TextInput
                placeholder="Nom de l'exercice"
                onChangeText={(text) => setNewExercise(text)}
                value={newExercise}
              />
              <Button title="Ajouter" onPress={() => handleAddExercise()} />

              <Button
                title="Annuler"
                onPress={() => {
                  setNewExercise("");
                  setAddExerciseModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
}
