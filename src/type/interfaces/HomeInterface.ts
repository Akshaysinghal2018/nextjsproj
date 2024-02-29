export interface PostInterface {
    title: string
    content: string
    date: number
    "sub-title": string
    excerpt: string
    image: string
    slug: string
  }[];
  
export type PostInterfaceArray = PostInterface[];