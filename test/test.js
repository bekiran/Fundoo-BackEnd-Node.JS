/************************************************************************************
 * @purpose   : Controller will contain method for all CRUD operations.
 *
 * @file      : user.controller.js
 * @overview  : Methods for all CRUD operation of user.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0
 * @since     : 04.03.2019
 *
 *************************************************************************************/
var chai = require("chai");
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
var server = require("../server");
var fs = require("fs");

/**************************************************************************************
* @description: to read file from json
***************************************************************************************/
function readFile() {

  var readata = fs.readFileSync('/home/admin1/KiranBE Fundoo/Fundoo Notes/FundooNotes-server/test/test.json')
  var data = JSON.parse(readata);
  return data;
}

/***************************************************************************************
* @description: test for user register
****************************************************************************************/
describe('status and content', function () { 
  describe('register page', function () { 
    var data = readFile();
    it('status', function(done){
      chai.request(server).post("/register").send(data.register).end((err, res) =>{
        if (err){
          console.log('expect ==> ',err);
          err.should.have.status(500);
        } else {
          console.log('expect ==> ', res.body);
          res.should.have.status(200);
          /*************************************************************************************
           * @description:test script for login
           ************************************************************************************/
          describe('Login page', function () {
            it('status ', function (done) {
              chai.request(server).post('/login').send(data.login).end((err, res) => {
                if (err) {
                  console.log("expect ==>", err);
                  err.should.have.status(401);
                } else {
                  console.log("expect ==>", res.body);
                  res.should.have.status(200);
                  /************************************************************************************
                   * @description:test script for forgot password
                   ***************************************************************************************/
                  describe('Forgot Password page', function () {
                    it('status ', function (done) {
                      chai.request(server).post('/forgotPassword').send(data.forgotPassword).end((err, res) => {
                        if (err) {
                          console.log("expect ==>", err);
                          err.should.have.status(400); //The request had bad syntax or was inherently impossible to be satisfied.
                        } else {
                          console.log("expect ==>", res.body);
                          res.should.have.status(200);
                          /******************************************************************************************
                           * @description:test script for reset password
                           *****************************************************************************************/
                          describe('Reset Password page', function () {
                            it('status ', function (done) {
                              chai.request(server).post('/resetPassword/:token').send(data.resetPassword).end((err, res) => {
                                if (err) {
                                  console.log("expect ==>", err);
                                  err.should.have.status(400); //The request had bad syntax or was inherently impossible to be satisfied.
                                } else {
                                  console.log("expect ==>", res.body);
                                  res.should.have.status(200);  //The request was fulfilled.
                                 /************************************************************
                                   * @description:test script for create a new note
                                   ***********************************************************/
                                  describe('Create new note', function () {
                                    it('status ', function (done) {
                                      chai.request(server).post('/createNote').send(data.createNote).end((err, res) => {
                                        if (err) {
                                          console.log("expect ==>", err);
                                        } else {
                                          console.log("expect ==>", res.body);
                                          res.should.have.status(200);
                                          /*******************************************************
                                           * @description:test script for get a newly created note
                                           *******************************************************/
                                          describe('get all created notes', function () {
                                            it('status ', function (done) {
                                              chai.request(server).get('/getNotes').send(data.getNotes).end((err, res) => {
                                                if (err) {
                                                  console.log("expect ==>", err);
                                                } else {
                                                  console.log("expect ==>", res.body);
                                                  res.should.have.status(200);
                                                /**********************************************************************************
                                                * @description:test script for updating the color to note
                                                ***********************************************************************************/
                                                  describe('update the color to note', function () {
                                                    it('status ', function (done) {
                                                      chai.request(server).put('/updateColor').send(data.updateColor).end((err, res) => {
                                                        if (err) {
                                                          console.log("expect ==>", err);
                                                        } else {
                                                          console.log("expect ==>", res.body);
                                                          res.should.have.status(200);
                                                          /*******************************************************************************
                                                           * @description:test script for delete the note 
                                                           *********************************************************************************/
                                                          describe('delete the note', function () {
                                                            it('status ', function (done) {
                                                              chai.request(server).post('/deleteNote').send(data.deleteNote).end((err, res) => {
                                                                if (err) {
                                                                  console.log("expect ==>", err);
                                                                } else {
                                                                  console.log("expect ==>", res.body);
                                                                  res.should.have.status(200);
                                                                  /*************************************************************************
                                                                   * @description:test script for archive the note 
                                                                   *************************************************************************/
                                                                  describe('archive the note', function () {
                                                                    it('status ', function (done) {
                                                                      chai.request(server).put('/isArchived').send(data.isArchived).end((err, res) => {
                                                                        if (err) {
                                                                          console.log("expect ==>", err);
                                                                        } else {
                                                                          console.log("expect ==>", res.body);
                                                                          res.should.have.status(200);
                                                                        /**********************************************************************
                                                                        * @description:test script for trash the note 
                                                                        *************************************************************************/
                                                                          describe('trash the note', function () {
                                                                            it('status ', function (done) {
                                                                              chai.request(server).put('/isTrashed').send(data.isTrashed).end((err, res) => {
                                                                                if (err) {
                                                                                  console.log("expect ==>", err);
                                                                                } else {
                                                                                  console.log("expect ==>", res.body);
                                                                                  res.should.have.status(200);
                                                                                  /*******************************************************************************
                                                                                   * @description:test script for reminder the note 
                                                                                   ******************************************************************************/
                                                                                  describe('add reminder to note', function () {
                                                                                    it('status ', function (done) {
                                                                                      chai.request(server).put('/reminder').send(data.reminder).end((err, res) => {
                                                                                        if (err) {
                                                                                          console.log("expect ==>", err);
                                                                                        } else {
                                                                                          console.log("expect ==>", res.body);
                                                                                          res.should.have.status(200);
                                                                                          /*********************************************************************
                                                                                           * @description:test script for edit title to  note 
                                                                                           *********************************************************************/
                                                                                          describe('edit title to note', function () {
                                                                                            it('status ', function (done) {
                                                                                              chai.request(server).put('/editTitle').send(data.editTitle).end((err, res) => {
                                                                                                if (err) {
                                                                                                  console.log("expect ==>", err);
                                                                                                } else {
                                                                                                  console.log("expect ==>", res.body);
                                                                                                  res.should.have.status(200);
                                                                                                  /******************************************************************
                                                                                                   * @description:test script for edit description to note 
                                                                                                   ******************************************************************/
                                                                                                  describe('edit description to note', function () {
                                                                                                    it('status ', function (done) {
                                                                                                      chai.request(server).put('/editDescription').send(data.editDescription).end((err, res) => {
                                                                                                        if (err) {
                                                                                                          console.log("expect ==>", err);
                                                                                                        } else {
                                                                                                          console.log("expect ==>", res.body);
                                                                                                          res.should.have.status(200);
                                                                                                          /*****************************************************************************
                                                                                                           * @description:test script for pinned and unpinned to note 
                                                                                                           *****************************************************************************/
                                                                                                          describe('pinned and unpinned to note', function () {
                                                                                                            it('status ', function (done) {
                                                                                                              chai.request(server).put('/isPinned').send(data.isPinned).end((err, res) => {
                                                                                                                if (err) {
                                                                                                                  console.log("expect ==>", err);
                                                                                                                } else {
                                                                                                                  console.log("expect ==>", res.body);
                                                                                                                  res.should.have.status(200);
                                                                                                                }
                                                                                                                done()
                                                                                                              })
                                                                                                            })
                                                                                                          })
                                                                                                        }
                                                                                                        done()
                                                                                                      })
                                                                                                    })
                                                                                                  })
                                                                                                }
                                                                                                done()
                                                                                              })
                                                                                            })
                                                                                          })
                                                                                        }
                                                                                        done()
                                                                                      })
                                                                                    })
                                                                                  })
                                                                                }
                                                                                done()
                                                                              })
                                                                            })
                                                                          })
                                                                        }
                                                                        done()
                                                                      })
                                                                    })
                                                                  })
                                                                }
                                                                done()
                                                              })
                                                            })
                                                          })
                                                        }
                                                        done()
                                                      })
                                                    })
                                                  })
                                                }
                                                done()
                                              })
                                            })
                                          })
                                        }
                                        done()
                                      })
                                    })
                                  })
                                }
                                done()
                              })
                            })
                          })
                        }
                        done()
                      })
                    })
                  })
                }
                done()
              })
            })
          })
        }
        done()
      })
    })
  })
})
