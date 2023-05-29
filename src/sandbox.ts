import { CLubMate } from './services'
const clubMate = new CLubMate(process.env.OPENAI_API_KEY)

type Country = {
  name: string
  countryCode: string
  callingCode: string
}
type Book = {
  name: string
  author: string
  releaseYear: string
  isbn: string
}

const run = async() => {
  console.log('here')
}

run()
