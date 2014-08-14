var api = require('../api_tester')
	, expect = require('chai').expect
	, thirdVendor = require('../../models/third_vendor_info')



describe('/up/data', function(){
	it('load user up data at backend', function(done) {
		api.withUser(function(user){
			api
			.get('/v1/up/data')
			.setUser(user)
			.expect(200)
			.end(function(err, res){
				if (err) {done(err);}
				else{
					var result = res.body;

					expect(result['result']).to.be.a('string');
					expect(result['result']).to.equal('Finish load!');

					done();
				}
			});
		});
	});
})

describe('/up/token',function(){
	var data = {
			'accessToken' : 'b6_3pfGGwEjoV5nufiACB1ZYFIZDk2XatXJ7a7ytHIPLvto9SOmUu8Ljlw33Vyyy8EvaJSumcI0GoYT-V9UbpVECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP'
			};
	it('save jawbone access token', function(done){
		api.withUser(function(user){
			api
			.post('/v1/up/token')
			.send(data)
			.setUser(user)
			.expect(200)
			.end(function(err, res){
				if (err) {done(err);}
				else{
					var result = res.body;

					expect(result['userId']).to.equal(user.userId);
					expect(result['upAccessToken']).to.be.a('string');
					expect(result['upAccessToken']).to.equal(data['accessToken']);

					done()
				}
			});
		});

		
		
	});

	it('get third vendor', function(done){
		api.withUser(function(user){
			var data = { "createdAt"      : Date( 1395135715161 ),
									  "updatedAt"     : Date( 1395135715161 ),
									  "userId"        : user.userId,
									  "upAccessToken" : "b6_3pfGGwEjoV5nufiACB1ZYFIZDk2XatXJ7a7ytHIPLvto9SOmUu8Ljlw33Vyyy8EvaJSumcI0GoYT-V9UbpVECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP",
									  "upExpire"      : Date( 1395135715161 ),
									  "__v"           : 0 };
			thirdVendor.create(data, function(err, myVendor){
				api
				.get('/v1/up/thirdVendor')
				.setUser(user)
				.expect(200)
				.end(function(err, res){
					var result = res.body;
					expect(result).to.be.an('object');
					expect(result['upAccessToken']).to.equal(data['upAccessToken']);

					done();
				});
			})
		})
	});
});