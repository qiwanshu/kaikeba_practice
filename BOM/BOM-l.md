# BOM

## javascript 的组成部分
- DOM (document object model) 文档对象模型
- BOM (browers object model) 浏览器对象模型
- ECMAScript js 的核心

## BOM 下五大对象

### window 对象
- innerWidth/innerHeight
- open 方法

window.open(URL,target,specs,replace)  
  - URL 新窗口地址
  - target 属性 新窗口打开方式
    - _blank 默认
    - _self 
  - specs 新窗口规格
    - width=pixels	窗口的宽度.最小.值为100
    - height=pixels	窗口的高度。最小.值为100
    - location=yes|no|1|0	是否显示地址字段.默认值是yes
    - menubar=yes|no|1|0	是否显示菜单栏.默认值是yes
    - resizable=yes|no|1|0	是否可调整窗口大小.默认值是yes
    - scrollbars=yes|no|1|0	是否显示滚动条.默认值是yes
    - status=yes|no|1|0	是否要添加一个状态栏.默认值是yes
    - titlebar=yes|no|1|0	是否显示标题栏.被忽略，除非调用HTML应用程序或一个值得信赖的对话框.默认值是yes
    - toolbar=yes|no|1|0	是否显示浏览器工具栏.默认值是yes
    - left/top
- close 方法关闭窗口

- scroll 事件
- resize 事件
- 操作滚动条位置
  - window.scrollX, window.scrollY, window.scrollTo()
  - document.documentElment.scrollTop, document.documentElment.scrollLeft
  - document.body.scrollTop, document.body.scrollLeft

- window 下的各类弹窗
  - alert()
  - confirm('message')
  - prompt([msg],[defaultText])

### location 对象
- host 主机信息  域名+端口（端口一般默认为80，80端口不显示）
- hostname 域名（主机地址，IP地址）
- port 端口
- pathname 当前页面在服务器上的地址
- protocol 协议（http:/https:）
- href 完整的地址
- hash 地址中“#”号后面的内容
  - hashChange  (window.onhashchange)监听location中hash变化
- search 地址栏中问号（？）后面的内容，（get方式提交的数据）
- reload() 刷新页面（重载）
- replace() 替换地址栏信息

### history 对象 操作历史记录
- back() 到历史记录的上一页
- forward() 到历史记录的下一页
- go(step) step 为正数 前进n步，负数回退
- state
- pushState()
- popstate 
  - history 路由实现原理

### navigator 对象
- userAgent
- appName
  - appVersion

### screen 对象
  width 、height