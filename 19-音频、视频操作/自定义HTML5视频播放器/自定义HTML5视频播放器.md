### 功能：
    - 播放与暂停
    - 视频时间展示
    - 修改当前播放进度（时间）
    - 加载（缓冲）进度
    - 播放速度
    - 播放音量
    - 隐藏鼠标
    - 全屏

### 代码结构划分
    - 事件相关
    - 用户交互相关
    - 功能函数
    - 辅助函数
    - 其他

### 元素管理
    - 为了减少变量个数，将获取的元素都放在一个对象中进行管理
    - let els = {}
### 配置管理
    - 通过一个对象来管理配置选项
    let configs = {
        canplay: false,
        bufferedEnd: 0,
        playbackRate: 1,
        messageTimer: 0,
        mutedChanged: false,
        fullScreenTimer: 0,
        prevClickTimestamp: Date now(),
        dblClickTimer: 0
    }
### 功能函数
    let methods = {
        init() {},
        canplay() {},
        playOnPause() {}
    }
### 辅助函数
    let helpers = {
        convertToCamelCase (str) {},
        formatDuration(ms) {},
        addZero(val) {},
        getDisCursorToEelment(ele, e) {}
    }

### 播放与暂停
- 点击播放按钮
- 点击视频
**事件委托**：通过事件委托方式处理
**功能函数**-methods.playOrPause
    封装播放与暂停逻辑
    - paused 属性：获取当前媒体是否暂停状态
    - play 方法：播放视频，注意：与autoplay一样，受到浏览器默认的设置影响，非用户操作同意的播放调用会出错，可以在用户触发的交互(事件)中调用，但是不能程序自己调用。
    - pause 方法：暂停视频播放
    - playing 事件：在媒体开始播放时触发(不论是初次播放、在暂停后恢复、或是在结束后重新开始)，修改播放暂停按钮状态。
    - pause 事件：播放暂停时触发，修改播放暂停按钮状态。

### 视频时间展示
- **durationchange** 事件：在媒体已被加载足够的长度从而得知总长度时会触发这个事件
- 功能函数-**methods.durationchange**: 更新显示播放时间和总时间
- **duration** 属性：媒体资源时长，以秒为单位，当资源不可用时，值为0
- **currentTime** 属性：获取/设置 当前播放时间，以秒为单位
- 辅助函数-**helpers.formatDuration**: 格式化显示时间，小时:分钟:秒
- **timeupdate** 事件：元素的currentTime属性表示的时间已经改变，methods.updateTime()

### 当前播放进度(时间)
通过currentTime/duration 计算宽度和偏移值

### 修改当前播放进度(时间)
用户点击播放进度条，可以修改播放时间
- **currentTime** 属性：该属性可读可写，设置 currentTime 会触发 timeupdate 事件
- 辅助函数 **getDisCursorToElement**: 获取当前鼠标指针到某元素的相对位置
- 辅助函数 **showMessage**: 显示消息提示

### 加载(缓冲进度)
- **canplay** 事件：在媒体数据已经有足够的数据(至少播放数帧)可供播放时触发，但加载的数据不一定能支撑完成，注意：手动设置currentTime会触发该事件
- **progress** 事件：告知媒体相关部分的下载进度时周期性地触发，有关媒体当前已下载总记的信息可以在元素的buffered属性中获取到。
- 功能函数**methods.progress**: 封装缓冲逻辑
- **buffered** 属性：表示一组时间范围，跟踪媒体资源的加载缓冲速度
    TimeRanges包含一个或多个时间段缓冲数据(单位:秒)，结构类似：
    `[[0, 40], [60, 80], [100, 200]]`
    上面表示当前有三段缓冲数据，分别是：0-40秒，60-80秒，100-200秒的数据已经缓冲
    我们可以通过TimeRanges提供的start(段位)和end(段位)方法来获取指定缓冲段的时间
    当缓冲段时间相连，则合并时间段，如：当40-60之间的数据也缓冲完成，则：
    `[[0, 80], [100, 200]]`
    当全部数据缓冲完成：
    `[[0, 200]]`

### 播放速度
**显示隐藏播放速度面板**
**切换播放速度**
**playbackRate 属性**
    获取/设置 当前媒体播放速率(速度)，默认为:1，正常速度。有的浏览器(firefox-Gecko)会有取值范围:0.25-4.0之间(取值范围外，媒体还是播放，但是没有声音效果)
**ratechange 事件**
    在播放速率变化时触发

### 播放音量
**显示隐藏播放音量控制面板**
**volumechange**
    在音频音量改变时触发(既可以是volume属性改变，也可以是muted属性改变)
**volume 属性**
    获取/设置 音量大小，取值范围：0-1
    **注意**：
        methods.init() 初始化音量
    **技巧**：
        通过methods.volumechange 调用对象(是否为video事件调用)，判断是初始化还是事件触发来决定
**拖拽控制音量**
    技巧：通过try catch 控制音量越界错误
**点击控制音量**
**静音控制**
    当 volume <= 0 时，设置静音状态
**muted 属性**
    获取/设置 静音
**点击控制静音**
    技巧：
        改变 muted 属性，也会触发 volumechange 事件
    注意：
        因为静音改变和音量改变都会触发 volumechange, 所以 methods.volumechange 方法中的逻辑会出现混乱
    技巧：
        通过一个状态(变量 - config.mutedChanged) 来区别是否是直接静音，还是音量的变化导致静音
    注意：
        直接静音不要修改 volume 值，只需要改变音量元素的高度就行，这样取消静音的时候还可以回到原来的音量

### 全屏
    document.fullscreenElement - document 对象下的 fullscreenElement 可判断是否全屏
    document.exitFullscreen() - document 对象下的 exitFullscreen 方法 可退出全屏
    video 的 requestFullscreen() 方法 全屏