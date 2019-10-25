export interface Status {
  loading?: boolean;
  error?: DodayError;
}

export interface DodayError {
  statusCode: string;
  message: string;
}

export class Buyable {
  price!: number;
  static serialize(extension: Buyable): DeserializedBuyable {
    return extension;
  }
  static deserialize(extension: DeserializedBuyable): Buyable {
    return extension;
  }
}

export class DeserializedBuyable {
  price!: number;
}
