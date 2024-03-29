"use client";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

import React, { useEffect, useState } from "react";
export default function Home() {
  const [todo, setTodo] = useState([]);

  return (
    <div className="bg-white min-h-full">
      <Header />
      <TodoList setData={setTodo} Data={todo} />
    </div>
  );
}
