import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Daily Diary - ${parseInt(id) + 1}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length < 1) return;
    const target = diaryList.find((item) => item.id === parseInt(id));
    console.log(target);
    if (target) {
      setOriginData(target);
    } else {
      navigate("/", { replace: true });
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
