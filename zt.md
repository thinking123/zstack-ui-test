# zstack ui test

1.  构建自定义的语法
2.  通过自定义的语法分析，得到能够执行的 ui test
3.  构建 chrome 插件能够生成自定义语法

## 构建自定义的构建语法

1. 用对应的 key 表示对应的组件，提取操作的关键字作为 action ，包括 action 对应的 selector，这个 selector 需要符合一定的规则在分析语法的时候能够和实际的 ui 关联起来，然后接对应的参数： key:action [selector [param]]
2. 此语法能够支持模块化，类似 js 支持导入和导出，能够在多个测试之间重复使用
3. 语法使用一个维度的模式，线行执行

## 语法分析

1.  配置 transform 配置

    ```
    {
    engine:'puppeteer' // puppeteer,Playwright, ui 测试框架
    ...otherOptions,
    plugins:[
          'pluginforui4.0' // 和语法相关的 插件 需要配合具体的项目使用
         ]
    }
    ```

2.  通过语法分析打印出对应的能够执行的测试
    `
    const uiTest = transform(source , options)
    console.log(uiTest)  
    /\*
    输出
    const { webkit } = require('playwright');

    (async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `example.png` });
    await browser.close();
    })();

    \*/
    `

# 代码

1. 构建自定义的语法

```
1.route: network-service/vip/create
1.name:input [input]
2.desc:input [textarea]
3.l3-type:select options-0
4.l3:select list-0
5.show qos modal
6.iprange:select list-0
7.specificIp:input
if:show qos
8.qosPort:input
9:upband:input
10:upbandunit:select-0
11:downband:input
12:downbandunit:select-0
13:add qos button
14.qosPort:input
15:upband:input
16:upbandunit:select-0
17:downband:input
18:downbandunit:select-0
19:submit
具体内容：按照创建vip的步骤组件来执行：导航，输入，选择，显示modal，输入，选择，提交
```

2. 语法分析
   使用插件来分析每行的内容： (pluginforui4.0)
   通过对 ui 的组件配置相应的 key 来识别 组件，在 transform 的时候分析为对应的 selector ，
   然后通过配置来使用不同的测试引擎来输出相应的测试内容，提供测试

# 想法

1. 通过代码的方式覆盖主要的 ，create,update,query,delete 等主要的测试
2. 通过抽象出来的语法，实现复用，和分析语法实现分离
3. 使用抽象的语法 ，能够实现插件话分析代码，提供兼容性
4. 插件 分析代码，使用插件和项目绑定，不是代码
5. chrome 插件实现非代码人员能够生成抽象语法
