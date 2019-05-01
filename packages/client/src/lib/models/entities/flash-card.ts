import {
  DodayBase,
  SerializedDodayBase,
  APIResponseDodayBase,
  GraphQLResponseDodayBase,
  ProgressBase,
} from './common';

export interface FlashCard extends DodayBase {
  /** Front side content of the card */
  front: string;
  /** Back side content of the card */
  back: string;
}

export interface SerializedFlashCard extends SerializedDodayBase {
  front: string;
  back: string;
}

export interface APIResponseFlashCard extends APIResponseDodayBase {
  front: string;
  back: string;
}

export interface GraphQLResponseFlashCard extends GraphQLResponseDodayBase {
  front: string;
  back: string;
}

export interface FlashCardProgress extends ProgressBase {}
