import { useNavigate } from "react-router-dom";
import CreateQuizForm from "../components/CreateQuizForm";

export default function CreatePage() {
  const navigate = useNavigate();

  const handleGenerate = async (topic: string) => {
    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      const questions = JSON.parse(data.questions);
      const summary = JSON.parse(data.summary);

      navigate("/preview", {
        state: { questions, summary },
      });
    } catch (err) {
      alert("Something went wrong generating the quiz.");
    }
  };

  return <CreateQuizForm onGenerate={handleGenerate} />;
}
