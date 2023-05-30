import { openAIProvider } from '../providers/openai.provider'
import { ChatCompletionRequestMessage } from 'openai'

export class ClubMate {
  private readonly openAI: openAIProvider
  constructor(openaiAPIKey?: string) {
    this.openAI = new openAIProvider(openaiAPIKey)
  }

  async produce(command: string, data?: object) {
    let message = command
    if (data) message += `\nInput: ${JSON.stringify(data)}`

    message += `
    \nOutput: Data as only valid javascript datatype (without type).`

    const completionMessage: ChatCompletionRequestMessage = {
      role: 'system',
      content: message
    }
    const response = await this.openAI.sendCompletionMessage(completionMessage)
    const output = response?.message?.content

    if (!output) {
      throw new Error('OpenAI error, check your command and data')
    }
    return this.processOutput(output)
  }

  private processOutput(output: string) {
    // For Objects and Arrays
    try {
      return JSON.parse(output.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '))
    } catch (e) { /* empty */ }

    // For Primitive Types
    if (output === 'true' || output === 'false') return Boolean(output)
    if (!isNaN(Number(output)) && !isNaN(parseFloat(output))) return Number(output)
    return output
  }
}
