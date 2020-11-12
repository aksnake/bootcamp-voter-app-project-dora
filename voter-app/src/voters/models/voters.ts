import { Item } from "./item";

export type NewVoter = {
  firstName: string;
  lastName: string;
  address : string;
  city : string;
  birthDate : string;
  email : string;
  phone : string;
};

export type Voter = NewVoter & Item;
