export type languages = "Javascipt" | "Java" | "C##" | "";

export interface Tab {
  name: string;
  id: string;
  active: boolean;
}

export interface Question {
  id: number;
  name: string;
  question: string;
  favourite?: boolean;
  newQuestion?: boolean;
}

type Remove_Id_Favourite<T> = {
  [Property in keyof T as Exclude<Property, "id" | "favourite">]:
    | T[Property]
    | "";
};

export type QuestionSubmission = Remove_Id_Favourite<Question>;
