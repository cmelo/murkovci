var app = window.angular.module("murkovci",[]);


app.component("root", {
	templateUrl: "templates/root.html",
	controller: function ($http) {
		var vm = this;

		var s1 = document.querySelector('#background');
		var s2 = document.querySelector('#rightsound');
		s1.loop = true;


		$http.get('questions.json').then(function (resp) {

			vm.data = resp.data;
			window.console.log(vm.data);

		});

		vm.show = 0;
		vm.q = 0;
		vm.next = function () {
			if (vm.cannext) {
				vm.nextq();
			} else {
				vm.show ++;
			}

		};

		vm.nextq = function () {
			vm.cannext = false;
			vm.show = 0;
			vm.a = null;
			vm.q++;
			if (vm.q > 4) {
				vm.q = 0;
				vm.show = 0;
				vm.game = -1;
			}
		};

		vm.select = function (x) {
			if (vm.cannext || vm.selected_a) { return ;}
			vm.a = x;
			vm.selected_a = true;
			setTimeout(function () {
				vm.cannext = true;
				vm.selected_a = false;
				s2.play();
			}, 4000);
		};

		vm.play = function (x) {
			vm.game = x;
			s1.play();
		};


	}
});
