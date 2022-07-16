function goalPlaceHolder(goal) {
    var list = document.getElementById('goalPlaceHolder')

    try {
        while (list.firstChild) {
            list.removeChild(list.lastChild);
        }
    } catch {}

    opt = document.createElement('div');
    opt.innerHTML = goal
    list.appendChild(opt)

}

function targetPlaceHolder(target) {
    var list = document.getElementById('targetPlaceHolder')

    try {
        while (list.firstChild) {
            list.removeChild(list.lastChild);
        }
    } catch {}

    opt = document.createElement('div');
    opt.innerHTML = target
    list.appendChild(opt)

}

function indicatorPlaceHolder(target) {
    var list = document.getElementById('indicatorPlaceHolder')

    try {
        while (list.firstChild) {
            list.removeChild(list.lastChild);
        }
    } catch {}

    opt = document.createElement('div');
    opt.innerHTML = target
    list.appendChild(opt)

}