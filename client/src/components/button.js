/** 
 * @type {(
 *  first:{
 *      onClick:React.MouseEventHandler<HTMLButtonElement>,
 *      text:string,
 *      className?:string
 *  }) => JSX.Element} 
 * */
export default function Button({ onClick, text, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 border text-gray-200 bg-gray-800 hover:bg-gray-600 hover:scale-95 rounded-md ${className}`}
    >
      {text}
    </button>
  );
}
