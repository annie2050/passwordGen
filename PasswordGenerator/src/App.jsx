import { useState, useCallback, useEffect } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+{}[]?/\\|~`";

    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-gray-800 text-blue-400 text-center text-3xl py-4 font-bold rounded-t-lg">
        Password Generator
      </div>
      
      <div className="bg-gray-800 p-6 rounded-b-lg shadow-lg">
        <div className="relative">
          <input
            value={password}
            type="text"
            readOnly
            className="w-full p-2 mb-4 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Copy
          </button>
        </div>

        <button 
          onClick={generatePassword}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate New Password
        </button>

        <div className="mt-6">
          <label className="text-gray-300 block mb-2">
            Length: {length}
          </label>
          <input 
            type="range" 
            min={4} 
            max={24} 
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center mt-4">
          <input
            id="include-numbers"
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded border-gray-600 bg-gray-700"
          />
          <label htmlFor="include-numbers" className="text-gray-300 ml-2">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center mt-4">
          <input
            id="include-symbols"
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded border-gray-600 bg-gray-700"
          />
          <label htmlFor="include-symbols" className="text-gray-300 ml-2">
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;