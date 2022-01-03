export type PostMutationInput = {
  name: string;
  text: string;
  category: string | number;
  writtenBy: string | number;
  keywords: string[] | number[];
};
