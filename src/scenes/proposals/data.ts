import { ImageSourcePropType } from "react-native";

export class Article {

  constructor(readonly title: string,
              readonly description: string,
              readonly content: string,
              readonly date: string,
              readonly author: Profile) {
  }

  static howToEatHealthy(): Article {
    return new Article(
      'How To Eat Healthy',
      '10 useful Tips',
      'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
      '19 Sep, 2018',
      Profile.markVolter()
    );
  }

  static whyWorkoutImportant(): Article {
    return new Article(
      'Why Is The Workout Important?',
      'Some Tips',
      'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
      '19 Sep, 2018',
      Profile.hubertFranck()
    );
  }

  static morningWorkouts(): Article {
    return new Article(
      '5 Rules Of Morning Workouts',
      '5 Useful Exercises',
      'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
      '19 Sep, 2018',
      Profile.markVolter()
    );
  }
}

export class Profile {

  constructor(readonly firstName: string,
              readonly lastName: string) {
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static markVolter(): Profile {
    return new Profile(
      'Mark',
      'Volter',
    );
  }

  static hubertFranck(): Profile {
    return new Profile(
      'Hubert',
      'Franck',
    );
  }
}

