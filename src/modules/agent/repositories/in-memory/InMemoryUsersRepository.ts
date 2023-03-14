import { Agent } from "@modules/agent/entities/Agent";
import { IAgent } from "@modules/agent/entities/IAgent";
import { IUpdateAgentDTO } from "@modules/agent/useCases/updateAgent/IUpdateAgentDTO";
import { encryptPwd } from "helpers/password.helper";

import { ICreateAgentDTO } from "../../useCases/createAgent/ICreateAgentDTO";
import { IAgentRepository } from "../IAgentRepository";

export class InMemoryAgentRepository implements IAgentRepository {
  private agents: IAgent[] = [];

  async findByLogin(login: string): Promise<IAgent | undefined> {
    return this.agents.find((agent) => agent.login === login);
  }

  async findById(agent_id: string): Promise<IAgent | undefined> {
    return this.agents.find((agent) => agent.id.toString() === agent_id);
  }

  async findAll(): Promise<IAgent[]> {
    return this.agents;
  }

  async create(data: ICreateAgentDTO): Promise<IAgent> {
    const agent = new Agent();
    Object.assign(agent, data);
    this.agents.push(agent);
    return agent;
  }

  async update(agent_id: string, data: IUpdateAgentDTO): Promise<IAgent> {
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

  async deleteById(agent_id: string): Promise<string> {
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
