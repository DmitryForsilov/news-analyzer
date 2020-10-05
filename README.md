[![Maintainability](https://api.codeclimate.com/v1/badges/40d01c78ecd02a3a7109/maintainability)](https://codeclimate.com/github/DmitryForsilov/news-analyzer/maintainability)
![CI](https://github.com/DmitryForsilov/news-analyzer/workflows/CI/badge.svg)

# News Analyzer

This is news app. It shows and analyzes the most popular news on a specific topic.

This app uses local storage, newsapi and github api.

The project was reviewed by Yandex Praktikum.

[Link to deployed project](https://dmitryforsilov.github.io/news-analyzer)

## Features:
- Form submit validation
- Saving data in local storage
- Searching news
- Rendering preloaders and errors
- Rendering news. Opening news in new tab by clicking on newscard
- Rendering more news by clicking on "Show more" button
- Using default image if link is undefined or image can't download
- XSS defence. Using sanitizeHTML function for user input and data that using in markup.
- Showing link to "analytics page" if news came from api
- Calculating all analytics when "See analytics" button was clicked
- Rendering slider with 20 last commits of this project from github. Opening current commit by clicking on slide

## Used in project:
- **HTML**
- **CSS**
- **Javascript**
- **OOP**
- **BEM**
- **localStorage**
- **newsapi**
- **github api**
- **bem-tools-create**
- **swiperjs**
- **webpack**
- **es lint**
- **gh pages** - deploy

## Webpack setup:
- Multiple pages
- Three build scripts: start, build and deploy
- Babel transpilation
- Hot reload
- JS and CSS hashing
- CSS minification
- Autoprefixer
