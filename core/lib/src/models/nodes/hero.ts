import { Doday, DeserializedDoday } from './doday';

/**
 * Type of node that represents a person in the app
 */
export class Hero extends Doday {
  name?: string;
  picture?: string;
  email?: string;
  static serialize(node: DeserializedHero): Hero {
    const serialized = Doday.serialize(node);
    return serialized;
  }
  static deserialize(node: Hero): DeserializedHero {
    const deserialized = Doday.deserialize(node);
    return deserialized;
  }
}

export class DeserializedHero extends DeserializedDoday {
  name?: string;
  picture?: string;
  email?: string;
}
