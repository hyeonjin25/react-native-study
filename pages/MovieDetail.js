import React from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;

const Description = styled.Text`
  font-size: 18px;
  margin: 8px 12px;
`;

const Back = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const BackLabel = styled.Text`
  font-size: 15px;
  color: #0000cc;
`;

const Header = styled.View`
  height: 50px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

function MovieDetail(props) {
  const [info, setInfo] = React.useState(null);

  React.useEffect(() => {
    let url =
      'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=1cf8e916611871e613ebe31e4c98756a';
    url += '&movieCd=' + props.route.params.movieCd;
    axios
      .get(url)
      .then(res => {
        console.log(res);
        setInfo(res.data.movieInfoResult.movieInfo);
      })
      .catch(err => {
        alert(err.message);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Back
          title={'돌아가기'}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <BackLabel>목록으로</BackLabel>
        </Back>
        <HeaderTitle>영화 정보 조회</HeaderTitle>
        <Back></Back>
      </Header>
      <Contents>
        {info === null ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <Title>{info.movieNm}</Title>
            {/*moment 사용해서 날짜 다듬기*/}
            <Description>
              개봉일 :{' '}
              {moment(info.openDt, 'YYYYMMDD').format('YYYY년 MM월 DD일')}
            </Description>
            <Description>상영시간 : {info.showTm}분</Description>
            {/*배열로 오는 경우에는 컴마로 join해서 하나의 string으로 만들어주기*/}
            <Description>
              국가 : {info.nations.map(item => item.nationNm).join(', ')}
            </Description>
            <Description>
              감독 : {info.directors.map(item => item.peopleNm).join(', ')}
            </Description>
            <Description>
              배우 : {info.actors.map(item => item.peopleNm).join(', ')}
            </Description>
          </>
        )}
      </Contents>
    </Container>
  );
}

export default MovieDetail;
