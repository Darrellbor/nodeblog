export interface Blog {
    title: string,
    preview: string,
    content: string,
    totalLikes: number,
    author: {
        authorId: string,
        name: string
    },
    createdOn: Date,
    categories?: string[],
    commments?: {
        comment: string,
        commentBy: {
            userId: string,
            name: string
        },
        commentedOn: Date
    }[]
}