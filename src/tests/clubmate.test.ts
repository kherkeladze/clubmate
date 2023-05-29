import { describe, expect, test } from '@jest/globals'
import { ClubMate } from '../lib'
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

describe('Producer tests', () => {
  test('Get harry potter books', async () => {
    const hpBooks: [Book] = await clubMate.produce(
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
    const countries: [Country] = await clubMate.produce('Generate array of objects of EU countries with name, countryCode and callingCode')

    const germany = countries.find(x => x.name === 'Germany')
    expect(germany).toBeDefined()
    expect(germany?.countryCode).toBe('DE')
    expect(germany?.callingCode).toBe('+49')
  }, 999999)

  test('Get book details by book names', async() => {
    const bookNames = ['Don Quixote', 'Never Let Me Go', '1984']
    const booksWithDetails: [Book] = await clubMate.produce(
      'Return array of objects of books and add following fields: name, releaseYear, author and isbn',
      bookNames
    )
    const donQuixote = booksWithDetails.find(x => x.name ==='Don Quixote')
    expect(donQuixote).toBeDefined()
    expect(donQuixote?.author).toBe('Miguel de Cervantes')
    expect(donQuixote?.releaseYear).toBe(1605)
    expect(donQuixote?.isbn).toBe('9780142437230')
  }, 999999)

  test('Get book name translations', async() => {
    type Translations = {
      French: string
      German: string
      Ukrainian: string
    }
    const movieTranslations: Translations = await clubMate.produce(
      'Create a new object with keys as the languages (French, German, Ukrainian) and their respective translated movie names for "The Girl with the Dragon Tattoo.'
    )
    expect(movieTranslations).toBeDefined()
    expect(movieTranslations?.German).toBe('Verblendung')
  }, 999999)
})
