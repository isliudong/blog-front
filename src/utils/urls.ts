interface Urls {
    getArchiveList: string;
    login: string,
    logout: string,
    register: string,
    getUser: string,
    getCurrentUser: string,
    addComment: string,
    addThirdComment: string,
    getCommentList: string,
    getArticleList: string,
    likeArticle: string,
    cancelLikeArticle: string,
    articleDetail: string,
    addMessage: string,
    getMessageList: string,
    getMessageDetail: string,

    getLinkList: string,

    getTagList: string,

    getCategoryList: string,

    getTimeAxisList: string,
    getTimeAxisDetail: string,

    getProjectList: string,
    getProjectDetail: string,
}


// url的链接
export const urls: Urls = {
    login: "/login",
    logout: "/logout",
    register: "/users/register",
    getUser: "/users",
    getCurrentUser: "/users/current",
    addComment: "/addComment",
    addThirdComment: "/addThirdComment",
    getCommentList: "/getCommentList",
    getArticleList: "/articles",
    getArchiveList: "/articles/archives",
    likeArticle: "/articles/{id}/like",
    cancelLikeArticle: "/articles/{id}/cancelLike",
    articleDetail: "/articles/{id}/detail",
    addMessage: "/addMessage",
    getMessageList: "/getMessageList",
    getMessageDetail: "/getMessageDetail",

    getLinkList: "/getLinkList",

    getTagList: "/tags",

    getCategoryList: "/getCategoryList",

    getTimeAxisList: "/getTimeAxisList",
    getTimeAxisDetail: "/getTimeAxisDetail",

    getProjectList: "/getProjectList",
    getProjectDetail: "/getProjectDetail"
};

export default urls;
