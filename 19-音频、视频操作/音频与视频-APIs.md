# 音频与视频——APIs
音频与视频的APIs，也就是使用JavaScript来操控音频与视频
我们从最基本的三个方面来了解这些API
- 属性
- 事件
- 方法

## 属性

### 媒体通用属性 - attribute（与HTML当中属性进行关联的一些属性）
- src: <String>  获取/设置 媒体资源的URL
- autoPlay: <boolean>  获取/设置 自动播放状态
- controls: <boolean>  获取/设置 控制面板显示与隐藏
- muted: <boolean>  获取/设置 静音
- loop: <boolean> 获取/设置 是否循环播放
- defaultMuted: <boolean>  获取默认静音状态，与muted不同的是，它只是媒体的默认状态，不能设置。

### 媒体通用属性 - property（只有在js 中才能读取的属性）
- volume: <number-double>  获取/设置 音量大小，取值范围：0-1
- duration: <number-double>  媒体资源时长，以秒为单位，当资源不可用时，值为0
- currentTime: <number-double>  获取/设置 当前播放时间，以秒为单位
- paused: <boolean>  获取 当前媒体是否是暂停状态
- ended: <boolean>  获取 当前媒体是否已经播放完成
- playbackRate: <boolean> 获取/设置 当前媒体播放速率(速度)，默认为:1，正常速度。有的浏览器(firefox-Gecko)会有取值范围:0.25-4.0之间(取值范围外，媒体还是播放，但是没有声音效果)
- defaultPlaybackRate: <boolean>  获取 默认播放速率
- networkState: <number>  获取 在网络上获取媒体的当前状态
- readyState: <number>  获取 当前媒体处理状态
- buffered: <TimeRanges-LikeArray>  表示一组时间范围，跟踪媒体资源的加载缓冲数据；TimeRanges包含一个或多个时间段缓冲数据(单位:秒)，结构类似：
    `[[0, 40], [60, 80], [100, 200]]`
    上面表示当前有三段缓冲数据，分别是：0-40秒，60-80秒，100-200秒的数据已经缓冲
    我们可以通过TimeRanges提供的start(段位)和end(段位)方法来获取指定缓冲段的时间
    当缓冲段时间相连，则合并时间段，如：当40-60之间的数据也缓冲完成，则：
    `[[0, 80], [100, 200]]`
    当全部数据缓冲完成：
    `[[0, 200]]`

### video 特有属性
- poster: <String>  获取/设置 视频播放器前的预览图片
- width/height: <string> 获取/设置 视频占据页面大小
- videoWidth/videoHeight: <string>  获取 视频实际大小

## 事件
- abort: 在播放被终止时触发，例如：当播放中的视频重新开始播放时会触发这个事件
- canplay: 在媒体数据已经有足够的数据(至少播放数帧)可供播放时触发，但加载的数据不一定能支撑完成，注意：手动设置currentTime会触发该事件
- canplaythrough: 在媒体可以在保持当前的下载速度的情况下不被中断的播放完毕。注意：手动设置currentTime会触发该事件
- durationchange: 在媒体已被加载足够的长度从而得知总长度时会触发这个事件
- emptied: 媒体被清空(初始化)时触发
- ended: 播放结束时触发
- error: 在发生错误时触发
- loadeddata: 媒体的第一帧已经加载完毕
- loadedmetadata: 媒体的元数据已经加载完毕，现在所有的属性包含了它们应有的有效信息
- loadstart: 在媒体开始加载时触发
- mozaudioavailable: 当音频数据缓存并交给音频层处理时
- pause: 播放暂停时触发
- play: 在媒体回放被暂停后再次开始时触发(即，在一次暂停事件后恢复媒体回放)。
- playing: 媒体开始播放时触发(不论是初次播放、在暂停后恢复、或是在结束后重新开始)。
- progress: 告知媒体相关部分的下载进度时周期性地触发，有关媒体当前已下载总记的信息可以在元素的buffered属性中获取到。
- ratechange: 在回放变化是触发（在播放速率变化时触发）
- seeked: 在跳跃操作完成时触发
- seeking: 在跳跃操作开始时触发
- stalled: 在尝试获取媒体数据，但数据不可用时触发
- suspend: 在媒体资源加载终止时触发，这可能是因为下载已经完成，或因为其他原因暂停
- timeupdate: 元素的currentTime属性表示的时间已经改变
- volumechange: 在音频音量改变时触发(既可以是volume属性改变，也可以是muted属性改变)
- waiting: 在一个待执行的操作(如回放)因等待另一个操作(如跳跃或下载)被延迟时触发

## 方法
- play: 播放视频，注意：与autoplay一样，受到浏览器默认的设置影响，非用户操作同意的播放调用会出错，可以在用户触发的交互(事件)中调用，但是不能程序自己调用
    小技巧：我们可以通过window.open()来开启新窗口，来调用open方法，因为open方法也是需要经过用户进行调用的(非用户调用行为调用open会被浏览器拦截)，同理，autoplay也是可以这么操作的
- pause: 暂停视频播放
- load: 重新加载

## 状态常量参考
**networkState**

| 常量              | 值   | 描述                                                         |
| ----------------- | ---- | ------------------------------------------------------------ |
| NETWORK_EMPTY     | 0    | 还没有数据，并且readyState的值是HAVE_NOTHING                 |
| NETWORL_IDLE      | 1    | HTMLMediaElement是有效的并且已经选择了一个资源，但是还没有使用网络。 |
| NETWORK_LOADING   | 2    | 浏览器正在下载HTMLMediaElement 数据                          |
| NETWORK_NO_SOURCE | 3    | 没有找到HTMLMediaElement src                                 |

**readyState**

| 常量              | 值   | 描述                                                         |
| ----------------- | ---- | ------------------------------------------------------------ |
| HAVE_NOTHING      | 0    | 没有关于音频/视频是否就绪的信息                              |
| HAVE_METADATA     | 1    | 音频/视频已初始化                                            |
| HAVE_CURRENT_DATA | 2    | 数据已经可以播放(当前位置已经加载)但没有数据能播放下一帧的内容 |
| HAVE_FUTURE_DATA  | 3    | 当前及至少下一帧的数据是可用的(换句话说，至少有两帧的数据)   |
| HAVE_ENOUGH_DATA  | 4    | 可用数据足以开始播放，如果网速得到保障，那么视频可以一直播放到底 |

**MediaError**

| 常量                        | 值   | 描述             |
| --------------------------- | ---- | ---------------- |
| MEDIA_ERR_ABORTED           | 1    | 请求终止         |
| MEDIA_ERR_NETWORK           | 2    | 资源请求错误     |
| MEDIA_ERR_DECODE            | 3    | 资源解码错误     |
| MEDIA_ERR_SRC_NOT_SUPPORTED | 4    | 不支持的媒体格式 |



## 全屏
- requestFullscreen 方法：发出异步请求使元素进入全屏模式，注意：与play方法特性一样，需要用户交互代码中才能执行，不能程序主动调用
- exitFullscreen 方法：退出全屏，该方法只能是document或shadowRoot调用
- fullscreenElemeng 属性：当前是否有全屏元素，该属性只能是document或shadowRoot调用
- fullscreenchange 事件：进入全屏或退出全屏时触发
- fullscreenerror 事件：进入全屏或退出全屏失败时触发
- promise：requestFullscreen 方法返回的是一个promise，所以除了使用事件，我们还可以通过promise的错作来进行后续操作