export type AuthToken = {
  accessToken: string;
  kind: string;
};
export interface Hero {
  did: string;
  nickname?: string;
  displayName: string;
  google: string;
}

export default Hero;
