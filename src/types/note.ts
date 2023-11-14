export type CategoryType =
  | "Goal Evidence"
  | "Support Coordination"
  | "Active Duty";

export type NoteType = {
  id: string;
  content: string;
  client: string;
  category: CategoryType;
};
