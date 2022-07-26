import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from './Buttons';

const DiaryItem = ({ id, content, emotion, date }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  }

  const goEdit = () => {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <Buttons onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  )
};

export default memo(DiaryItem);