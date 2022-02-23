import moment from 'moment';

const formatDate = (date? : string) : string | undefined => (date ? moment(date).format('DD / MM / YYYY') : undefined);

export default formatDate;
