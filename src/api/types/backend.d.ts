export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<PostType>;
};

export type KeywordType = {
  __typename?: 'KeywordType';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<PostType>;
};

export type PostType = {
  __typename?: 'PostType';
  category: CategoryType;
  dateModified: Scalars['DateTime'];
  datePublished: Scalars['DateTime'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  keywords: Array<KeywordType>;
  name: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  categoryDetail?: Maybe<CategoryType>;
  categoryList?: Maybe<Array<Maybe<CategoryType>>>;
  hello?: Maybe<Scalars['String']>;
  keywordDetail?: Maybe<KeywordType>;
  keywordList?: Maybe<Array<Maybe<KeywordType>>>;
  postDetail?: Maybe<PostType>;
  postList?: Maybe<Array<Maybe<PostType>>>;
};

export type QueryCategoryDetailArgs = {
  id: Scalars['ID'];
};

export type QueryKeywordDetailArgs = {
  id: Scalars['ID'];
};

export type QueryPostDetailArgs = {
  id: Scalars['ID'];
};

export type QueryPostListArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  keywordId?: InputMaybe<Scalars['ID']>;
};
