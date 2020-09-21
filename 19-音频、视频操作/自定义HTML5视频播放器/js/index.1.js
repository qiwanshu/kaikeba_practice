
// 获取元素
let els = {
    videoPlayer: document.querySelector('#video-player')
}

let helper = {
    convertToCamelCase(str) {
        let arr = str.split('-');
        let camStr = ''
        arr.forEach((item, index) => {
            if(index == 0) {
                camStr += item
            } else {
                camStr += item.slice(0,1).toUpperCase() + item.slice(1)
            }
        })

        // 使用正则

        return camStr
    },
}

let calssNameStr = 'video,message,control,progress-container,progress-range,progress-loaded,progress-played,progress-bar,control-wrap,play,time,volume,control-volume-box,control-volume-range,control-volume-slider,control-volume-bar,speed,control-speed-box,fullscreen'
let classNameArr = calssNameStr.split(',');
classNameArr.forEach(item => {
    // els[item] = els.videoPlayer.querySelector('.' + item);
    els[helper.convertToCamelCase(item)] = document.querySelector('.' + item);
})





