'use client'

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { Button, Input } from "@heroui/react";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 drop-shadow-lg">Welcome to <span className="text-blue-500">Tauri</span> + <span className="text-purple-500">React</span></h1>

      <div className="flex flex-row gap-8 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src="/vite.svg" className="w-20 h-20 hover:scale-110 transition-transform duration-200" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noopener noreferrer">
          <img src="/tauri.svg" className="w-20 h-20 hover:scale-110 transition-transform duration-200" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-20 h-20 hover:scale-110 transition-transform duration-200" alt="React logo" />
        </a>
      </div>
      <p className="mb-8 text-gray-600 text-lg">Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="flex flex-row gap-4 items-center mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <Input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
          variant="bordered"
        />
        <Button type="submit">Greet</Button>
      </form>
      <p className="text-xl text-green-600 font-medium min-h-[2rem]">{greetMsg}</p>
    </main>
  );
}

export default App;
