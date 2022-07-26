import React, { memo, useCallback, useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from "../App";
import { emotionList } from '../util/emotion';

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
}

const DiaryEditor = ({isEdit, originData}) => {
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정할까요?" : "새로운 일기를 작성할까요?")) {
      const date = new Date();
      if (!isEdit) {
        onCreate(date, content, emotion);
      }
      else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate('/', { replace: true });
  }

  const handleRemove = () => {
    if(window.confirm('이 일기를 삭제할까요?')) {
      onRemove(originData.id);
      navigate('/', {replace:true});
    }
  }

  useEffect(() => {
    if (isEdit) {
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData])

  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? "수정하기" : "새 일기"}
        leftChild={
          <Buttons text={"<"} onClick={() => navigate(-1)}/>
        }
        rightChild={
          isEdit && <Buttons text={"삭제하기"} type={"negative"} onClick={handleRemove}/>
        }
      />
      <div>
        <section>
          <h4>작성 날짜</h4>
          <div className="input_box">
            <input className="input_date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => 
              <EmotionItem key={item.emotion_id} {...item}
                onClick={handleClickEmotion}
                isSelected={item.emotion_id === emotion}
              />
            )}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <textarea ref={contentRef} placeholder="오늘은 어땠나요?" value={content}
            onChange={(e)=>setContent(e.target.value)} />
        </section>
        <section>
          <div className="control_box">
            <Buttons text={"취소하기"} onClick={() => navigate(-1)} />
            <Buttons text={"저장하기"} type={"positive"} onClick={handleSubmit}/>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor;