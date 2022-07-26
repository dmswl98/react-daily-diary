import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Daily Diary - ${curDate.getMonth() + 1}월 일기`;
  }, [curDate])

  useEffect(() => {
    if (diaryList.length < 1) return;
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    setData(diaryList.filter((item) => item.date >= firstDay && item.date <= lastDay));
  }, [diaryList, curDate]);

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  }

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  }

  return (
    <>
      <Header headText={headText}
        leftChild={<Buttons text={"<"} onClick={decreaseMonth} />}
        rightChild={<Buttons text={">"} onClick={increaseMonth}/>}
      />
      <DiaryList diaryList={data}/>
    </>
  )
}

export default Home;