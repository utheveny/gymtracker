import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, FlatList } from "react-native";
import { styles } from "../../screens/MyTraining/styles";

interface EditSessionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEditSession: (sessionName: string, exercises: string[]) => void;
  initialSessionName: string;
  initialExercises: string[];
}

const EditSessionModal: React.FC<EditSessionModalProps> = ({
  isVisible,
  onClose,
  onEditSession,
  initialSessionName,
  initialExercises,
}) => {
  const [editedSessionName, setEditedSessionName] = useState<string>(
    initialSessionName
  );
  const [editedExercises, setEditedExercises] = useState<string[]>(
    initialExercises
  );
  const [isAddExerciseInputVisible, setAddExerciseInputVisible] =
    useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<string>("");

  const handleEditSession = () => {
    if (editedSessionName.trim() !== "") {
      onEditSession(editedSessionName, editedExercises);
      onClose();
    }
  };

  const handleAddExercise = () => {
    if (newExercise.trim() !== "") {
      const updatedExercises = [...editedExercises, newExercise];
      setEditedExercises(updatedExercises);
      setNewExercise("");
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
                  <Text style={styles.listItemText}>{item}</Text>
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
                  onChangeText={(text) => setNewExercise(text)}
                  value={newExercise}
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
