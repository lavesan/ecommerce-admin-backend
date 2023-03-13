import { encryptPwd } from "helpers/password";
import { Repository } from "typeorm";
import AppDataSource from "../../../ormconfig";

import { Agent } from "../entities/Agent";
import { ICreateAgentDTO } from "../useCases/createAgent/ICreateAgentDTO";
import { IAgentRepository as IAgentRepository } from "./IAgentRepository";

export class AgentRepository implements IAgentRepository {
  private repository: Repository<Agent>;

  constructor() {
    this.repository = AppDataSource.getRepository(Agent);
  }

  async findById(agent_id: string): Promise<Agent | undefined> {
    const agent = await this.repository.findOne({ where: { id: agent_id } });
    delete agent.password;
    return agent;
  }

  async findByLogin(login: string): Promise<Agent | undefined> {
    const agent = await this.repository.findOne({ where: { login } });
    delete agent.password;
    return agent;
  }

  async findAll(): Promise<Agent[]> {
    const data = await this.repository.find();
    data.map((agent) => {
      delete agent.password;
      return agent;
    });

    return data;
  }

  async create(body: ICreateAgentDTO): Promise<Agent> {
    if (body.password) {
      body.password = await encryptPwd(body.password);
    }

    const agent = this.repository.create(body);

    const savedAgent = await this.repository.save(agent);
    delete savedAgent.password;
    return savedAgent;
  }

  async update(agent_id: string, body: ICreateAgentDTO): Promise<Agent> {
    if (body.password) {
      body.password = await encryptPwd(body.password);
    }

    const data = await this.repository.save({
      id: agent_id,
      ...body,
    });

    delete data.password;

    return data;
  }

  async delete(agent_id: string): Promise<string> {
    await this.repository.delete(agent_id);
    return "Ok";
  }

  async deleteByLogin(login: string): Promise<string> {
    await this.repository.delete({ login });
    return "Ok";
  }
}
