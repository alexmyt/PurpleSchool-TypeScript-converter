import inquirer, { QuestionCollection } from 'inquirer';
import { PromptType } from './prompt.types';

export class PromptService {
  public async input<T>(message: string, type: PromptType, options?: Partial<QuestionCollection>) {
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        ...options,
        type,
        name: 'result',
        message,
      }
    ]);

    return result;
  }
}
