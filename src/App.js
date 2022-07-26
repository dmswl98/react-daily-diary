import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import { createContext, useEffect, useReducer, useRef } from 'react';

export const INIT = 'INIT';
export const CREATE = 'CREATE';
export const REMOVE = 'REMOVE';
export const EDIT = 'EDIT';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case INIT: {
      return action.data;
    }
    case CREATE: {
      newState = [action.data, ...state];
      break;
    }
    case REMOVE: {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    } 
    case EDIT: {
      newState = state.map((item) => item.id === action.data.id ? { ...action.data } : item);
      break;
    }
    default: 
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState; // data 상태에 newState 값 저장
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if(localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      if(diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({type: INIT, data: diaryList});
      }
      // dataId.current = !isNaN(parseInt(diaryList[0]?.id)) ? parseInt(diaryList[0].id) + 1 : 0
      // console.log(dataId.current);
    }
  }, [])

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: CREATE,
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    dataId.current++;
  }

  const onRemove = (targetId) => {
    dispatch({
      type: REMOVE,
      targetId
    })
  }

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: EDIT,
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

// <BrowserRouter>
//       <div className="App">
//         <Header headText={"다이어리"} leftChild={
//           <Buttons text={"뒤로가기"} onClick={() => console.log('뒤로가기')} />  
//         }
//           rightChild={
//         <Buttons text={"저장하기"} onClick={() => console.log('저장하기')} type={"positive"}/>    
//           }
//         />
//         <h2>Welcome</h2>
//         <Buttons text={"저장하기"} onClick={() => console.log('저장하기')} type={"positive"}/>
//         <Buttons text={"수정하기"} onClick={() => console.log('수정하기')} />
//         <Buttons text={"삭제하기"} onClick={() => console.log('삭제하기')} type={"negative"}/>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/diary/:id" element={<Diary />} />
//           <Route path="/new" element={<New />} />
//           <Route path="/edit" element={<Edit />} />
//         </Routes>
//         <RouteTest />
//       </div>
//     </BrowserRouter>