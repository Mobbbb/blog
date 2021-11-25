function SWFilePlugin(content, compilation, slotParams) {
    let result = ''
    const assets = Object.keys(compilation.assets).map(asset => `${compilation.outputOptions.publicPath}${asset}`)

    const reg = new RegExp(/\/\*.+?\*\//g)
    const splitLineOfContent = content.toString().split(reg)
    const splitLineOfCode = content.toString().match(reg)

    splitLineOfContent.forEach((splitText, index) => {
        if (index) {
            const splitCode = eval(`{${splitLineOfCode[index - 1].trim().slice(2, -2)}}`)
            let slotContent = slotParams[splitCode]
            if (typeof slotContent === 'function') {
                slotContent = slotContent(assets)
            }
            result += `const ${splitCode} = ${slotContent}`
        }
        result += splitText
    })
    
    return result
}

module.exports = SWFilePlugin
