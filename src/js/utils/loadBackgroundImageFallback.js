export default (imageWrapper, urlToImage) => {
  let loaded = false;

  if (urlToImage) {
    const image = new Image();
    image.src = urlToImage;

    image.onload = () => {
      loaded = true;
    };
  }

  // If image downloaded successfully => insert it via background-image
  // Else => do nothing. Using default image in css
  setTimeout(() => {
    if (loaded) {
      imageWrapper.style['background-image'] = `url(${urlToImage})`;
    }
  }, 200);
};
