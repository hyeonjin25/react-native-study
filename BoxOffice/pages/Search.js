import React, {useState} from 'react';
import styled from 'styled-components/native';
import Title from '../components/Title';
import Row from '../components/Row';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  margin-left: 12px;
  padding: 0 12px;
`;

const Button = styled.Button``;

function Search(props) {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = React.useCallback(() => {
    let url =
      'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=1cf8e916611871e613ebe31e4c98756a';
    url += '&movieNm=' + keyword;

    setIsLoading(true);

    axios
      .get(url)
      .then(res => {
        setIsLoading(false);
        setList(res.data.movieListResult.movieList);
      })
      .catch(err => {
        alert(error.message);
      });
  }, [keyword]);

  return (
    <Container>
      <Title>영화 검색</Title>
      <Row>
        <Input value={keyword} onChangeText={setKeyword} />
        <Button title="검색" onPress={search} />
      </Row>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        list.map(item => (
          <ListItem
            key={item.movieCd}
            onPress={() => {
              props.navigation.navigate('MovieDetail', {movieCd: item.movieCd});
            }}>
            <MovieName>{item.movieNm}</MovieName>
          </ListItem>
        ))
      )}
    </Container>
  );
}

export default Search;
