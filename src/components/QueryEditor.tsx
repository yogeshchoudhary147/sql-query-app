import React from "react";

interface QueryEditorProps {
  query: string;
  onChange: (query: string) => void;
  onExecute: () => void;
}

const QueryEditor: React.FC<QueryEditorProps> = ({
  query,
  onChange,
  onExecute,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <textarea
        value={query}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        placeholder="Write your SQL query here..."
      ></textarea>
      <button
        onClick={onExecute}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Execute Query
      </button>
    </div>
  );
};

export default QueryEditor;
