import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetch(url) {
  let result = await AsyncStorage.getItem(url);
  let timestamp = await AsyncStorage.getItem('T' + url);

  const now = new Date().getTime(); // 현재시간

  // 저장된 정보가 있을 경우
  // 현재 시간이랑 timestamp(이전에 불러왔던 시간)를 비교해서 하루가 초과하면 다시 불러오기
  if (result !== null) {
    timestamp = Number(timestamp); // 이전에 불러왔던 시간
    // 이전에 불러왔던 시간이 24시간 이내일 경우는 이전 데이터 사용
    if (now - timestamp < 86400000) {
      console.log('캐시 사용됨');
      return JSON.parse(result);
    }
  }

  // 저장된 정보가 없거나 24시간이 지났을 경우
  result = await axios.get(url);
  AsyncStorage.setItem(url, JSON.stringify(result.data));
  AsyncStorage.setItem('T' + url, now.toString());
  return result.data;
}

export default fetch;
