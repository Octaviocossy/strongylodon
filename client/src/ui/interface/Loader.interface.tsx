import { Spinner } from '..';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner styles={'h-[2rem], w-[2rem]'} />
    </div>
  );
};

export default Loader;
