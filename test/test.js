/**
 * Module dependencies.
 */
const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Test Api', () => {

    describe('Output', () => {
        it('it should success to retrive all data', (done) => {
            chai.request('localhost:3000')
                .get('/api/output')
                .end((err, res) => {
                    expect(res.body).to.have.status(200)
                })
                done()
        });
    })
})