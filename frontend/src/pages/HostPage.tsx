import ProjectHeader from "../components/ProjectHeader.tsx";
import CenteredContainer from "../components/CenteredContainer.tsx";

export default function HostPage() {
  return (
    <CenteredContainer>
      <ProjectHeader />
      <h1>Page for browsing, creating, and hosting quizzes</h1>
    </CenteredContainer>
  );
}
