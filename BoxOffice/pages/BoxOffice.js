import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import Title from '../components/Title';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

function BoxOffice(props) {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    // 영화 정보 가져오기
    // ajax 비동기 자바스크립트 XML
    fetch(
      'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=1cf8e916611871e613ebe31e4c98756a&targetDt=20220328',
    )
      .then(data => {
        // 완료 되었을 때
        setList(data.boxOfficeResult.dailyBoxOfficeList);
        console.log(data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch(err => {
        // 예외가 발생했을 때
        alert(err.message);
      });
  }, []);

  return (
    <Container>
      <Contents>
        <Title>박스 오피스</Title>
        {/* 로딩중일 경우 */}
        {list.length === 0 && <ActivityIndicator size="large" />}
        {list.map(item => (
          <ListItem
            key={item.movieCd}
            onPress={() => {
              props.navigation.navigate('MovieDetail', {movieCd: item.movieCd});
            }}>
            {/*  영화 코드*/}
            <Rank>{item.rank}</Rank>
            <MovieName>{item.movieNm}</MovieName>
          </ListItem>
        ))}
      </Contents>
    </Container>
  );
}

export default BoxOffice;
