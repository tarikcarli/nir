import { useNavigate } from "react-router-dom";
import { paths } from "../utils/paths";
import Button from "./button";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row flex-start bg-gray-300 px-1 py-1">
      <Button
        onClick={() => navigate(user.id ? paths.home : paths.landing)}
        text="NIR"
        className="font-semibold text-lg py-1 px-8 hover:scale-100"
      />
    </div>
  );
}
