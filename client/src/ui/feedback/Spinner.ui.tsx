interface IProps {
  size: string;
  color: string;
}

const Spinner: React.FC<IProps> = ({ color, size = '2rem' }) => {
  return (
    <svg
      className={`animate-spin -ml-1 mr-3 h-[${size}] w-[${size}] text-white`}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25 text-gray-400"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={`opacity-85 text-${color}`}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Spinner;
