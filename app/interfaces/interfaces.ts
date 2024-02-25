export interface newPost {
    title: string;
    content: string;
    flair: string;
}

export interface newReply{
    replyText: string;
    postId: string | null;
}

export interface listenReply{
    author: string,
    content: string,
    created_at: string,
    id: bigint,
    parent_id: bigint | null,
    top_parent: bigint
}