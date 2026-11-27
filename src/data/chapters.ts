export type Chapter = { slug:string; number:string; title:string; subtitle:string; readTime:string; paragraphs:string[] }
export const chapters:Chapter[] = [
  {
    slug:'chapter-one', number:'01', title:'Chapter One', subtitle:'The first page is waiting for its story.', readTime:'— MIN',
    paragraphs:[
      'This is a publishing placeholder, not story text.',
      'The original chapter has not been supplied in this clean rebuild. Replace this paragraph with the author’s actual opening, then add the remaining paragraphs as separate strings in this array.',
      'You can edit this file directly in GitHub on your phone. Each paragraph becomes a separate reading block, and the reader automatically saves progress in the visitor’s browser.'
    ]
  }
]
