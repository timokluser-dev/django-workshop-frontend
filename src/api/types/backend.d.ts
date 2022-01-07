export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<PostType>;
};

export type CreatePost = {
  __typename?: 'CreatePost';
  data?: Maybe<PostType>;
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteJsonWebTokenCookie = {
  __typename?: 'DeleteJSONWebTokenCookie';
  deleted: Scalars['Boolean'];
};

export type KeywordType = {
  __typename?: 'KeywordType';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<PostType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePost>;
  deleteToken?: Maybe<DeleteJsonWebTokenCookie>;
  refreshToken?: Maybe<Refresh>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updatePost?: Maybe<UpdatePost>;
  uploadPostImage?: Maybe<UploadPostImage>;
  verifyToken?: Maybe<Verify>;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  input: PostInput;
};


export type MutationUploadPostImageArgs = {
  id: Scalars['ID'];
  image: Scalars['Upload'];
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type PostInput = {
  categoryId?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
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
  writtenBy?: Maybe<UserType>;
};

export type Query = {
  __typename?: 'Query';
  categoryDetail?: Maybe<CategoryType>;
  categoryList?: Maybe<Array<Maybe<CategoryType>>>;
  hello?: Maybe<Scalars['String']>;
  keywordDetail?: Maybe<KeywordType>;
  keywordList?: Maybe<Array<Maybe<KeywordType>>>;
  me?: Maybe<UserType>;
  postDetail?: Maybe<PostType>;
  postList?: Maybe<Array<Maybe<PostType>>>;
  userDetail?: Maybe<UserType>;
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


export type QueryUserDetailArgs = {
  username: Scalars['String'];
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type UpdatePost = {
  __typename?: 'UpdatePost';
  data?: Maybe<PostType>;
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UploadPostImage = {
  __typename?: 'UploadPostImage';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserType = {
  __typename?: 'UserType';
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  posts: Array<PostType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar'];
};
