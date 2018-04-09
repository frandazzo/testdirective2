app.service('geoService', function($q){
	var regions = [
		{
			id: 1,
			label: 'Puglia',
		}, { 
			id: 2,
			label: 'Basilicata',
		}
	];

	var provinces = [
		{ 
			id: 7,
			idRegion: 2,
			label: 'Matera',
		}, { 
			id: 8,
			idRegion: 2,
			label: 'Potenza',
		}, {
			id: 1,
			idRegion: 1,
			label: 'Bari',
		}, {
			id: 2,
			idRegion: 1,
			label: 'Taranto',
		}, { 
			id: 3,
			idRegion: 1,
			label: 'Foggia',
		}, { 
			id: 4,
			idRegion: 1,
			label: 'Lecce',
		}, { 
			id: 5,
			idRegion: 1,
			label: 'Brindisi',
		}, { 
			id: 6,
			idRegion: 1,
			label: 'BAT',
		}
	];

	this.getRegions = function(){
		var deferred = $q.defer();

		setTimeout(function() {
			deferred.resolve(regions);
		}, 100);

		return deferred.promise;
	}

	this.getProvincesByRegion = function(idRegion){
		var deferred = $q.defer();

		setTimeout(function() {
			var provincesByRegion = [];

			provinces.forEach(function(province){
				if(province.idRegion == idRegion)
				{
					provincesByRegion.push(province);
				}
			});

			deferred.resolve(provincesByRegion);
		}, 100);

		return deferred.promise;
	}
});