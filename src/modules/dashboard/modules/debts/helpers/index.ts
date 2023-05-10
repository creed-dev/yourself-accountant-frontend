const reformatDate = (date: string) => {
  return date.split('/').join('-');
};

export default { reformatDate };
