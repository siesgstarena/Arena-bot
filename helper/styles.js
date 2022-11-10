module.exports = {
  boldMe: (text) => {
    return `**${text}**`
  },
  italicMe: (text) => {
    return `*${text}*`
  },
  underlineMe: (text) => {
    return `__${text}__`
  },
  strikethroughMe: (text) => {
    return `~~${text}~~`
  },
  codeMe: (text) => {
    return `` + text + ``
  },
  urlMe: (name, url) => {
    return `[${name}](${url})`
  },
  mentionSlashCommand : (name, id) => {
    return `</${name}:${id}>`
  },
}