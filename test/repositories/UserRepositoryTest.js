/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const assert = require('assert')
const { findById } = require('../../src/repositories/UserRepository')

describe('UserRepositoryTest', () => {
  it('findById - rejects promisse when invalid mongo id', () => {
    const id = '1234'
    return findById(id)
      .then()
      .catch(error => {
        assert.equal(error, `Oops! Não encontramos nenhum usuário com o código "${id}"`)
      })
  })

  
})