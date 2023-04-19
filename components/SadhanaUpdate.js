const SadhanaUpdate = ({ update }) => {
  if (!update) return null;

  return (
    <div className='bg-gray-100 p-4 rounded-md'>
      <h3 className='text-lg font-semibold'>Today&apos;s update:</h3>
      <p className='mt-2'>{update.content}</p>
    </div>
  );
};

export default SadhanaUpdate;
