/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('../db/mongodb')
const Schema = mongoose.Schema

const City = new Schema({
  uf: String,
  sigla_uf: String,
  nome_uf: String,
  cidades: [{
    codigo_ibje: {
      type: Number,
      alias: 'id'
    },
    nome_municipio: {
      type: String,
      alias: 'label'
    }
  }]
},{
  collection: 'municipio',
  versionKey: false
})

City.plugin(require('mongoose-aliasfield'));
module.exports = mongoose.model('City', City)