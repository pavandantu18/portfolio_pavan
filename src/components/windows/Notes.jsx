import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';
import MacWindow from "./MacWindow";
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "./Notes.scss"

const SkillsMarkdown = ({windowName, setwindowState}) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/notes.txt")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load notes: ${res.status} ${res.statusText}`);
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load markdown", err);
        setError(err.message || "Failed to load notes. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="skills-markdown">
        <MacWindow windowName={windowName} setwindowState={setwindowState}>
            <div className="note-window">
                {error ? (
                  <div className="error-message" style={{ color: "#ff6b6b", padding: "20px" }}>
                    <p>⚠️ {error}</p>
                  </div>
                ) : loading ? (
                  <p style={{ padding: "20px" }}>Loading...</p>
                ) : content ? (
                  <SyntaxHighlighter language="javascript" style={atomOneDark}>
                    {content}
                  </SyntaxHighlighter>
                ) : (
                  <p style={{ padding: "20px" }}>No content available</p>
                )}
            </div>
      </MacWindow>
    </div>
  );
};

export default SkillsMarkdown;
