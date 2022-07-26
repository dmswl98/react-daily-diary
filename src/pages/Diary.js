import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DiaryStateContext } from "../App";
import Buttons from "../components/Buttons";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { emotionList } from '../util/emotion';

const Diary = () => {
  const navigate = useNavigate();
  const [originData, setOriginData] = useState([]);
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const strDate = new Date(parseInt(originData.date)).toLocaleDateString();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Daily Diary - ${id}번 일기`;
  }, [])

  useEffect(() => {
    if (diaryList.length < 1) return;
    const target = diaryList.find((item) => item.id === parseInt(id));
    if (target) {
      setOriginData(target);
    }
    else {
      alert('존재하지 않는 일기입니다.');
      navigate('/', { replace: true });
    }
  }, [id, diaryList])

  if (originData.length < 1) return <div className="DiaryPage">잠시 기다려주세요.</div>
  else {
    const curEmotionData = emotionList.find((item) => parseInt(item.emotion_id) === parseInt(originData.emotion));

    return (
    <div className="DiaryPage">
      <Header headText={strDate}
        leftChild={
          <Buttons text={"<"} onClick={() => navigate(-1)}/>
        }
        rightChild={
          <Buttons text={"수정하기"} onClick={() => navigate(`/edit/${originData.id}`)}/>
        }
      />
      <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${originData.emotion}`].join(' ')}>
              <img src={curEmotionData.emotion_img} />
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{originData.content}</p>
            </div>
          </section>
      </article>
    </div>
  )
  }
}

export default Diary;