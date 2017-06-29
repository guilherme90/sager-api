/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('../db/mongodb')
const Schema = mongoose.Schema

const City = new Schema({
  uf: Number,
  sigla_uf: String,
  nome_uf: String,
  cidades: [{
    codigo_ibje: Number,
    nome_municipio: String
  }]
},{
  collection: 'municipio',
  versionKey: false
})

module.exports = mongoose.model('City', City)