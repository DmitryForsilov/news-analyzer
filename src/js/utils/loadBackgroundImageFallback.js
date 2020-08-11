export default (imageWrapper, urlToImage) => {
  let loaded = false;

  if (urlToImage) {
    const image = new Image();
    image.src = urlToImage;

    image.onload = () => {
      loaded = true;
    };
  }

  // Если изображение успешно загрузилось, вставляем его фоном.
  // Иначе ничего не делаем. Фоном вставляется заглушка, прописанная в стиле.
  setTimeout(() => {
    if (loaded) {
      imageWrapper.style['background-image'] = `url(${urlToImage})`;
    }
  }, 200);
};
