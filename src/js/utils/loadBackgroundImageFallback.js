const urlToDefaultImage = '../../images/default-news-image.jpg';

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
    } else {
      imageWrapper.style['background-image'] = `url(${urlToDefaultImage})`;
    }
  }, 200);
};
