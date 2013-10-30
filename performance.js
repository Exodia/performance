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
        record: {},
        onload: function () {
            var start = new Date()
            var record = this.record
            addEvent(win, 'load', function () {
                record.loadTime = new Date() - start
            })

            return this
        },

        domReady: function () {
            var start = new Date()
            var record = this.record
            addEvent(win.document, 'DOMContentLoaded', function () {
                record.domReadyTime = new Date() - start
            })

            return this
        },

        reporter: function () {
            var record = this.record
            addEvent(win, 'load', function () {
                var script = document.getElementById('__XPerformance')
                if (!script) {
                    script = document.createElement('script')
                    var head = document.getElementsByTagName('head')[0]
                    script.id = '__XPerformance'
                    script.type = 'type/performance'
                    head.insertBefore(script, head.firstChild)
                }

                script.innerHTML = JSON.stringify(record)
            })

            return this
        }
    }
}(window);