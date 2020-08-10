export default (imageWrapper, urlToImage) => {
  let loaded = false;
  const image = new Image();

  image.src = urlToImage;

  image.onload = () => {
    loaded = true;
  };

  setTimeout(() => {
    if (loaded) {
      imageWrapper.style['background-image'] = `url(${urlToImage})`;
    }
  }, 200);
};
