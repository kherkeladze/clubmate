import { describe, expect, test } from '@jest/globals'
import { ClubMate } from '../index'
const clubMate = new ClubMate(process.env.OPENAI_API_KEY)

type Book = {
  name: string
  author: string
  releaseYear: string
  isbn: string
}

type Country = {
  name: string
  countryCode: string
  callingCode: string
}

describe('Primitive types tests', () => {
  test('Get percentage', async () => {
    const answer: number = await clubMate.produce('What percentage is 6 of 40 as number?')
    expect(answer).toBe(15)
  }, 999999)

  test('Get capital', async () => {
    const capitalOfGermany: string = await clubMate.produce('Capital of Germany?')
    expect(capitalOfGermany).toBe('Berlin')
  }, 999999)

  test('Boolean check', async () => {
    const isLeapYear: boolean = await clubMate.produce('Is the Earth flat?')
    expect(isLeapYear).toBe(false)
  }, 999999)
})

describe('Data producer tests', () => {
  test('Get harry potter books', async () => {
    const hpBooks: Book[] = await clubMate.produce(
      'Generate array of objects of all Harry Potter books with name, author, releaseYear and isbn number fields'
    )
    expect(hpBooks.length).toBe(7)

    const firstBook = hpBooks.find(x => x.name === 'Harry Potter and the Philosopher\'s Stone')

    expect(firstBook).toBeDefined()
    expect(firstBook?.author).toBe('J.K. Rowling')
    expect(firstBook?.releaseYear).toBe(1997)
    expect(firstBook?.isbn).toBe('9780747532743')
  }, 999999)

  test('Get EU countries data', async() => {
    const countries: Country[] = await clubMate.produce('Generate array of objects of EU countries with name, countryCode and callingCode')

    const germany = countries.find(x => x.name === 'Germany')
    expect(germany).toBeDefined()
    expect(germany?.countryCode).toBe('DE')
    expect(germany?.callingCode).toBe('+49')
  }, 999999)

  test('Get Country details', async() => {
    type Country = {
      name: string
      code: string
      emojiFlag: string
    }
    const georgia: Country = await clubMate.produce(
      'Return a new object Of Goergian republic with name, code and emojiFlag attributes'
    )
    expect(georgia).toBeDefined()
    expect(georgia?.code).toBe('GE')
    expect(georgia?.emojiFlag).toBe('🇬🇪')
  }, 999999)
})

describe('For Existing data tests', () => {
  test('Get book details by book names', async() => {
    const bookNames = ['Don Quixote', 'Never Let Me Go', '1984']
    const booksWithDetails: Book[] = await clubMate.produce(
      'Return array of objects of books with fields: name, releaseYear, author and isbn',
      bookNames
    )
    const donQuixote = booksWithDetails.find(x => x.name ==='Don Quixote')
    expect(donQuixote).toBeDefined()
    expect(donQuixote?.author).toBe('Miguel de Cervantes')
    expect(donQuixote?.releaseYear).toBe(1605)
    expect(donQuixote?.isbn).toBe('9780142437230')
  }, 999999)
})
