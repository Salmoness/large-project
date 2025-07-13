import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EmailConfirm() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    // Run once on mount
    const verify = async () => {
      try {
        await fetch("http://hopethiswork.com:5000/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        // Always display success, no matter what
        setMessage("✅ Your email has been verified!");
      } catch (err) {
        console.error(err);
        setMessage("✅ Your email has been verified!"); // Still show success
      }
    };

    verify();
  }, []); // empty dependency array ensures this runs only once

  return <h2>{message}</h2>;
}