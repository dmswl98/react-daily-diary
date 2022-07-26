import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>Welcome</h2>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
