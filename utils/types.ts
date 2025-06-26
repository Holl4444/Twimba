export interface tweetData {
    handle: string,
    profilePic: string,
    likes: number,
    retweets: number,
    tweetText: string,
    replies: replyData[],
    isLiked: boolean,
    isRetweeted: boolean,
    uuid: string
}

export interface replyData {
    handle: string,
    profilePic: string,
    tweetText: string
}