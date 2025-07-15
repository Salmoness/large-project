import CreateQuizForm from "../components/CreateQuizForm";

export default function CreatePage() {
  const handleGenerate = (topic: string, count: number) => {
    console.log("Generating quiz with topic:", topic, "count:", count);
    // You can route to quiz editing or fetch questions here
  };

  return <CreateQuizForm onGenerate={handleGenerate} />;
}
