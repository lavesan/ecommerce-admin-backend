import { encryptPwd } from "helpers/password";
import { Model } from "mongoose";

import { Agent } from "../entities/Agent";
import { IAgent } from "../entities/IAgent";
import { ICreateAgentDTO } from "../useCases/createAgent/ICreateAgentDTO";
import { IAgentRepository as IAgentRepository } from "./IAgentRepository";

export class AgentRepository implements IAgentRepository {
  private repository: Model<IAgent>;

  constructor() {
    this.repository = Agent;
  }

  async findById(agent_id: string): Promise<IAgent | undefined> {
    const agent = await this.repository.findById(agent_id);
    delete agent.password;
    return agent;
  }

  async findByLogin(login: string): Promise<IAgent | undefined> {
    const agent = await this.repository.findOne({ login });
    if (agent) delete agent.password;
    return agent;
  }

  async findAll(): Promise<IAgent[]> {
    const data = await this.repository.find();
    data.map((agent) => {
      delete agent.password;
      return agent;
    });

    return data;
  }

  async create(body: ICreateAgentDTO): Promise<IAgent> {
    if (body.password) {
      body.password = await encryptPwd(body.password);
    }

    const agent = await this.repository.create(body);

    delete agent.password;
    return agent;
  }

  async update(agent_id: string, body: ICreateAgentDTO): Promise<IAgent> {
    if (body.password) {
      body.password = await encryptPwd(body.password);
    }

    const data = await this.repository.findByIdAndUpdate(agent_id, body);

    delete data.password;

    return data;
  }

  async delete(agent_id: string): Promise<string> {
    await this.repository.findByIdAndDelete(agent_id);
    return "Ok";
  }

  async deleteByLogin(login: string): Promise<string> {
    await this.repository.deleteOne({ login });
    return "Ok";
  }
}
