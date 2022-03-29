// 어떤 주소에 요청할 게 있으면 async storage에 먼저 검색을 해보고
// 있으면 가져오고, 없으면 해당 주소에 요청하기

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

async function fetch(url) {
  try {
    let result = await AsyncStorage.getItem(url);

    // 조회 했을 때 async storage에 데이터가 있는 경우
    if (result !== null) {
      return JSON.parse(result);
    }
    // 데이터가 없는 경우
    else {
      // axios로 해당 url에서 데이터 가져오기
      const response = await axios.get(url);
      // 저장소에 저장하기
      AsyncStorage.setItem(url, JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    alert(err.message);
  }
}

export default fetch;
