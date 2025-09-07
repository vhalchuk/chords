import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8'>
      <div className='flex gap-8 mb-8'>
        <a
          href='https://vite.dev'
          target='_blank'
          className='hover:opacity-80 transition-opacity'
        >
          <img src={viteLogo} className='h-16 w-16' alt='Vite logo' />
        </a>
        <a
          href='https://react.dev'
          target='_blank'
          className='hover:opacity-80 transition-opacity'
        >
          <img
            src={reactLogo}
            className='h-16 w-16 animate-spin'
            alt='React logo'
          />
        </a>
      </div>

      <h1 className='text-4xl font-bold text-gray-800 mb-8'>Chords App</h1>

      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        <button
          onClick={() => setCount(count => count + 1)}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-4 w-full'
        >
          Count is {count}
        </button>

        <p className='text-gray-600 text-center'>
          Edit{' '}
          <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
            src/App.tsx
          </code>{' '}
          and save to test HMR
        </p>
      </div>

      <p className='text-gray-500 text-sm mt-8 text-center'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
