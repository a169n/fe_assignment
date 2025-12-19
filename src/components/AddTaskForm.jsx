import React, { useState } from "react";
import Button from "./ui/Button";
import Panel from "./ui/Panel";

const AddTaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <Panel style={{ marginTop: "12px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New learning outcome"
            style={{
              flex: 1,
              background: "#0b1224",
              color: "#e5e7eb",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "12px",
              fontSize: "15px",
            }}
          />
          <Button type="submit" style={{ padding: "12px 18px" }}>
            Add Task
          </Button>
        </div>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add context about the student signal or twin alignment"
          rows={3}
          style={{
            width: "100%",
            background: "#0b1224",
            color: "#e5e7eb",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "12px",
            fontSize: "14px",
            resize: "vertical",
          }}
        />
      </form>
    </Panel>
  );
};

export default AddTaskForm;
