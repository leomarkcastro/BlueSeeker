export class Article {

  constructor(readonly title: string,
              readonly header: string,
              readonly description: string,
              readonly type: string,
              readonly location: string,
              readonly posted_by: string,
              readonly posted_date: string,
              readonly payment: Payment,
              readonly todo: string[],
              ) {
  }
}

class Payment{
  constructor(
    readonly rate: string,
    readonly extra: string[]
  ){

  }
}