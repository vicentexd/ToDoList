import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { useMemo, useState } from "react";
import { Task } from "./src/components/Task";

type TaskObj = {
  id: number;
  description: string;
  completed: boolean;
};

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [taskList, setTaskList] = useState<TaskObj[]>([]);

  const handleCreateTask = () => {
    if (taskText === "") {
      return;
    }
    const newTask: TaskObj = {
      id: Math.random() * 1000,
      completed: false,
      description: taskText,
    };

    setTaskList((prevState) => [...prevState, newTask]);
    setTaskText("");
  };

  const handleDeleteTask = (id: number) => {
    setTaskList((prevState) => prevState.filter((task) => task.id !== id));
  };

  const handleCheckTask = (id: number) => {
    const findIndexTask = taskList.findIndex((task) => task.id === id);
    const updateTasks = [...taskList];

    if (findIndexTask !== -1) {
      updateTasks[findIndexTask] = {
        ...updateTasks[findIndexTask],
        completed: !updateTasks[findIndexTask].completed,
      };
    }

    setTaskList(updateTasks);
  };

  const infoTask = useMemo(
    () =>
      taskList.reduce(
        (acc, curr) => {
          const updateAcc = acc;

          if (curr.completed) {
            updateAcc.completed += 1;
          }

          updateAcc.total += 1;

          return updateAcc;
        },
        { completed: 0, total: 0 }
      ),
    [taskList]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/Logo.png")} />
      </View>

      <View style={styles.newTask}>
        <TextInput
          onChangeText={setTaskText}
          value={taskText}
          style={{
            backgroundColor: "#262626",
            width: 270,
            height: 54,
            borderWidth: 1,
            borderColor: taskText ? "#5E60CE" : "#0D0D0D",
            borderRadius: 6,
            padding: 16,
            color: "#F2F2F2",
            fontSize: 16,
          }}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={"#808080"}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleCreateTask}>
          <FeatherIcon name="plus-circle" size={24} color="#F2F2F2" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerContent}>
          <View style={styles.infoContainer}>
            <Text style={{ color: "#4EA8DE" }}>Criadas</Text>

            <View style={styles.infoCounter}>
              <Text style={{ color: "#F2F2F2" }}>{infoTask.total}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={{ color: "#8284FA" }}>Concluídas</Text>

            <View style={styles.infoCounter}>
              <Text style={{ color: "#F2F2F2" }}>{infoTask.completed}</Text>
            </View>
          </View>
        </View>

        {taskList.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <Image source={require("./assets/Clipboard.png")} />
            <View style={{ paddingTop: 16 }}>
              <Text
                style={{ fontSize: 14, color: "#808080", fontWeight: "bold" }}
              >
                Você ainda não tem tarefas cadastradas
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Crie tarefas e organize seus itens a fazer
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView style={{ marginTop: 20 }}>
            {taskList.map((task) => (
              <Task
                completed={task.completed}
                description={task.description}
                id={task.id}
                onDelete={handleDeleteTask}
                onCompleted={handleCheckTask}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.3,
  },
  newTask: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -27,
  },
  buttonAdd: {
    marginLeft: 4,
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E6F9F",
    borderRadius: 6,
  },
  content: {
    paddingTop: 32,
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
    marginRight: 24,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoCounter: {
    marginLeft: 8,
    backgroundColor: "#333333",
    width: 25,
    height: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
  },
  emptyListContainer: {
    borderTopWidth: 1,
    marginTop: 20,
    borderTopColor: "#333333",
    marginLeft: 24,
    marginRight: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 208,
  },
});
