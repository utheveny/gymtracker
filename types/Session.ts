import { Exercice } from './Exercice';

export interface Session {
  name: string;
  exercises: Exercice[];
}