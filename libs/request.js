import axios from 'axios';
import vc from 'value-chain';

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

export default {
  async getNewsList(category = 'headline', page = 1) {
    const response = await request.get(categoryMap[category]);

    const data = vc.set(response.data || {});
    const { status } = response;

    return { data, status };
  }
};

export const categories = Object.keys(categoryMap);
