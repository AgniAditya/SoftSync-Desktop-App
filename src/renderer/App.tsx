import softsyncLogo from './assets/logo.png'
import './App.css'

function App() {

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
        option.value = model.name.toLowerCase();
        option.textContent = model.name;
        select.appendChild(option);
      });
    }
  }

  loadModels();


  return (
    <>
      <div>
        <img src={softsyncLogo} className="logo softsync" alt="SoftSync logo" />
      </div>
      <h1 >SoftSync - Automate your work</h1>
      <div className='input-area'>
        <input className='prompt' placeholder='Type Here'></input>
        <select id='llms'>
          <option value="default" disabled selected hidden>Select a model</option>
        </select>
      </div>
    </>
  )
}

export default App
