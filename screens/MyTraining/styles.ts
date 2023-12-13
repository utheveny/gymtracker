import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // GENERAL
  container: {},

  // MODAL RELATED
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeaderButton: {
    height: 24,
    width: 24,
  },

  // MODAL CREATE
  modalCreate: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    width: "80%",
  },
  modalCreateContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  // MODAL EDIT
  modalEdit: {
    backgroundColor: "white",
    height: "80%",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    display: "flex",
  },
  modalEditContent: {
    height: "90%",
  },
  modalEditTitle: {
    width: "100%",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  trackMark: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
