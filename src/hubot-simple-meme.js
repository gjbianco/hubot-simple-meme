const axios = require('axios')
const FormData = require('form-data')

module.exports = (robot) => {

  robot.hear(/^!meme (.+?)\s*(?::\s*(.+?))?\s*(?::\s*(.+))?\s*$/i, res => {
    const type   = res.match[1]
    const top    = res.match[2]
    const bottom = res.match[3]

    axios({
        method: 'get',
        url: 'https://imgflip.com/ajax_automeme',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
          'Accept': '*/*'
        },
        maxContentLength: 9999,
        transformRequest: [(data, headers) => {
          delete headers['Content-Length']
          delete headers['Connection']
          console.log('what the data', data)
          let d = new FormData()
          d.append('text', type)
          return d
        }],
        data: {
          text: type
        }
      })
      .then(data => (data.data))
      .then(memes => {
        res.send(memes)
      })
      .catch(err => console.log(err))
  })

}

// curl 'https://imgflip.com/ajax_automeme' -H 'cookie: __cfduid=da5f317bdf9baf2568dbfa433820473c11531404779; PHPSESSID=3hgc3hsp9qni6ijrolkj3i3tra' -H 'origin: https://imgflip.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.9' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' -H 'accept: */*' -H 'referer: https://imgflip.com/automeme' -H 'authority: imgflip.com' -H 'x-requested-with: XMLHttpRequest' -H 'dnt: 1' --data 'text=what+if+i+told+you+foo' --compressed
