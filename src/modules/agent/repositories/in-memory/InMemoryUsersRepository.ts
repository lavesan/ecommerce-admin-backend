import { Agent } from "@modules/agent/entities/Agent";
import { IUpdateAgentDTO } from "@modules/agent/useCases/updateAgent/IUpdateAgentDTO";
import { encryptPwd } from "helpers/password";

import { ICreateAgentDTO } from "../../useCases/createAgent/ICreateAgentDTO";
import { IAgentRepository } from "../IAgentRepository";

export class InMemoryAgentRepository implements IAgentRepository {
  private agents: Agent[] = [];

  async findByLogin(login: string): Promise<Agent | undefined> {
    return this.agents.find((agent) => agent.login === login);
  }

  async findById(agent_id: string): Promise<Agent | undefined> {
    return this.agents.find((agent) => agent.id.toString() === agent_id);
  }

  async findAll(): Promise<Agent[]> {
    return this.agents;
  }

  async create(data: ICreateAgentDTO): Promise<Agent> {
    const agent = new Agent();
    Object.assign(agent, data);
    this.agents.push(agent);
    return agent;
  }

  async update(agent_id: string, data: IUpdateAgentDTO): Promise<Agent> {
    if (data.password) {
      data.password = await encryptPwd(data.password);
    }

    this.agents = this.agents.map((agent) => {
      if (agent.id.toString() === agent_id)
        return {
          ...agent,
          ...data,
        };
    });
    return this.agents.find((agent) => agent.id.toString() === agent_id);
  }

  async delete(agent_id: string): Promise<string> {
    this.agents = this.agents.filter(
      (agent) => agent.id.toString() !== agent_id
    );
    return "Ok";
  }

  async deleteByLogin(login: string): Promise<string> {
    this.agents = this.agents.filter((agent) => agent.login !== login);
    return "Ok";
  }
}
