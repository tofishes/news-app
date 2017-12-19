import axios from 'axios';
import vc from 'value-chain';

const categoryMap = {
  headline: '/cps/news/front_page',
  business: '/cps/news/business',
  technology: '/cps/news/technology',
  entertainment: '/cps/news/entertainment_and_arts',
  science: '/cps/news/science_and_environment',
};


const request = axios.create({
  baseURL: 'http://walter-producer-cdn.api.bbci.co.uk/content',
  timeout: 10000,
  headers: {
    'User-Agent': 'BBCNewsGNL/4.4.0.26 (iPhone6,1; iOS 10.3.3)'
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
  }
};

export const categories = Object.keys(categoryMap);
