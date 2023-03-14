import { encryptPwd } from "helpers/password.helper";
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

  async findById(agent_id: string, select = ""): Promise<IAgent | undefined> {
    const agent = await this.repository.findById(agent_id).select(select);
    return agent;
  }

  async findByLogin(login: string, select = ""): Promise<IAgent | undefined> {
    const agent = await this.repository.findOne({ login }).select(select);
    return agent;
  }

  async findAll(select = ""): Promise<IAgent[]> {
    const data = await this.repository.find().select(select);

    return data;
  }

  async create(body: ICreateAgentDTO): Promise<IAgent> {
    if (body.password) {
      body.password = await encryptPwd(body.password);
    }

    const agent = await this.repository.create(body);
    return agent;
  }

  async update(
    agent_id: string,
    body: ICreateAgentDTO,
    select = ""
  ): Promise<IAgent> {
    if (body.password) {
      body.password = await encryptPwd(body.password);
    }

    return this.findById(agent_id, select);
  }

  async deleteById(agent_id: string): Promise<string> {
    await this.repository.findByIdAndDelete(agent_id);
    return "Ok";
  }

  async deleteByLogin(login: string): Promise<string> {
    await this.repository.deleteOne({ login });
    return "Ok";
  }
}
