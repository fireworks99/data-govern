import data_govern from '@/assets/data/data_govern.json';
import data_query from '@/assets/data/data_query.json';

const dataMap = {
  data_govern,
  data_query
};

export function queryDataByCondition(data, type) {

  const aimData = dataMap[type];

  return new Promise((resolve) => {
    const { pageSize, pageNum } = data;
    const start = (pageNum - 1) * pageSize;

    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          list: aimData.slice(start, start + pageSize),
          total: aimData.length
        }
      });
    }, 1000);
  });
}
