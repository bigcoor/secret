var api	        = require('../api_tester')
	, test_helper = require('../test_helper')
	, expect      = require('chai').expect;

var ProblemSuggestion = require('../../models/problem_suggestion')


describe('/problemsuggestion', function(){
	it('save a problem suggestion', function(done){
		api.withUser(function(user){
			var data = {
				'name': 'bronchial asthma' //哮喘
 				, 'description': 'Bronchial asthma is a chronic airway inflammation by a variety of cells, especially mast cells, eosinophils and T lymphocytes participate in susceptible in this inflammation can lead to recurrent episodes of wheezing, breathlessness, chest tightness, and (or) symptoms of cough, mostly at night and (or) early morning, on a variety of stimulating factor airway hyperresponsiveness. But the symptoms can be treated on its own or remission. Over the past decade, the United States, Britain, Australia, New Zealand and other countries of asthma morbidity and mortality on the rise, about a million asthma patients worldwide, has become a serious threat to public health as a major chronic disease. The prevalence of asthma is approximately 1% of children up to 3%, according to estimates there are about a tens of millions more asthma'
 				, 'comment': 'bronchial asthma is a very import, we should add this to my problems.'
			};

			api
			.post('/v1/problemsuggestion')
			.send(data)
			.setUser(user)
			.expect(200)
			.end(function(err, res){
				if (err) {done(err);}
				else{
					var data = res.body;
					expect(data.userId).to.equal(user.userId);
					expect(data.approved).to.be.false;

					done();
				}

			});
		});
	});
})