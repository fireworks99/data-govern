import alldata from '@/assets/data/table.json';

export function queryDataByCondition(data) {
  return new Promise((resolve) => {
    const { pageSize, pageNum } = data;
    const start = (pageNum - 1) * pageSize;

    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          list: alldata.slice(start, start + pageSize),
          total: alldata.length
        }
      });
    }, 1000);
  });
}
