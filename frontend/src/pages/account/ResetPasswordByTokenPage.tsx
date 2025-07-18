import { useParams } from "react-router-dom";

export default function ResetPasswordByTokenPage() {
  const { token } = useParams();

  return (
    <div>
      <h1>Reset Your Password</h1>
      <p>Your reset token: {token}</p>
      {/* Add form for new password here */}
    </div>
  );
}
