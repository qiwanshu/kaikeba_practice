function mouseScroll(el, upFn, downFn) {
    el.addEventListener('mousewheel', function (e) {
        if(e.wheelDelta > 0) {  // 向上
            upFn && upFn()
        } else {
            downFn && downFn()
        }
        e.preventDefault();
    })

    el.addEventListener('DOMMouseScroll', function (e) {
        if(e.detail > 0) {  // 向下
            
            downFn && downFn()
        } else {
            upFn && upFn()
        }
        scroll.offsetTop
    })
}