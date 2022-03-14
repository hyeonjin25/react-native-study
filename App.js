import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);

  const onWorkPress = () => setWorking(true);
  const onTravelPress = () => setWorking(false);

  const onchangeText = (payload) => {
    setText(payload);
  };

  const saveToDo = async (toSave) => {
    // 저장하는데 문제가 생길 경우를 대비해 try catch문 사용
    try {
      // asyncstorage에 저장하기 위해 object를 string으로 바꾸기
      const s = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, s);
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY, s);

    // string을 object로 만들기
    setToDos(JSON.parse(s));
    console.log(JSON.parse(s));
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // save to do
    const newToDo = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDo);
    await saveToDo(newToDo);
    setText("");
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
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            ) : null
          )}
        </ScrollView>
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
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
