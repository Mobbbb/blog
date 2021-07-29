function accAdd(arg1, arg2) { 
    var r1, r2, m
    try {
    　　r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }  
    
    try {
    　　r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10,Math.max(r1,r2))
    return (arg1 * m + arg2 * m) / m
}

Number.prototype.addScore = function(arg) {
    return accAdd(arg, this)
}

Array.prototype.indexOf = function(val) { 
    for (var i = 0; i < this.length; i++) { 
        if (this[i] === val) {
            return i
        }
    } 
    return -1
}

Array.prototype.remove = function(val) { 
    var index = this.indexOf(val)
    if (index > -1) { 
        this.splice(index, 1)
    } 
}
