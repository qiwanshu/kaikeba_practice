### 功能：
    - 播放与暂停
    - 视频时间展示
    - 修改当前播放进度（时间）
    - 加载（缓冲）进度
    - 播放速度
    - 播放音量
    - 隐藏鼠标
    - 全屏
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