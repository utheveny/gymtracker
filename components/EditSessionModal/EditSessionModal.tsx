import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Button, Modal, FlatList } from "react-native";
import { styles } from "../../screens/MyTraining/styles";
import { Exercice } from "../../types/Exercice";
import { Session } from "../../types/Session";

interface EditSessionModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialSessionName: string;
  initialExercises: Exercice[];
  onUpdateSession: (updatedSession: Session) => void;
}

const EditSessionModal: React.FC<EditSessionModalProps> = ({
  isVisible,
  onClose,
  initialSessionName,
  initialExercises,
  onUpdateSession,
}) => {
  //Session related
  const [editedSessionName, setEditedSessionName] =
    useState<string>(initialSessionName);
  const [editedExercises, setEditedExercises] =
    useState<Exercice[]>(initialExercises);

  //Exercices related
  const [isAddExerciseInputVisible, setAddExerciseInputVisible] =
    useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<Exercice>({
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
  });
  const [newExerciseSets, setNewExerciseSets] = useState<number>(0);
  const [newExerciseReps, setNewExerciseReps] = useState<number>(0);
  const [newExerciseRest, setNewExerciseRest] = useState<number>(0);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<
    number | null
  >(null);
  const [editingExerciseDetails, setEditingExerciseDetails] =
    useState<Exercice | null>(null);

  useEffect(() => {
    setEditedSessionName(initialSessionName);
    setEditedExercises(initialExercises);
  }, [initialSessionName, initialExercises]);

  const handleAddExercise = () => {
    if (newExercise.name.trim() !== "") {
      const updatedExercises = [
        ...editedExercises,
        {
          ...newExercise,
          sets: newExerciseSets,
          reps: newExerciseReps,
          rest: newExerciseRest,
        },
      ];
      setEditedExercises(updatedExercises);
      setNewExercise({
        name: "",
        sets: 0,
        reps: 0,
        rest: 0,
      });
      setNewExerciseSets(0);
      setNewExerciseReps(0);
      setNewExerciseRest(0);
      setAddExerciseInputVisible(false);
    }
  };

  const handleEditExercise = (index: number, exercise: Exercice) => {
    setEditingExerciseIndex(index);
    setEditingExerciseDetails({ ...exercise });
  };

  const handleEditExerciseDetailsChange = (
    field: keyof Exercice,
    value: string
  ) => {
    if (editingExerciseDetails) {
      const updatedExerciseDetails = {
        ...editingExerciseDetails,
        [field]: value,
      };
      setEditingExerciseDetails(updatedExerciseDetails);
      setNewExerciseSets(updatedExerciseDetails.sets || 0);
      setNewExerciseReps(updatedExerciseDetails.reps || 0);
      setNewExerciseRest(updatedExerciseDetails.rest || 0);
    }
  };

  const handleSaveEditedExercise = () => {
    if (editingExerciseIndex !== null && editingExerciseDetails) {
      const updatedExercises = [...editedExercises];
      updatedExercises[editingExerciseIndex] = {
        ...editingExerciseDetails,
        sets: newExerciseSets,
        reps: newExerciseReps,
        rest: newExerciseRest,
      };
      setEditedExercises(updatedExercises);
      setEditingExerciseIndex(null);
      setEditingExerciseDetails(null);
    }
  };

  const handleCancelEditExercise = () => {
    setEditingExerciseIndex(null);
    setEditingExerciseDetails(null);
  };

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = [...editedExercises];
    updatedExercises.splice(index, 1);
    setEditedExercises(updatedExercises);
  };

  const handleCloseModal = () => {
    const updatedSession = {
      name: editedSessionName,
      exercises: editedExercises,
    };
    onUpdateSession(updatedSession);
    setEditingExerciseIndex(null);
    setEditingExerciseDetails(null);
    onClose();
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
            <Button title="X" color="transparent" />
            <TextInput
              style={styles.modalHeaderText}
              placeholder="Nom de la séance"
              keyboardType="default"
              onChangeText={(text) => setEditedSessionName(text)}
              value={editedSessionName}
            />
            <Button title="X" onPress={handleCloseModal} color="#333" />
          </View>
          <View style={styles.modalEditContent}>
            <Text style={styles.modalEditTitle}>Exercices</Text>
            <FlatList
              data={editedExercises}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                // Exercice Item
                <View style={styles.listItemContainer}>
                  {editingExerciseIndex === null ? (
                    <View>
                      <Text style={styles.listItemText}>{item.name}</Text>
                      <Text style={styles.listItemText}>
                        Series: {item.sets}
                      </Text>
                      <Text style={styles.listItemText}>
                        Repetitions: {item.reps}
                      </Text>
                      <Text style={styles.listItemText}>
                        Repos: {item.rest}
                      </Text>

                      <Button
                        title="Modifier"
                        onPress={() => handleEditExercise(index, item)}
                      />
                      <Button
                        title="Supprimer"
                        onPress={() => handleDeleteExercise(index)}
                      />
                    </View>
                  ) : (
                    <View>
                      {/* Name */}
                      <TextInput
                        placeholder="Nouveau nom"
                        keyboardType="default"
                        onChangeText={(text) =>
                          handleEditExerciseDetailsChange("name", text)
                        }
                        value={editingExerciseDetails?.name || ""}
                      />
                      {/* Sets */}
                      <TextInput
                        placeholder="Séries"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleEditExerciseDetailsChange("sets", text)
                        }
                        value={String(newExerciseSets)}
                      />
                      {/* Reps */}
                      <TextInput
                        placeholder="Répétitions"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleEditExerciseDetailsChange("reps", text)
                        }
                        value={String(newExerciseReps)}
                      />
                      {/* Rest */}
                      <TextInput
                        placeholder="Repos (s)"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleEditExerciseDetailsChange("rest", text)
                        }
                        value={String(newExerciseRest)}
                      />
                      <Button
                        title="Enregistrer"
                        onPress={() => handleSaveEditedExercise()}
                      />
                      <Button
                        title="Annuler"
                        onPress={() => handleCancelEditExercise()}
                      />
                    </View>
                  )}
                </View>
              )}
            />

            {/* Add Exercice Form */}
            {isAddExerciseInputVisible && (
              <View>
                {/* Name */}
                <TextInput
                  placeholder="Nom de l'exercice"
                  keyboardType="default"
                  onChangeText={(text) =>
                    setNewExercise({ ...newExercise, name: text })
                  }
                  value={newExercise.name}
                />
                {/* Sets */}
                <TextInput
                  placeholder="Séries"
                  keyboardType="numeric"
                  onChangeText={(text) => setNewExerciseSets(Number(text))}
                  value={String(newExerciseSets)}
                />
                {/* Reps */}
                <TextInput
                  placeholder="Répétitions"
                  keyboardType="numeric"
                  onChangeText={(text) => setNewExerciseReps(Number(text))}
                  value={String(newExerciseReps)}
                />
                {/* Rest */}
                <TextInput
                  placeholder="Repos (s)"
                  keyboardType="numeric"
                  onChangeText={(text) => setNewExerciseRest(Number(text))}
                  value={String(newExerciseRest)}
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
        </View>
      </View>
    </Modal>
  );
};

export default EditSessionModal;
