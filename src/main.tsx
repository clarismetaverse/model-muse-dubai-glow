
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the page title dynamically
document.title = "Modelrater";

createRoot(document.getElementById("root")!).render(<App />);
