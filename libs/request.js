import axios from 'axios';
import vc from 'value-chain';
import cheerio from 'react-native-cheerio';

const categoryMap = {
  headline: '/cps/news/front_page',
  business: '/cps/news/business',
  technology: '/cps/news/technology',
  entertainment: '/cps/news/entertainment_and_arts',
  science: '/cps/news/science_and_environment'
};
const request = axios.create({
  baseURL: 'http://walter-producer-cdn.api.bbci.co.uk/content',
  timeout: 10000,
  headers: {
    'User-Agent': 'BBCNewsGNL/4.4.0.26 (iPhone6,1; iOS 10.3.3)'
  }
});

const dictApi = '/fsearch';
const dict = axios.create({
  baseURL: 'http://dict.youdao.com',
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
  }
});

function getPage(list, page, pageSize = 10) {
  const end = page * pageSize;
  const start = end - pageSize;

  return list.slice(start, end);
}

export default {
  async getNewsList(category = 'headline', page = 1) {
    const response = await request.get(categoryMap[category]);

    const data = vc.set(response.data || {});
    const { status } = response;
    // 人为分页
    const list = data.getList('relations')
      .sort((a, b) => b.content.lastUpdated - a.content.lastUpdated);
    data.relations = getPage(list, page);

    return { data, status };
  },

  async getNews(id) {
    const response = await request.get(id);

    return response.data;
  },

  async queryDict(word) {
    const params = {
      q: word,
      client: 'deskdict',
      keyfrom: 'chrome.extension',
      pos: -1,
      appVer: '3.1.17.4208',
      le: 'eng'
    };

    const result = await dict.get(dictApi, { params });
    const $ = cheerio.load(result.data, {
      xmlMode: true
    });

    const translationList = $('translation')
      .map((i, elem) => $(elem).text())
      .get()
      .filter(i => !!i);
    const phonetic = $('phonetic-symbol').text().split(',');
    const phrase = $('return-phrase').text();

    return {
      translationList, phonetic, phrase
    };
  }
};

export const categories = Object.keys(categoryMap);
