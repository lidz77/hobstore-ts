exports.convertUrl = (blob) => {
  return btoa(new Uint8Array(blob).reduce(
    function (data, byte){
      return data + String.fromCharCode(byte);
    }, ''
  ))
}
