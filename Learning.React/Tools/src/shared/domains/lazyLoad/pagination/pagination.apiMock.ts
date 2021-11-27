import { Express } from 'express';
import qs from 'qs';
import routes from '../../../../samples/pagination/ids.configuration';
import { range } from '../../../helpers/arrayHelper';

const resources = range(500);

export default (app: Express) => {
  app.route(routes.api).get((req, res) => {
    const totalCount = resources.length.toString();
    const page = Number(req.query.page);
    const pageSize = Number(req.query.limit);
    const prevPage = page > 1 ? page - 1 : 1;
    const nextPage = resources.length / pageSize > page ? page + 1 : page;
    const lastPage = Math.ceil(resources.length / pageSize);
    const referer = req.get('Referrer');
    const link = `<${referer}${routes.api}?${qs.stringify({
      _page: 1,
      _limit: pageSize,
    })}>; rel="first",<${referer}${routes.api}?${qs.stringify({
      _page: prevPage,
      _limit: pageSize,
    })}>; rel="prev",<${referer}${routes.api}?${qs.stringify({
      _page: nextPage,
      _limit: pageSize,
    })}>; rel="next",,<${referer}${routes.api}?${qs.stringify({
      _page: lastPage,
      _limit: pageSize,
    })}>; rel="lastPage"`;

    res.set({
      'x-total-count': totalCount,
      link,
    });

    res.status(200);
    res.json(resources.slice(pageSize * (page - 1)).slice(0, pageSize));
  });
};
