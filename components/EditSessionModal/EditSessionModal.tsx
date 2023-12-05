import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, FlatList } from "react-native";
import { styles } from "../../screens/MyTraining/styles";


interface Exercice {
  name: string;
  sets: number;
  reps: number;
  rest: number;
}

interface EditSessionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEditSession: (index: number, sessionName: string, exercises: Exercice[]) => void;
  initialSessionName: string;
  initialExercises: Exercice[];
  sessionIndex: number;
}

const EditSessionModal: React.FC<EditSessionModalProps> = ({
  isVisible,
  onClose,
  onEditSession,
  initialSessionName,
  initialExercises,
  sessionIndex,
}) => {
  const [editedSessionName, setEditedSessionName] = useState<string>(
    initialSessionName
  );
  const [editedExercises, setEditedExercises] = useState<Exercice[]>(
    initialExercises
  );
  const [isAddExerciseInputVisible, setAddExerciseInputVisible] =
    useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<Exercice>({
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
  });

  const handleEditSession = () => {
    if (editedSessionName.trim() !== "") {
      onEditSession(sessionIndex, editedSessionName, editedExercises);
      onClose();
    }
  };

  const handleAddExercise = () => {
    if (newExercise.name.trim() !== "") {
      const updatedExercises = [...editedExercises, newExercise];
      setEditedExercises(updatedExercises);
      setNewExercise({
        name: "",
        sets: 0,
        reps: 0,
        rest: 0,
      });
    }
  };

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = [...editedExercises];
    updatedExercises.splice(index, 1);
    setEditedExercises(updatedExercises);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalEdit}>
          <View style={styles.modalHeader}>
            <Button title="X" color="transparent" onPress={onClose} />
            <TextInput
              style={styles.modalHeaderText}
              placeholder="Nom de la séance"
              onChangeText={(text) => setEditedSessionName(text)}
              value={editedSessionName}
            />
            <Button title="X" onPress={onClose} color="#333" />
          </View>
          <View style={styles.modalEditContent}>
            <Text style={styles.modalEditTitle}>Exercices</Text>
            <FlatList
              data={editedExercises}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.listItemContainer}>
                  <Text style={styles.listItemText}>{item.name}</Text>
                  <Button
                    title="Supprimer"
                    onPress={() => handleDeleteExercise(index)}
                  />
                </View>
              )}
            />
            {isAddExerciseInputVisible && (
              <View>
                <TextInput
                  placeholder="Nom de l'exercice"
                  onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
                  value={newExercise.name}
                />
                <Button title="Ajouter" onPress={handleAddExercise} />
              </View>
            )}
            <Button
              title={
                isAddExerciseInputVisible ? "Annuler" : "Ajouter un exercice"
              }
              onPress={() =>
                setAddExerciseInputVisible(!isAddExerciseInputVisible)
              }
            />
          </View>
          <Button title="Enregistrer" onPress={handleEditSession} />
        </View>
      </View>
    </Modal>
  );
};

export default EditSessionModal;
