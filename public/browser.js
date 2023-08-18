const { default: axios } = require("axios")

const gettingFile = async() =>{
  const file  = await axios.get('/download')
  console.log(file);
}

gettingFile()
 