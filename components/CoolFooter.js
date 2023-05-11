import { useMode } from '../context/ModeContext';

export default function CoolFooter() {
  const { mode, toggleMode } = useMode();

  return (
    <footer className='fixed border-t flex space-x-4 justify-center items-center bottom-0 w-full coolfooter bg-theorange'>
      <span>Deep Work</span>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          value=''
          onChange={toggleMode}
          className='sr-only peer'
          checked={mode === 'play'}
          readOnly
        />
        <div className="border-black border-2 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'></span>
      </label>
      <span>Play</span>
    </footer>
  );
}
