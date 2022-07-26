import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된순' }
]

const filterOptionList = [
  { value: 'all', name: '모두' },
  { value: 'good', name: '좋은 감정' },
  { value: 'bad', name: '안 좋은 감정' }
]

const ControlMenu = memo(({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((item, index) => 
        <option key={index} value={item.value}>{item.name}</option>
      )}
    </select>
  )
});

const DiaryList = ({ diaryList }) => {
  const nevigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) < 3;
      }
      else {
        return parseInt(item.emotion) >= 3;
      }
    }
    
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date);
      }
      else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList = filter === 'all' ? copyList : copyList.filter((item)=> filterCallBack(item));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  }

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <Buttons type={'positive'} text={'새 일기 작성하기'} onClick={() => nevigate('/new')} /> 
        </div>
      </div>
      {getProcessedDiaryList().map((item) => 
        <DiaryItem key={item.id} {...item}/>
      )}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;