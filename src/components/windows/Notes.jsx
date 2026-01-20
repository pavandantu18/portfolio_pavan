import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';
import MacWindow from "./MacWindow";
import { docco, atomOneDark,nnfxDark,atomOneDarkReasonable,qtcreatorDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "./Notes.scss"

const SkillsMarkdown = ({windowName, setwindowState}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/notes.txt")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Failed to load markdown", err));
  }, []);

  return (
    <div className="skills-markdown">
        <MacWindow windowName={windowName} setwindowState={setwindowState}>
            <div className="note-window">
                {content ? 
                <SyntaxHighlighter language="javascript" style={atomOneDark}>
                    {content}
                </SyntaxHighlighter> : <p>Loading...</p>}
            </div>
      </MacWindow>
    </div>
  );
};

export default SkillsMarkdown;
