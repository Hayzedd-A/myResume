let strs = ['flower', 'flow', 'flight', 'fly']
if (strs) {
    let strsLength = strs.length
    let indexes = Array.from({length:strsLength}, (value, index) => index).slice(1,)
    let index = 0
    for (character of strs[0]) {
        console.log(strs[indexes[index]][index])
        index++
        // if (character == strs[indexes][index]) {
        // }
    }
    console.log(indexes)
}