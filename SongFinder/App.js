/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import styled from 'styled-components/native';
import fetch from './net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  margin: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  padding: 0 8px;
`;

const Button = styled.Button``;

const ListItem = styled.TouchableOpacity`
  padding: 6px 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
`;

const Label = styled.Text`
  font-size: 16px;
`;

const App: () => Node = () => {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);
  const search = React.useCallback(() => {
    let url = `https://api.manana.kr/karaoke/singer/${keyword}.json`;
    fetch(url).then(data => {
      setList(data);
    });
  }, [keyword]);

  return (
    <Container>
      <Row>
        <Input value={keyword} onChangeText={setKeyword} />
        <Button title="검색" onPress={search} />
      </Row>
      <Contents>
        {list.map(item => (
          <ListItem key={item.brand + item.no}>
            <Label>{`[${item.no}] ${item.singer} - ${item.title}`}</Label>
          </ListItem>
        ))}
      </Contents>
    </Container>
  );
};

export default App;
