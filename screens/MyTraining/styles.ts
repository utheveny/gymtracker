import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    flex: 1,
    marginRight: 10,
  },
  listItemButtons: {
    flexDirection: "row",
  },
});