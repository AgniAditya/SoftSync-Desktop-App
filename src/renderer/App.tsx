import softsyncLogo from './assets/logo.png'
import './App.css'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    loadModels()
  },[])

  async function loadModels() {
    //@ts-ignore
    const availableLLMs = await window.electron.getAvailableLLMs()
    console.log("Available Models:", availableLLMs);

    const select = document.getElementById("llms");

    if(select){
      // Clear any existing options except the placeholder
      select.innerHTML = '<option value="" disabled selected hidden>Select a model</option>';
  
      // Add new options
      availableLLMs.forEach((model : any) => {
        const option = document.createElement("option");
        option.value = model.id;
        option.textContent = model.name;
        select.appendChild(option);
      });
    }
  }

  async function getChatResponse(prompt : string , selectedModel : HTMLSelectElement) {
    console.log(`Your Request: ${prompt}`)
    //@ts-ignore
    const chatResponse = await window.electron.getChatResponse(prompt,selectedModel.value)
    console.log(`Chat Response:`,chatResponse)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const input = e.currentTarget.value.trim();
      const select = document.getElementById('llms') as HTMLSelectElement | null;

      if (!input || !select || !select.value) {
        console.warn("Missing prompt or selected model");
        return;
      }
      getChatResponse(input, select);
      e.currentTarget.value = ''; // clear input after sending
    }
  }
  // getChatResponse('Hii , I am SoftSync','deepseek/deepseek-chat-v3.1:free')

  return (
    <>
      <div>
        <img src={softsyncLogo} className="logo softsync" alt="SoftSync logo" />
      </div>
      <h1 >SoftSync - Automate your work</h1>
      <div className='input-area'>
        <input className='prompt' placeholder='Type Here' onKeyDown={handleKeyDown}></input>
        <select id='llms' defaultValue="">
          <option value="default" disabled hidden>Select a model</option>
        </select>
      </div>
    </>
  )
}

export default App
