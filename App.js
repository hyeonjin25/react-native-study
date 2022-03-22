/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// 초성퀴즈 만들기

import React from 'react';
import type {Node} from 'react';
import styled from 'styled-components/native';
import movieList from './movieList';
import _ from 'lodash';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  padding: 24px;
`;

const Quiz = styled.Text`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #cc0000;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`;

// 이니셜을 추출하는 함수
function getInitials(string) {
  return string
    .split('')
    .map(char => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index >= 0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join('');
}

const App: () => Node = () => {
  const [quizList, setQuizList] = React.useState(_.shuffle(movieList)); // 순서가 랜덤한 영화목록
  const [mode, setMode] = React.useState('quiz'); // quiz or answer 모드

  // 익명함수를 사용할 경우에는 화면이 변경될 경우에 함수가 매번 다시생성됨
  // useCallback으로 함수가 변경이 필요한 경우에만 새로 생성되게 할 수 있음
  // 다만 함수가 생긴 후 변경이 많이 이루어지지 않는 함수일 경우에 사용하는게 좋음
  const onPress = React.useCallback(() => {
    if (mode === 'answer') {
      setQuizList(quizList.slice(1)); // 0번 잘라내고, 1번부터 나머지만 남기기
    }
    setMode(mode === 'quiz' ? 'answer' : 'quiz');
  }, [mode]);
  const retry = React.useCallback(() => {
    setQuizList(_.shuffle(movieList));
    setMode('quiz');
  }, [quizList]);
  return (
    <>
      <Container>
        <Contents>
          {quizList.length ? ( // 더이상 낼 퀴즈가 없을 경우에 끝임을 알려주기
            <Quiz>
              {mode === 'quiz' ? getInitials(quizList[0]) : quizList[0]}
            </Quiz>
          ) : (
            <Quiz>퀴즈 끝</Quiz>
          )}
          {/* 영화 이름에서 이니셜만 추출하여 문제로 내기 */}
        </Contents>
        {quizList.length ? ( // 더이상 낼 퀴즈가 없을 경우에 끝임을 알려주기
          <Button onPress={onPress}>
            <Label>{mode === 'quiz' ? '정답확인' : '다음'}</Label>
          </Button>
        ) : (
          <Button onPress={retry}>
            <Label>처음부터 다시 시작</Label>
          </Button>
        )}
      </Container>
    </>
  );
};

export default App;
