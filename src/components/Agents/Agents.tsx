import type { FC } from "react";
import React, { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./Agents.css";

const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [search, setSearch] = useState<string>("");

  // Fetch initial data
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await axios.get("/agents");
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    }
    fetchInitialData();
  }, []);

  // Filtered agents based on the search term
  const filteredAgents = agents.filter((agent) => {
    const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
    const practiceAreas = Array.isArray(agent.practiceAreas)
      ? agent.practiceAreas.join(" ").toLowerCase()
      : "";
    const searchTerm = search.toLowerCase();

    return fullName.includes(searchTerm) || practiceAreas.includes(searchTerm);
  });
  return (
    <div>
      <div>
        <Navbar search={search} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-4 gap-8 mt-12 ">
        {filteredAgents.map((agent) => (
          <Agent key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default Agents;
