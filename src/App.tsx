import { Route, Routes } from "react-router-dom";
import { WalletLogin } from "./components";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Main</div>} />
      <Route path="/login" element={<WalletLogin />} />
    </Routes>
  );
};

export default App;
