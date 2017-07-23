
const should = require('should/as-function'),
    sinon = require('sinon'),
    LucidSDK = require('../src/LucidSDK');

describe('LucidSDK', () => {
    let instance;

    beforeEach(() => {
        instance = new LucidSDK();
    });

    describe('setEnvironment', () => {
        it('should throw if try to set unknown environment', () => {
            should.throws(() => {
                instance.setEnvironment('unknown');
            }, /unknown environment/);
        });
        it('should set apiHost and return self', () => {
            should(instance.setEnvironment('production')).be.equal(instance);
            should(instance.apiHost).be.a.String();
        });
    });

    describe('setApiKey', () => {
        it('should change apiKey', () => {
            instance.setApiKey('qwe');
            should(instance.apiKey).be.equal('qwe');
        });
    });

    describe('requests', () => {
        beforeEach(() => {
            sinon.stub(instance, '_request').callsFake(() => {
                return Promise.resolve();
            });
        });
        afterEach(() => {
            instance._request.restore();
        });

        describe('getGlobalDefinitions', () => {
            it('should request with bundles as string', () => {
                instance.getGlobalDefinitions('qwe').then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/BasicLookups/BundledLookups/qwe`);
                });
            });
            it('should request with bundles as array', () => {
                instance.getGlobalDefinitions(['qwe', 'asd']).then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/BasicLookups/BundledLookups/qwe,asd`);
                });
            });
            it('should request with default bundles', () => {
                instance.getGlobalDefinitions().then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/BasicLookups/BundledLookups/${LucidSDK.defaultBundles.join(',')}`);
                });
            });
        });

        describe('getSuppliers', () => {
            it('should request', () => {
                instance.getSuppliers().then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Core/v1/Suppliers/AllWithAccount`);
                });
            });
        });

        describe('getBusinessUnits', () => {
            it('should request', () => {
                instance.getBusinessUnits().then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Core/v1/BusinessUnits/All`);
                });
            });
        });

        describe('getStandardQuestions', () => {
            it('should throw if no CountryLanguageID provided', () => {
                should.throws(() => {
                    instance.getStandardQuestions();
                }, /argument is required/);
            });
            it('should request', () => {
                instance.getStandardQuestions(123).then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/QuestionLibrary/AllQuestions/123`);
                });
            });
        });

        describe('getCustomQuestions', () => {
            it('should throw if no CountryLanguageID provided', () => {
                should.throws(() => {
                    instance.getCustomQuestions();
                }, /argument is required/);
            });
            it('should request', () => {
                instance.getCustomQuestions(123).then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/QuestionLibrary/AllCustomQuestionsByAccount/123`);
                });
            });
        });

        describe('getQuestionText', () => {
            it('should throw if no CountryLanguageID provided', () => {
                should.throws(() => {
                    instance.getQuestionText();
                }, /argument is required/);
            });
            it('should throw if no QuestionID provided', () => {
                should.throws(() => {
                    instance.getQuestionText(123);
                }, /argument is required/);
            });
            it('should request', () => {
                instance.getQuestionText(123, 321).then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/QuestionLibrary/QuestionById/123/321`);
                });
            });
        });

        describe('getQuestionOptions', () => {
            it('should throw if no CountryLanguageID provided', () => {
                should.throws(() => {
                    instance.getQuestionOptions();
                }, /argument is required/);
            });
            it('should throw if no QuestionID provided', () => {
                should.throws(() => {
                    instance.getQuestionOptions(123);
                }, /argument is required/);
            });
            it('should request', () => {
                instance.getQuestionOptions(123, 321).then(() => {
                    sinon.assert.callCount(instance._request, 1);
                    sinon.assert.calledWithExactly(instance._request, `/Lookup/v1/QuestionLibrary/AllQuestionOptions/123/321`);
                });
            });
        });
    });
});
