import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { isAxiosError } from 'axios'

export class openAIProvider {
  private readonly client: OpenAIApi
  constructor(apiKey?: string) {
    this.client = new OpenAIApi(
      new Configuration({
        apiKey
      })
    )
  }

  async sendCompletion(prompt: string) {
    try {
      const completion = await this.client.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        prompt
      })
      return completion.data.choices[0]
    } catch (e) {
      if (isAxiosError(e)) throw new Error(e.response?.statusText)
    }
  }

  async sendCompletionMessage(message: ChatCompletionRequestMessage) {
    try {
      const completion = await this.client.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 2048,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: [message]
      })
      return completion.data.choices.pop()
    } catch (e) {
      if (isAxiosError(e)) throw new Error(e.response?.statusText)
    }
  }
}
