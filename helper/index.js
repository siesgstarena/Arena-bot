module.exports = {
    boldMe:(text)=>{
        return `**${text}**`
    },
    italicMe:(text)=>{
        return `*${text}*`
    },
    underlineMe:(text)=>{
        return `__${text}__`
    },
    strikethroughMe:(text)=>{
        return `~~${text}~~`
    },
    codeMe:(text)=>{
        return ``+text+``
    }
}