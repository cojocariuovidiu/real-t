(function() {

  angular.module('CaseMain', [])
    .config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  })

  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: [CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'case': '<'}
  });

    function CaseMainController() {
      const ctrl = this;
      
      
      /**
       * fix posiitioning of datepicker, which otherwise 
       * is positioned off screen.
       */
      ctrl.positionDatepicker = function($event) {
        
          // get md-input-container parent of the clicked button
          let pickerContainer = angular.element($event.target).parent().parent()

          // handle case of right hand button rather than left hand button, which are
          // on different levels
         
          const pcName = pickerContainer.prop('nodeName');
          if (pcName === 'MD-DATEPICKER') {
            pickerContainer = pickerContainer.parent()
          } else if (pcName === 'DIV') {
            pickerContainer = pickerContainer.parent().parent()
          }
          // get position of the container element
          const pcPosition = pickerContainer.prop('offsetTop');

          // get the datepicker pane element, which when opened is always added at 
          // the end of <body>
          const dpickerPane = angular.element(document.querySelector('body').lastChild);
            
          // move the datepicker pane to be near its input container button
          dpickerPane.css('top', pcPosition + 300 + 'px');

      }
      
      // data for testing
      ctrl.Counties = ["Box Elder", "Davis", "Salt Lake", "Summit", "Uintah", "Wasatch", "Washington", "Weber"]

      ctrl.property = {
        address: "13700 N Fountain Hills Boulevard, Apt 202 \nSyracuse, UT 84014",
        county: "Davis",
        taxId: "36-238-9984",
        owner: "Stuart McFarlain",
        legalDescription: "Lot 75, VISTA BONITA HEIGHTS SUBDIVISION, according to the official plat thereof on file and of record in the Office of the Recorder for Davis County, Utah."
      }
       
      ctrl.lender = {
        name: "Peter Boghashian",
        address: "50 S Main Street\nSalt Lake City, UT 84111",
        phone: "801-412-8382",
        email: "pboghashian@email.net"
      }

      ctrl.borrower = {
        name: "Jamie Lannister",
        address: "301 South 200 East, Ste 150\nSalt Lake City, UT 84111",
        phone: "801-558-0192",
        email: ""
      }

      ctrl.loan = {
        amount: "$257,842",
        DOT: {
                recorded: new Date(2015,03,03),
                recString: "04-03-2015",
                entry: "158293045",
                origBeneficiary: "Oscar Travers",
                origTrustee: "First American Title Insurance Company",
                nonBorrowerTrustors: ""
        },
        assignments:[ 
              {
                recorded: new Date(2017,04,12),
                recString: "05-12-2017",
                entry: "172389298",
                assignee: "Peter Boghasian"
              }
        ],
        substitutions: [
              {
                recorded: "",
                entry: "",
                newTrustee: ""
              }
        ]
      }

    }


})();
