
module.exports = function(ngModule) {
  ngModule
    .component('hero', {
      template: require('./hero.template.html'),
      controller: [HeroController],
      controllerAs: 'vm',
      bindings: {
                  'user': '<'
      }
    });

    function HeroController() {
        const vm = this;

        vm.$onChanges = function() {
          if (vm.user.isLoggedIn) {
            vm.message = 'Where Would You Like to Start?'
          } else {
            vm.message = 'Sign In to Get Started.'
          }
        }
        


    }

}