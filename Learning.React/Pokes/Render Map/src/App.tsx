import { useState } from 'react'

function App() {
  const [map, setMap] = useState(new Map<number, string>([
    [1, 'One'],
    [2, 'Two'],
    [3, 'Three']
  ]));
  const [key, setKey] = useState(0)
  const [value, setValue] = useState('')

  const updateMap = () => setMap(new Map([...map.set(key, value)]));
  const removeInMap = () => {
    const newMap = new Map([...map]);
    newMap.delete(key)
    setMap(newMap)
  }

  return (
    <div>
      Key: <input type='number' value={key} onChange={e => setKey(parseInt(e.target.value))}/>
      {' Value: '} <input value={value} onChange={e => setValue(e.target.value)}/>

      <button onClick={updateMap}>Update Map</button>
      <button onClick={removeInMap}>Remove in Map</button>
      <ul>
        {[...map].map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
