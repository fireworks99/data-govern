import base_data from '@/assets/data/base_data.json';

const dataMap = {
  base_data
};

export function queryDataByCondition(data, type = 'base_data') {

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
    }, 500);
  });
}
