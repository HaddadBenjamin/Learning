// Content-Type : 'application/x-www-form-urlencoded'
const XWwwFormUrlencoded = (object : any) : URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  Object.keys(object).forEach((key) => urlSearchParams.append(key, object[key]));

  return urlSearchParams;
};

export default XWwwFormUrlencoded;
