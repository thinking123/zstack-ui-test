## zstack ui test

1. 本地安装插件：code --install-extension zstackuitest-0.0.1.vsix
2. yarn build , 生成 ui_test 下 ui 测试文件到 dist
3. 运行一个 ui 测试:yarn vip , 创建 vip

## 目录结构

1. srcipts 下面包括了运行脚本，start.js transform 程序 获取输入的 config ，加载 plugin ： zstackuitest.plugin ，parse transform ， 最后结果 返回 gen ，默认到 dist
2. ui_test 存放 uitest 制定脚本
3. pull 前端代码：ssh://git@dev.zstack.io:9022/qing.liang/zstack-ui.git , branch:zstack-uitest

## 设计思想

1. 不和任何的 ui lib 相关，使用自定义的脚本语言，抽象操作细节，方便理解和代码：文件 ui_test
2. 通过 transform 插件实现 ，通过配置参数得到不同的编译 ui 测试脚本：
3. 使用 vs code 插件使得脚本易于便编写
