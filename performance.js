;
void function (win) {
    function addEvent(el, type, fn) {
        if (el.addEventListener) {
            el.addEventListener(type, fn, false)
        } else {
            el.attachEvent('on' + type, fn)
        }
    }

    win.__XPerformance = {
        onload: function (record) {
            var start = new Date()
            addEvent(win, 'load', function () {
                record.loadTime = new Date() - start
            })
        },

        domReady: function (record) {
            var start = new Date()
            addEvent(win.document, 'DOMContentLoaded', function () {
                record.domReadyTime = new Date() - start
            })
        }
    }
}(window);