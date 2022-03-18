import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [finished, setFinished] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [text, onchangeText] = useState("");
  const [modiText, onchangeModiText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    // useEffect에 async await 사용위해 함수 따로 만들기
    async function Category() {
      const working = await AsyncStorage.getItem("@working");
      if (working !== null) setWorking(JSON.parse(working));
    }
    Category();
    loadToDos();
  }, []);

  const onWorkPress = async () => {
    setWorking(true);
    await AsyncStorage.setItem("@working", "true");
  };
  const onTravelPress = async () => {
    setWorking(false);
    await AsyncStorage.setItem("@working", "false");
  };

  const saveToDo = async (toSave) => {
    // 저장하는데 문제가 생길 경우를 대비해 try catch문 사용
    try {
      // asyncstorage에 저장하기 위해 object를 string으로 바꾸기
      const s = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, s);
      console.log(s);
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY, s);
      // string을 object로 만들기
      setToDos(JSON.parse(s));
    } catch (e) {
      console.log(e);
    }

    console.log(JSON.parse(s));
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // save to do
    const newToDo = { ...toDos, [Date.now()]: { text, working, finished } };
    setToDos(newToDo);
    await saveToDo(newToDo);
    onchangeModiText("");
  };

  const modifyToDo = async (key) => {
    if (modiText === "") {
      return;
    }
    // save to do
    const newToDo = {
      ...toDos,
      [key]: { text: modiText, working, finished, modifying },
    };
    setToDos(newToDo);
    await saveToDo(newToDo);
    setModifying(false);
    onchangeModiText("");
  };

  const onFinishedToDo = async (key) => {
    const newToDos = { ...toDos };

    // 이미 완료된 일이면 완료 취소/ 아니면 완료로 바꿔주기
    if (toDos[key].finished) {
      newToDos[key].finished = false;
    } else {
      newToDos[key].finished = true;
    }
    setToDos(newToDos);
    saveToDo(newToDos);
  };

  const onModifyToDo = async (key) => {
    const newToDos = { ...toDos };

    // 이미 완료된 일이면 완료 취소/ 아니면 완료로 바꿔주기
    if (toDos[key].modifying) {
      newToDos[key].modifying = false;
    } else {
      newToDos[key].modifying = true;
    }
    setToDos(newToDos);
    saveToDo(newToDos);
  };

  const onDeleteToDo = async (key) => {
    Alert.alert("ToDo를 삭제합니다.", "삭제하시겠습니까?", [
      { text: "아니오" },
      {
        text: "예",
        // 강조하기
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          // 해당 키의 object 지워주기
          delete newToDos[key];
          setToDos(newToDos);
          saveToDo(newToDos);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
      <View style={styles.header}>
        {/* 누르는 이벤트를 listen, 투명도 조절가능 */}
        <TouchableOpacity onPress={onWorkPress}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onTravelPress}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          // 사용자가 전송 버튼 누름 감지
          onSubmitEditing={addToDo}
          placeholder={
            working ? "해야 할 일을 입력하세요" : "어디로 여행갈까요?"
          }
          // 엔터 버튼 바꾸기
          onChangeText={onchangeText}
          value={text}
          returnKeyType='done'
          style={styles.input}
        />

        {/* 로딩중인 경우 */}
        {toDos.length === 0 ? (
          <View>
            <ActivityIndicator style={{ marginTop: 50 }} />
          </View>
        ) : (
          // 사용자가 저장한 리스트 보여주기
          <ScrollView>
            {Object.keys(toDos).map((key) =>
              toDos[key].working === working ? (
                <View
                  style={
                    toDos[key].finished ? styles.toDoFinished : styles.toDo
                  }
                  key={key}
                >
                  {toDos[key].modifying ? (
                    // 수정할 때
                    <TextInput
                      onSubmitEditing={() => modifyToDo(key)}
                      placeholder={toDos[key].text}
                      onChangeText={onchangeModiText}
                      value={modiText}
                      returnKeyType='done'
                      autoFocus={true}
                      style={{
                        backgroundColor: "white",
                        padding: 5,
                        width: "70%",
                      }}
                    />
                  ) : (
                    <Text
                      style={
                        toDos[key].finished
                          ? styles.toDoTextFinished
                          : styles.toDoText
                      }
                    >
                      {toDos[key].text}
                    </Text>
                  )}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* 수정 버튼 */}
                    <TouchableOpacity onPress={() => onModifyToDo(key)}>
                      <Text>
                        <Entypo name='pencil' size={22} color='black' />
                      </Text>
                    </TouchableOpacity>

                    {/* 완료 버튼 */}
                    <TouchableOpacity
                      onPress={() => onFinishedToDo(key)}
                      style={{ paddingRight: 3 }}
                    >
                      <Text>
                        {toDos[key].finished ? (
                          <AntDesign
                            name='checkcircle'
                            size={20}
                            color='black'
                          />
                        ) : (
                          <AntDesign
                            name='checkcircleo'
                            size={20}
                            color='black'
                          />
                        )}
                      </Text>
                    </TouchableOpacity>

                    {/* 삭제 버튼 */}
                    <TouchableOpacity onPress={() => onDeleteToDo(key)}>
                      <Text>
                        <MaterialIcons
                          name='cancel'
                          size={24}
                          color={theme.bg}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 17,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoFinished: {
    backgroundColor: "#242424",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  toDoTextFinished: {
    color: "gray",
    fontSize: 16,
    textDecorationLine: "line-through",
  },
});
