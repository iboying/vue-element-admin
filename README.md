
## Build Setup

``` bash
# config
npm config set registry https://registry.npm.taobao.org

# install dependencies
npm install
# if chromedriver install error, try this:
npm install --chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
