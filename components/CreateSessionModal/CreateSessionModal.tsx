import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
import { styles } from "../../screens/MyTraining/styles";

interface CreateSessionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddSession: (sessionName: string) => void;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  isVisible,
  onClose,
  onAddSession,
}) => {
  const [newSession, setNewSession] = useState<string>("");

  const handleAddSession = () => {
    if (newSession.trim() !== "") {
      onAddSession(newSession);
      setNewSession("");
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalCreate}>
          <View style={styles.modalHeader}>
            <Button title="X" color="transparent" onPress={onClose} />
            <Text style={styles.modalHeaderText}>Nouvelle Séance</Text>
            <Button title="X" onPress={onClose} color="#333" />
          </View>
          <View style={styles.modalCreateContent}>
            <TextInput
              placeholder="Nom de la séance"
              keyboardType="default"
              onChangeText={(text) => setNewSession(text)}
              value={newSession}
            />
            <Button title="Ajouter" onPress={handleAddSession} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateSessionModal;
