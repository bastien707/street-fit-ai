import Head from 'next/head';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState('');
  const [level, setLevel] = useState('beginner');
  const [equipment, setEquipment] = useState('');
  const [goals, setGoals] = useState('');

  const onLevelChanged = (event) => {
    setLevel(event.target.value);
  }

  const onEquipmentChanged = (event) => {
    setEquipment(event.target.value);
  }

  const onGoalsChanged = (event) => {
    setGoals(event.target.value);
  }

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log('Calling OPENAI API...');
    // NextJS automatically creates this route for us based on the file name

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({level, equipment, goals}),
      });
      const data = await response.json();
      const {output} = data;
      setApiOutput(`${output.text}`);
      setIsGenerating(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="root">
      <Head>
        <title>StreetFit</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1 className="enhanced-title">Elevate Your Fitness Game</h1>
            <h1> with Our AI-Driven Street Workout Plans</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter Your Goals and Preferences to Get a Customized Street Workout Plan Tailored Just for You 🫵</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <label>Select your current Level</label>
          <select name="level" id="level" onChange={onLevelChanged}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <label>Describe what equipment you have</label>
          <textarea 
            placeholder='eg: pull up bar, dip station, etc'
            className='prompt-box'
            value={equipment}
            onChange={onEquipmentChanged}/>
          <label>Describe your goals</label>
          <textarea 
            placeholder='eg: build muscle, lose weight, etc'
            className='prompt-box'
            value={goals}
            onChange={onGoalsChanged}/>
        </div>
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your workout 👇</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Home;