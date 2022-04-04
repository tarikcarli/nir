/**
 * @type {(
 *  first:{
 *      onClick?:React.MouseEventHandler<HTMLButtonElement>,
 *      disabled?:boolean,
 *      type?:"button" | "submit" | "reset"
 *      text:string,
 *      className?:string
 *  }) => JSX.Element}
 * */
export default function Button({ onClick, type = "button", disabled = false, text, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`px-2 py-1 border text-gray-200 bg-gray-800 hover:bg-gray-600 hover:scale-95 rounded-md ${className}`}
    >
      {text}
    </button>
  );
}
