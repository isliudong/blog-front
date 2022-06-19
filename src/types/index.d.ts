// 基础
export interface Meta {

}

export interface ToUser {
    user_id: string;
    name: string;
    avatar: string;
    type: number;
}

export interface Params {
    current: number;
    size: number;
    keyword: string;
}

// 登录
export interface LoginParams {
    email: string;
    password: string;
}

export interface UserInfo {
    id:string;
    token: string;
    username: string;
    avatar: string | any;
}

export interface RegAndLogParams {
    email: string;
    username: string;
    usercode: string;
    password: string;
    phone: string;
    desc: string;
}


// 导航 nav
export interface NavListItem {
    index: string;
    path: string;
    name: string;
}


// 文章归档
export interface ParamsArchive {
    keyword: string;
    likes: string; // 是否是热门文章
    state: number; // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
    article: number;
    tag_id: string;
    category_id: string;
    pageNum: number;
    pageSize: number;
}

export interface ArchiveListItem {
    status: number;
    create_time: string;
    title: string;
    id: string;
}

export interface Archive {
    year: string;
    articles: ArchiveListItem[];
}

export interface ArchiveData {
    count: number;
    list: Archive | any;
}


// 文章详情
export interface OtherComments {
    content: string;
    create_time: string;
    likes: number;
    state: number;
    to_user: ToUser;
    user: ToUser;
    id: string;
}

export interface Comments {
    article_id: string;
    content: string;
    create_time: string;
    id: number;
    is_handle: number;
    is_top: boolean;
    likes: number;
    other_comments: OtherComments[];
    state: number;
    update_time: string;
    user: ToUser;
    user_id: string;
    __v: number;
}

export interface CommentT {
    id: number;
    content: string;
    parent_id: number;
    parent_type: string;
    article_id: number;
    create_by: number;
    reply_to_user: number;
    likes: number;
    create_date: string;
    last_updated_date: string;
}

export interface ArticleDetailIF {
    toc: string;
    author: string;
    category: Array<any>;
    comments: Array<Comments>;
    create_time: string;
    desc: string;
    content: string;
    id: string;
    img_url: string;
    numbers: number;
    keyword: Array<string>;
    like_users: Array<any>;
    meta: Meta;
    origin: number;
    state: number;
    tags: Array<any>;
    title: string;
    update_time: string;
}

export interface ArticleDetailParams {
    id: string | string[];
    type: number;
}

export interface LikeParams {
    id: string;
    user_id: string;
}

// 文章列表
export interface ArticlesParams {
    keyword: string;
    likes: string; // 是否是热门文章
    state: number; // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
    tagId: string;
    categoryId: string;
    current: number;
    size: number;
}

export interface Article {
    category: string[];
    createDate: string;
    createBy: number;
    content: string;
    description: string;
    img: string;
    views: number;
    likes: number;
    comments: number;
    tags: [];
    title: string;
    id: string;
    userLiked: boolean;
}

export interface Page<T> {
    total: number;
    size: number;
    current: number;
    pages: number;
    records: Array<T> | any;
}


// 留言
export interface MessageParams {
    email: string;
    phone: string;
    name: string;
    content: string;
}

export interface RulesItem {
    validator: Function;
    trigger: string;
}

export interface Rules {
    email: RulesItem[];
    phone: RulesItem[];
    name: RulesItem[];
    content: RulesItem[];
}


// 项目
export interface ProjectList {
    content: string;
    end_time: string;
    img: string;
    start_time: string;
    title: string;
    url: string;
    id: string;
}

export interface ProjectsData {
    count: number;
    list: ProjectList | any;
}


// 历程
export interface TimelineList {
    content: string;
    end_time: string;
    start_time: string;
    title: string;
    state: number;
    id: string;
}

export interface TimelinesData {
    count: number;
    list: TimelineList | any;
}


// 标签
export interface Tag {
    name: string;
    id: string;
}

export interface TagsData {
    count: number;
    list: Tag | any;
}
