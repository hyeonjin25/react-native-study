import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

const MovieName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

function BoxOffice(props) {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    // 영화 정보 가져오기
    // ajax 비동기 자바스크립트 XML
    axios
      .get(
        'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=1cf8e916611871e613ebe31e4c98756a&targetDt=20220222',
      )
      .then(res => {
        // 완료 되었을 때
        setList(res.data.boxOfficeResult.dailyBoxOfficeList);
        console.log(res.data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch(err => {
        // 예외가 발생했을 때
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
