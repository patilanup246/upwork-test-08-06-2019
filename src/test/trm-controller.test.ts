import * as mocha from 'mocha';
import chai = require('chai');
import chaiHttp = require('chai-http');
import portfinder = require('portfinder')
let app:any;
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /trm', () => {
  before(async () => {
    process.env.PORT = ""+await portfinder.getPortPromise({port: 10002})
    app = require('../index').server;
  });

  after(async () => {
    require('../index').stop()
  });
  it('responds with JSON array', async () => {
    const res = await chai.request(app).get('/trm')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.gt(0);
  });

  it('responds with paginated items', async () => {
    const res = await chai.request(app).get('/trm').query({page: 1, limit: 10})
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(10);
  });

});