import moment from "moment/moment";
import "moment/locale/es";
moment.locale("es");

const formatDate = (date) => {
  return moment(date).format("D [de] MMMM [del] YYYY");
};

export const sellAdapter = (sell) => ({
  id: sell.idSell,
  platform: sell.name,
  date: sell.dateCreated,
  total: sell.total,
});

export const sellDetailsAdapter = (sell) => ({
  id: sell.sell.idSell,
  name: sell.sell.name,
  total: sell.sell.total,
  pays: sell.sell.pays,
  change: sell.sell.change,
  dateCreated: formatDate(sell.sell.dateCreated),
  details: sell.details,
});
