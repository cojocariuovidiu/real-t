  


module.exports = function(ngModule) {
  ngModule
  .component('caseDashboard', {
    template: require('./caseDashboard.template.html'),
    controller: [ 'caseService', 
                  '$state', 
                  '$stateParams',
                  '$mdSidenav',
                  '$mdDialog', 
                  CaseDashboardController
                ],
    controllerAs: 'vm',
    bindings: { 'caseList': '<'}
  });

    function CaseDashboardController( caseService,
                                      $state, 
                                      $stateParams, 
                                      $mdSidenav, 
                                      $mdDialog) {
        const vm = this;

        
        // start with sidenav open
        vm.sidenavLocked = true;
        angular.element(document).ready( () => $mdSidenav('sideMenu').open());

        //title for toolbar
        vm.viewTitle = 'View Case Details'

        // property to user for sorting cases in sidenav
        vm.orderProp = 'caseNum';
        
        vm.toggleSidenav = function($event) {  // menu button in main toolbar toggles sidenav
          vm.sidenavLocked = !vm.sidenavLocked;
          $mdSidenav('sideMenu').toggle();
        }

        vm.closeSidenav = function($event) { // close button in sidenav also will close it, on small screens it will close upon selecting a case number from the list
          let target = angular.element($event.target);
          if (target.hasClass('icon-close')) vm.sidenavLocked = false;
          $mdSidenav('sideMenu').close();
        }
        

        // load full case details when a casenumber is selected from the sidenav
        vm.caseLookup = function(caseNum) {
          vm.waiting = true;
          
          vm.caseRecord = vm.caseList.filter(a => a.caseNum === caseNum )[0];
          console.log('case record ', vm.caseRecord);
          // }, function(err) {
          //     vm.waiting = false;
          //     $mdDialog.show(
          //       $mdDialog.alert()
          //         .title('Error')
          //         .textContent(`There was a problem retrieving case data. ${err}`)
          //         .ok('Ok')
          //     )
          // })
        }

      //////////////////////////////////////
      //    EDIT EXISTING CASES        ////
      ////////////////////////////////////


       
        
        // when user returns to parent Dashboard state, without any case selected for view
        vm.clearCaseRecord = function() {
          vm.caseRecord = {};
        }
        
      
      //////////////////////////////////////
      //    CREATING NEW CASES         ////
      ////////////////////////////////////

      vm.gotoNewCase = function() {
        $state.go('newCase');
      }

      vm.autoSaveChanges = function() {
        // convert dates to strings for JSON format in database
            if (vm.caseRecord.loan.DOT.recorded ) {
              vm.caseRecord.loan.DOT.recorded = vm.caseRecord.loan.DOT.recorded.toString()
            }
            angular.forEach(vm.caseRecord.loan.assignments, function(val, key) {
              if (val['recorded']) { 
                val['recorded'] = val['recorded'].toString()
              }
            })
            vm.caseList.$save(vm.caseRecord).then(function(ref){
              console.log('saved case ', ref.key)
            })
      }

      
      
      // cancel edits restore original data
      vm.cancelNewCase = function() {
          vm.isCreating = false;
            $mdDialog.show(
              $mdDialog.confirm()
                .title('Cancel Without Saving')
                .textContent('Do you want to discard the new case without saving?')
                .ok('Yes')
                .cancel('No')
            )
              .then(function(yes) {
                  vm.caseList.$remove(vm.caseRecord)
                  .then(function(ref) {
                    console.log('deleted record ', ref.key)
                    vm.clearCaseRecord();
                    $state.go('caseDashboard');
                  }, function(err) {
                    console.log('error ', err);
                  })
              }, function(no) {

              })

      }
    }

}
