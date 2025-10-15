import softsyncLogo from './assets/logo.png'
import './App.css'
import { useEffect , useState , useRef} from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    loadModels()
  },[])
  
  useEffect(() => {
    // Scroll to bottom whenever messages update
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleClick = async () => {
    if(!connected){
      const isConnceted = await window.electron.connectToMCPServer('blender')
      alert(isConnceted.message);
    }
    setConnected(prev => !prev); // toggle state
  };
  async function loadModels() {
    const availableLLMs = await window.electron.getAvailableLLMs()
    if(!availableLLMs.success) console.log("Models not fetched");
    const models = availableLLMs.data
    console.log("Available Models:", models);

    const select = document.getElementById("llms");

    if(select){
      // Clear any existing options except the placeholder
      select.innerHTML = '<option value="" disabled selected hidden>Select a model</option>';
  
      // Add new options
      models.forEach((model : any) => {
        const option = document.createElement("option");
        option.value = model.id;
        option.textContent = model.name;
        select.appendChild(option);
      });

      select.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        setSelectedModel(target.value);
      });
    }
  }

  async function getChatResponse(prompt : string) {
    if (!prompt || !selectedModel) return;
    console.log(`Your Request: ${prompt}`)

    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    
    const chatResponse = await window.electron.getChatResponse(prompt,selectedModel)
    const message = (chatResponse.success) ? chatResponse.data : chatResponse.message
    console.log(`Chat Response:`,message)

    setMessages((prev) => [...prev, { role: 'assistant', content: message }]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const input = e.currentTarget.value.trim();
      getChatResponse(input);
      e.currentTarget.value = ''; // clear input after sending
    }
  }

  return (
    <>
      <div>
        <img src={softsyncLogo} className="logo softsync" alt="SoftSync logo" />
      </div>
      <h1 >SoftSync - Automate your work</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className='input-area'>
        <input className='prompt' placeholder='Type Here' onKeyDown={handleKeyDown}></input>
        <button
        className={`connectMCP ${connected ? 'connected' : ''}`}
        onClick={handleClick}
      >
        {connected ? 'MCP Connected' : 'turn on MCP'}
      </button>
        <select id='llms' defaultValue="">
          <option value="default" disabled hidden>Select a model</option>
        </select>
      </div>
    </>
  )
}

export default App
