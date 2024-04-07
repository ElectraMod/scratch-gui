const properties = {
    poppedOut: false,
    window: null,
    originalParent: null
}

function createWindowSettings(width, height) {
    return `scrollbars=yes,resizable=no,resizeable=no,status=no,location=yes,toolbar=no,menubar=no,width=${width},height=${height},left=50,top=50`
}
function getMovingStage() {
    let canvas = null
    try {
        canvas = vm.renderer.canvas
    } catch {
        canvas = null
    }
    return canvas
}

function Popout() {
    const stage = getMovingStage()
    if (!stage) return

    properties.poppedOut = !properties.poppedOut
    console.log("pop-out window", properties.poppedOut)
    if (!properties.poppedOut) {
        properties.window.close()
        return
    }

    properties.originalParent = stage.parentElement

    const newWindow = window.open("about:blank", "Stage Window", createWindowSettings(vm.runtime.stageWidth, vm.runtime.stageHeight))
    newWindow.onbeforeunload = () => { properties.poppedOut = false; properties.originalParent.prepend(stage) }
    properties.window = newWindow

    let running = true
    let interval
    interval = setInterval(() => {
        if (!running) return
        newWindow.document.body.append(stage)
        stage.style.width = `${newWindow.innerWidth}px`
        stage.style.height = `${newWindow.innerHeight + 1}px`
        if (!properties.poppedOut) {
            running = false
            properties.originalParent.prepend(stage)
            stage.style.width = `${stage.width}px`
            stage.style.height = `${stage.height}px`
            clearInterval(interval)
        }
    }, 10);
}

export default { toggle: Popout, poppedOut: properties.poppedOut }