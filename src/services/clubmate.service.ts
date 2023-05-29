import { openAIProvider } from '../providers/openai.provider'
import { ChatCompletionRequestMessage } from 'openai'

export class CLubMate {
  private readonly openAI: openAIProvider
  constructor(openaiAPIKey?: string) {
    this.openAI = new openAIProvider(openaiAPIKey)
  }

  async produce(command: string, data?: object) {
    let message = 'Programming language: Node.JS'

    if (data)
      message = `${message}
    Data: ${JSON.stringify(data)}.`

    message = `${message}
    ${command}.
    Send only stringified JS output and valid JS datatype, no explanation, no code.
    If it's not possible to return valid JS datatype, return only following string = "OPENAI_ERROR".`

    const completionMessage: ChatCompletionRequestMessage = {
      role: 'user',
      content: message
    }
    const response = await this.openAI.sendCompletionMessage(completionMessage)
    const output = response?.message?.content

    if (!output || output.includes('OPENAI_ERROR')) {
      throw new Error('OpenAI error, check your command and data')
    }
    return this.processOutput(output)
  }

  private processOutput(output: string) {
    // For objects
    try {
      return eval(JSON.parse(output))
    } catch (e) { /* empty */ }

    // For other DataTypes
    try {
      return eval(output)
    } catch (e) {
      return output
    }
  }
}
