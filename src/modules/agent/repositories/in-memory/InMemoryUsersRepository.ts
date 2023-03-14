import { IAgent } from "@modules/agent/entities/IAgent";
import { IUpdateAgentDTO } from "@modules/agent/useCases/updateAgent/IUpdateAgentDTO";
import { encryptPwd } from "@helpers/password.helper";

import { ICreateAgentDTO } from "../../useCases/createAgent/ICreateAgentDTO";
import { IAgentRepository } from "../IAgentRepository";

export class InMemoryAgentRepository implements IAgentRepository {
  private agents: IAgent[] = [];

  async findByLogin(login: string, select = ""): Promise<IAgent | undefined> {
    const agent = this.agents.find((agent) => agent.login === login);

    if (!agent) return undefined;

    const filter = select.split(" ");
    filter.forEach((field) => {
      delete agent[field];
    });

    return agent;
  }

  async findById(agent_id: string, select = ""): Promise<IAgent | undefined> {
    const agent = this.agents.find((agent) => agent.id === agent_id);

    if (!agent) return undefined;

    const filter = select.split(" ");
    filter.forEach((field) => {
      delete agent[field];
    });

    return agent;
  }

  async findAll(): Promise<IAgent[]> {
    return this.agents;
  }

  async create(data: ICreateAgentDTO): Promise<IAgent> {
    const agent = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date(),
    };

    const dataToPush = {
      ...agent,
      toObject: () => agent,
    };

    this.agents.push(dataToPush);

    return dataToPush;
  }

  private recursivelyUpdateAgent(
    dataDb: { [key: string]: any },
    data: { [key: string]: any }
  ) {
    if (!data) return dataDb;

    let updatedData = {};

    Object.entries(dataDb).forEach(([key, value]) => {
      if (typeof value !== "object") {
        updatedData[key] = data[key] ? data[key] : value;
      } else {
        updatedData[key] = this.recursivelyUpdateAgent(dataDb[key], data[key]);
      }
    });

    return updatedData;
  }

  async update(
    agent_id: string,
    data: IUpdateAgentDTO = {},
    select = ""
  ): Promise<IAgent> {
    if (data.password) {
      data.password = await encryptPwd(data.password);
    }

    this.agents = this.agents.map((agent) => {
      if (agent.id === agent_id) {
        return this.recursivelyUpdateAgent(agent, data) as IAgent;
      }

      return agent;
    });
    const agent = this.agents.find((agent) => agent.id === agent_id);

    if (!agent) return null;

    const filter = select.split(" ");
    filter.forEach((field) => {
      delete agent[field];
    });

    return agent;
  }

  async deleteById(agent_id: string): Promise<string> {
    this.agents = this.agents.filter((agent) => agent.id !== agent_id);
    return "Ok";
  }

  async deleteByLogin(login: string): Promise<string> {
    this.agents = this.agents.filter((agent) => agent.login !== login);
    return "Ok";
  }
}
