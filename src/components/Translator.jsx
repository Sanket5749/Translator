import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [darkMode, setDarkMode] = useState(true);

  const handleTranslate = async () => {
    try {
      const encodedText = encodeURIComponent(text);
      const url = `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodedText}`;
      const res = await axios.get(url);
      setTranslated(res.data.translation);
    } catch (err) {
      console.error('Translation error:', err);
      setTranslated('Translation failed. Try again.');
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-all duration-300`}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Translate to Something Useful</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-md border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <textarea
          rows="4"
          className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-white'} w-full p-3 border rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600`}
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <label className="mb-1">From</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-white'} w-full p-3 border rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600`}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">To</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-white'} w-full p-3 border rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600`}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleTranslate}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Translate
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Translated Text:</h2>
          <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-white'} w-full p-3 border rounded-md mb-4 dark:bg-gray-800 dark:border-gray-600`}>
            {translated}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;