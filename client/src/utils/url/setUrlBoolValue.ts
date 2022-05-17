export const setUrlBoolValue = (
  filterUrl: string,
  filter: string,
  filterTrue: string,
  filterFalse: string
) => {
  let typeFilterUrl = `${filterUrl}=`;


  if(filter === filterTrue) {
    return typeFilterUrl = typeFilterUrl.concat('true');
  }
  if(filter === filterFalse) {
    return typeFilterUrl = typeFilterUrl.concat('false');
  }

  return ''
}