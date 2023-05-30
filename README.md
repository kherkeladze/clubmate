# ClubMate


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![npm](https://img.shields.io/npm/v/clubmate)](https://www.npmjs.com/package/clubmate)
[![ci](https://github.com/kherkeladze/clubmate/actions/workflows/main.yml/badge.svg)](https://github.com/kherkeladze/clubmate/actions/workflows/main.yml/badge.svg)


<img src="logo.png" alt="clubmate" height="200px">

ClubMate is a JavaScript library that enhances JavaScript projects with generative artificial intelligence capabilities.

<hr>

## Installation

```bash
npm install clubmate --save
```

## Usage

Import library and initialize client:
```typescript
import { ClubMate } from 'clubmate'

const clubMate = new ClubMate(process.env.OPENAI_API_KEY)
```

For primitive data types:
```typescript
const percentage: number = await clubMate.produce('What percentage is 6 of 40 as number?')
console.log(percentage) // => 15

const capitalOfGermany: string = await clubMate.produce('Capital of Germany?')
console.log(capitalOfGermany) // => 'Berlin'

const isEarthFlat: boolean = await clubMate.produce('Is the Earth flat?')
console.log(isEarthFlat) // => false
```

Data producers:
```typescript
type Book = {
  name: string
  author: string
  releaseYear: string
  isbn: string
}

const hpBooks: Book[] = await clubMate.produce(
  'Generate array of objects of all Harry Potter books with name, author, releaseYear and isbn number fields'
)

console.log(hpBooks) // => 
[
  {
      name: "Harry Potter and the Philosopher`s Stone",   
      author: "J.K. Rowling",
      releaseYear: 1997,
      isbn: "9780747532743"
  }, 
  {
      name: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      releaseYear: 1999,
      isbn: "9780747542155"
      
  }
  // ...
]
```

For existing data:
```typescript
const bookNames = ['Don Quixote', 'Never Let Me Go', '1984']
const booksWithDetails = await clubMate.produce(
  'Return array of objects of books with fields: name, releaseYear, author and isbn',
  bookNames
)
console.log(booksWithDetails) // =>
[
  {
    "name": "Don Quixote",
    "releaseYear": 1605,
    "author": "Miguel de Cervantes",
    "isbn": "9780142437230"
  },
    {
      "name": "Never Let Me Go",
      "releaseYear": 2005,
      "author": "Kazuo Ishiguro",
      "isbn": "9781400078776"
    },
    {
      "name": "1984",
      "releaseYear": 1949,
      "author": "George Orwell",
      "isbn": "9780451524935"
    }
]
```

Check [tests](https://github.com/kherkeladze/clubmate/tree/main/src/tests) for more examples.
