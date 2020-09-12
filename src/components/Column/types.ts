import { Card as CardInterface } from "../../types";

export interface ColumnProps {
  id: string;
  title: string;
  cards: CardInterface[];
  currentIndex: number;
}

export interface NewColumnProps {
  onSuccess: (id: string, title: string) => void;
  onDismiss: () => void;
}
