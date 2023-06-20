import { Tasklist } from "./tasklist";

export interface List {
  id: number,
  name: string,
  task: Tasklist[],
}
