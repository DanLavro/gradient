import { useState, useMemo } from 'react';

function randomHexColor() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
  );
}

const hexValueRegex = /^#([0-9A-F]{3}){1,2}$/i;
function isValidHex(value) {
  return hexValueRegex.test(value);
}

function App() {
  const [colors, setColors] = useState(() => ({
    firstColor: randomHexColor(),
    secondColor: randomHexColor(),
  }));

  const isValidColors = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(colors).map(([colorNumber, hexValue]) => [
          colorNumber,
          isValidHex(hexValue),
        ])
      ),
    [colors]
  );

  const [finalColors, setFinalColors] = useState(Object.values(colors));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalColors([colors.firstColor, colors.secondColor]);
  };

  const clearInput = () => {
    setColors(
      Object.fromEntries(
        Object.entries(colors).map(([colorNumber, hexValue]) => [
          colorNumber,
          '',
        ])
      )
    );
  };

  const changeInput = (e) => {
    setColors((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {Object.keys(colors).map((colorNumber) => (
          <input
            className={`${
              isValidColors[colorNumber] ? 'valid_input' : 'invalid_input'
            }`}
            value={colors[colorNumber]}
            onChange={changeInput}
            placeholder={colorNumber}
            name={colorNumber}
          />
        ))}
        <button type="submit">go</button>
        <button type="button" onClick={clearInput}>
          clear
        </button>
      </form>

      <div
        className="gradient"
        style={{
          backgroundImage: `linear-gradient(${finalColors[0]}, ${finalColors[1]})`,
        }}
      ></div>
    </div>
  );
}

export default App;
