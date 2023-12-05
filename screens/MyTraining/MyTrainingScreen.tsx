import React, { useState } from "react";
import { View, Text, FlatList, Button, Modal, TextInput } from "react-native";
import { styles } from "./styles";
import CreateSessionModal from "../../components/CreateSessionModal/CreateSessionModal";
import EditSessionModal from "../../components/EditSessionModal/EditSessionModal";

interface Exercice {
  name: string;
  sets: number;
  reps: number;
  rest: number;
}

interface Session {
  name: string;
  exercises: Exercice[];
}

export default function MyTrainingScreen() {
  // List
  const [sessions, setSessions] = useState<Session[]>([]);

  //Create Session Modal related
  const [isCreateModalVisible, setCreateModalVisible] =
    useState<boolean>(false);

  //Edit Session Modal related
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentEditingSession, setCurrentEditingSession] =
    useState<Session | null>(null);
  const [currentEditingSessionIndex, setCurrentEditingSessionIndex] = useState<
    number | null
  >(null);

  const handleAddSession = (newSessionName: string) => {
    const newSessionObject: Session = {
      name: newSessionName,
      exercises: [],
    };
    setSessions([...sessions, newSessionObject]);
    setCreateModalVisible(false);
  };

  const handleEditSession = (
    index: number,
    sessionName: string,
    exercises: Exercice[]
  ) => {
    if (currentEditingSessionIndex !== null) {
      const updatedSessions = [...sessions];
      updatedSessions[currentEditingSessionIndex] = {
        ...currentEditingSession!,
        name: sessionName,
        exercises: exercises,
      };
      setSessions(updatedSessions);
      setCurrentEditingSessionIndex(null);
      setCurrentEditingSession(null);
    }
    setEditModalVisible(false);
  };

  const handleDeleteSession = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);

    if (index === currentEditingSessionIndex) {
      setCurrentEditingSessionIndex(null);
      setCurrentEditingSession(null);
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
                onPress={() =>
                  handleEditSession(index, item.name, item.exercises)
                }
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

      {/* Add a Session button */}
      <Button
        title="Ajouter une séance"
        onPress={() => setCreateModalVisible(true)}
      />

      {/* Create Modal */}
      <CreateSessionModal
        isVisible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onAddSession={handleAddSession}
      />

      {/* Edit Modal */}
      <EditSessionModal
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEditSession={(name, exercises) => {
          if (currentEditingSessionIndex !== null) {
            const updatedSessions = [...sessions];
            updatedSessions[currentEditingSessionIndex] = {
              ...currentEditingSession!,
              name,
              exercises,
            };
            setSessions(updatedSessions);
            setCurrentEditingSessionIndex(null);
            setCurrentEditingSession(null);
          }
          setEditModalVisible(false);
        }}
        initialSessionName={currentEditingSession?.name || ""}
        initialExercises={currentEditingSession?.exercises || []}
        sessionIndex={currentEditingSessionIndex || 0}
      />
    </View>
  );
}
