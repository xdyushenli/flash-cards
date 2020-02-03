This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# 开发进度
## 前端
1. 登录界面
2. 为删除卡片选项添加必要的提示
3. 抽卡界面
4. 接口绑定
5. 引入 redux 进行数据管理

## 后端
1. 规范接口格式
```json
{
    "code": "",
    "msg": "",
    "data": {},
}
```

2. 剩下的5个接口
3. 编写本地服务器, 不使用数据库
4. 进行数据迁移
5. 处理并发, 只使用一条 MongoDB 连接的话靠谱吗?

## 踩坑记录
1. fs模块读取文件时路径要加 __dirname, fs模块读取文件时根目录并不是当前文件所在的目录, 而是在命令行执行该文件时, 命令行所在的目录。
2. MongoDB 的连接最大连接数一般为5。
3. MongoDB 连接可复用。
4. 使用 MongoDB 的 Schema 和 Model 会比直接操作数据库更简便。
5. 调用 Model 函数编译 Schema 的 Mongoose 必须和创建连接的 Mongoose 是同一个, 不然对数据库的操作不会起作用。
6. 调用 Model 函数的第一个参数是该 Model 所要绑定的集合名称。
7. 对于 sqlite 的 API 来说, run 方法通常用于插入、删除以及更新, get 方法用于查询单条数据, all 方法用于查询多条数据。
8. 在运行上述 sqlite 方法时, 需要注意, 不能使用 `${}` 这种语法将值插入到第一个参数中, 而应该使用 `?` 作为引用, 并将值放在第二个参数中, 不然会报错。