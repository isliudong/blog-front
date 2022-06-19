import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.crossDomain = true

//获取歌词
export const getWords = id => {
  return axiosInstance.post(`https://n.xlz122.cn/api/lyric?id=${id}`);
};
//获取歌曲详情
export const getMusicInfo = id => {
  return axiosInstance.post(`https://n.xlz122.cn/api/song/detail?ids=${id}`);
};
//获取歌曲url
export const getMusicUrl = id => {
  return axiosInstance.post(`https://n.xlz122.cn/api/song/url?id=${id}`);
};
//获取热门歌曲
export const getHotMusic = id => {
  return axiosInstance.post(`https://n.xlz122.cn/api/playlist/detail?id=${id}`);
};
//获取搜索建议
export const getSearchSuggest = key => {
  return axiosInstance.post(`https://n.xlz122.cn/api/search/suggest?keywords=${key}`);
};
//获取歌曲热门评论
export const getHotTalk = id => {
  return axiosInstance.post(`https://n.xlz122.cn/api/comment/music?id=${id}&limit=3`);
};
