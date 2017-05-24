var vows = require('vows'),
    http = require('http'),
    assert = require('assert');

var theGoodThings = require('../the-good-things');

var Strawberry   = theGoodThings.Strawberry,
    Banana       = theGoodThings.Banana,
    PeeledBanana = theGoodThings.PeeledBanana;

vows.describe('The Good Things').addBatch({
    'A strawberry': {
        topic: new(Strawberry),

        'is red': function (strawberry) {
            assert.equal (strawberry.color, '#ff0000');
        },
        'and tasty': function (strawberry) {
            assert.isTrue (strawberry.isTasty());
        }
    },
    'A banana': {
        topic: new(Banana),

        'is yellow': function (banana) {
          assert.equal (banana.color, '#fff333');
        },
        'when peeled *synchronously*': {
            topic: function (banana) {
                return banana.peelSync();
            },
            'returns a `PeeledBanana`': function (result) {
                assert.instanceOf (result, PeeledBanana);
            }
        },
        'when peeled *asynchronously*': {
            topic: function (banana) {
                banana.peel(this.callback);
            },
            'results in a `PeeledBanana`': function (err, result) {
                assert.instanceOf (result, PeeledBanana);
            }
        }
    },
    'A client request': {
      topic: function () {
        http.get('http://example.com', this.callback);
      },
      'should respond with a 200 OK': function (res, e) {
        assert.equal(res.statusCode, 200);
      }
    }
}).export(module); // Export the Suite
