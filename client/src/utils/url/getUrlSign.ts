const getUrlSign = (url: string, baseUrl: string) => {
  if(url.length > baseUrl.length) {
    return '&'
  } else {
    return '?'
  }
}

export default getUrlSign