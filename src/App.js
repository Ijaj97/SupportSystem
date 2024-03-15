import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";


function App() {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;

// Insted of "npm start" use this command to start 2 severs at a time.
// Note : This command is only for this project
// npm run start:dev 
